// ============================================================================
// Semantic Matchmaking Engine — Vector Search Module
// ============================================================================
//
// ARCHITECTURE
// ────────────────────────────────────────────────────────────────────────────
//
// This module handles:
//   1. EMBEDDING  — Convert unstructured text (bios, project descriptions,
//                   GitHub commit summaries) into dense vectors using an
//                   embedding model (OpenAI text-embedding-3-small or similar).
//
//   2. STORAGE    — Upsert vectors into MongoDB Atlas Vector Search index.
//                   Each document carries structured metadata (skills, timezone,
//                   userId / projectId) alongside the vector.
//
//   3. MATCHING   — Run Approximate Nearest Neighbor (ANN) search via Atlas
//                   Vector Search's $vectorSearch aggregation stage, then
//                   compute a Composite Fit Score that blends:
//                     • Semantic similarity  (cosine distance from ANN)
//                     • Timezone proximity   (structured weight)
//                     • Skill overlap        (Jaccard coefficient)
//
// WHY MONGODB ATLAS VECTOR SEARCH?
// ────────────────────────────────
//   • Managed service — no infrastructure to maintain.
//   • Co-located metadata filtering — run vector search + structured filters
//     in a single aggregation pipeline, not two round trips.
//   • Hierarchical Navigable Small World (HNSW) index for sub-100ms ANN at
//     millions of vectors.
//
// The relational data stays in PostgreSQL (Prisma).  This module only handles
// the vector dimension of the platform.
//
// ============================================================================

import { MongoClient } from "mongodb";
import OpenAI from "openai";

// ── Clients ──────────────────────────────────────────────────────────────────

const mongo = new MongoClient(process.env.MONGODB_URI!);
const db = mongo.db(process.env.MONGODB_DB_NAME ?? "codemaarg");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

// ── Collections ──────────────────────────────────────────────────────────────

const userVectors = db.collection("user_vectors");
const projectVectors = db.collection("project_vectors");

// ── Type definitions ─────────────────────────────────────────────────────────

interface UserVectorDoc {
  userId: string;
  embedding: number[];
  skills: string[];
  timezone: string | null;
  textSource: string; // the raw text that was embedded
  updatedAt: Date;
}

interface ProjectVectorDoc {
  projectId: string;
  embedding: number[];
  tags: string[];
  textSource: string;
  updatedAt: Date;
}

interface MatchResult {
  id: string;
  semanticScore: number;  // 0–1 (cosine similarity)
  timezoneScore: number;  // 0–1
  skillOverlap: number;   // 0–1 (Jaccard)
  compositeFitScore: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;

// Composite Fit Score weights — tune these based on user feedback
const WEIGHTS = {
  semantic: 0.55,
  timezone: 0.15,
  skills: 0.30,
} as const;

// Atlas Vector Search index names (must match indexes created in Atlas UI)
const USER_VECTOR_INDEX = "user_vector_index";
const PROJECT_VECTOR_INDEX = "project_vector_index";

// ============================================================================
// 1. EMBEDDING
// ============================================================================

/**
 * Generate a dense vector from unstructured text.
 * Uses OpenAI's text-embedding-3-small (1536 dims, $0.02 / 1M tokens).
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const stripped = text.replace(/\s+/g, " ").trim().slice(0, 8000);

  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: stripped,
    dimensions: EMBEDDING_DIMENSIONS,
  });

  return response.data[0].embedding;
}

/**
 * Build a rich text blob from user profile data for embedding.
 * Concatenates bio, skills, and any GitHub context.
 */
export function buildUserTextForEmbedding(user: {
  bio?: string | null;
  skills: string[];
  githubSummary?: string | null;
}): string {
  const parts = [
    user.bio ?? "",
    `Skills: ${user.skills.join(", ")}`,
    user.githubSummary ? `GitHub activity: ${user.githubSummary}` : "",
  ];
  return parts.filter(Boolean).join(". ");
}

// ============================================================================
// 2. STORAGE (Upsert into MongoDB Atlas)
// ============================================================================

/**
 * Upsert a user's embedding vector and metadata.
 */
export async function upsertUserVector(
  userId: string,
  user: { bio?: string | null; skills: string[]; timezone?: string | null; githubSummary?: string | null },
): Promise<void> {
  const text = buildUserTextForEmbedding(user);
  const embedding = await generateEmbedding(text);

  await userVectors.updateOne(
    { userId },
    {
      $set: {
        embedding,
        skills: user.skills.map((s) => s.toLowerCase()),
        timezone: user.timezone ?? null,
        textSource: text,
        updatedAt: new Date(),
      } satisfies Omit<UserVectorDoc, "userId">,
    },
    { upsert: true },
  );
}

/**
 * Upsert a project's embedding vector and metadata.
 */
export async function upsertProjectVector(
  projectId: string,
  project: { title: string; description: string; tags: string[] },
): Promise<void> {
  const text = `${project.title}. ${project.description}`;
  const embedding = await generateEmbedding(text);

  await projectVectors.updateOne(
    { projectId },
    {
      $set: {
        embedding,
        tags: project.tags.map((t) => t.toLowerCase()),
        textSource: text,
        updatedAt: new Date(),
      } satisfies Omit<ProjectVectorDoc, "projectId">,
    },
    { upsert: true },
  );
}

// ============================================================================
// 3. MATCHING — ANN Search + Composite Fit Score
// ============================================================================

/**
 * Calculate timezone proximity as a 0–1 score.
 * Uses UTC offset difference:  0 hours diff → 1.0, 12 hours diff → 0.0
 */
function timezoneScore(tz1: string | null, tz2: string | null): number {
  if (!tz1 || !tz2) return 0.5; // neutral if unknown

  try {
    const offset1 = getUtcOffsetHours(tz1);
    const offset2 = getUtcOffsetHours(tz2);
    const diff = Math.abs(offset1 - offset2);
    const normalizedDiff = Math.min(diff, 24 - diff); // handle wrap-around
    return 1 - normalizedDiff / 12;
  } catch {
    return 0.5;
  }
}

function getUtcOffsetHours(tz: string): number {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(now);
  const tzPart = parts.find((p) => p.type === "timeZoneName");
  if (!tzPart) return 0;

  const match = tzPart.value.match(/GMT([+-]\d+(?::\d+)?)/);
  if (!match) return 0;

  const [hours, minutes] = match[1].split(":").map(Number);
  return hours + (minutes ?? 0) / 60;
}

/**
 * Jaccard similarity between two skill sets.
 */
function skillOverlap(a: string[], b: string[]): number {
  const setA = new Set(a.map((s) => s.toLowerCase()));
  const setB = new Set(b.map((s) => s.toLowerCase()));
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Find the top-K users most semantically similar to a query user,
 * then re-rank by Composite Fit Score.
 *
 * Uses MongoDB Atlas $vectorSearch (HNSW-based ANN).
 */
export async function findMatchingUsers(
  queryUserId: string,
  opts: { topK?: number } = {},
): Promise<MatchResult[]> {
  const topK = opts.topK ?? 20;

  // Fetch the query user's vector + metadata
  const queryDoc = await userVectors.findOne({ userId: queryUserId });
  if (!queryDoc) throw new Error(`No vector found for user ${queryUserId}`);

  // Atlas Vector Search aggregation pipeline
  const candidates = await userVectors
    .aggregate<UserVectorDoc & { score: number }>([
      {
        $vectorSearch: {
          index: USER_VECTOR_INDEX,
          path: "embedding",
          queryVector: queryDoc.embedding,
          numCandidates: topK * 10, // over-fetch for better recall
          limit: topK + 1,         // +1 to filter out self
        },
      },
      {
        $match: {
          userId: { $ne: queryUserId }, // exclude self
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
      { $limit: topK },
    ])
    .toArray();

  // Compute Composite Fit Score for each candidate
  return candidates.map((candidate: UserVectorDoc & { score: number }) => {
    const semantic = candidate.score; // cosine similarity from Atlas
    const tz = timezoneScore(queryDoc.timezone, candidate.timezone);
    const skills = skillOverlap(queryDoc.skills, candidate.skills);

    const compositeFitScore =
      WEIGHTS.semantic * semantic +
      WEIGHTS.timezone * tz +
      WEIGHTS.skills * skills;

    return {
      id: candidate.userId,
      semanticScore: Math.round(semantic * 1000) / 1000,
      timezoneScore: Math.round(tz * 1000) / 1000,
      skillOverlap: Math.round(skills * 1000) / 1000,
      compositeFitScore: Math.round(compositeFitScore * 1000) / 1000,
    };
  }).sort((a: MatchResult, b: MatchResult) => b.compositeFitScore - a.compositeFitScore);
}

/**
 * Find projects semantically similar to a user's profile.
 * Useful for the "Recommended Projects" feed.
 */
export async function findMatchingProjects(
  queryUserId: string,
  opts: { topK?: number } = {},
): Promise<{ projectId: string; score: number }[]> {
  const topK = opts.topK ?? 20;

  const queryDoc = await userVectors.findOne({ userId: queryUserId });
  if (!queryDoc) throw new Error(`No vector found for user ${queryUserId}`);

  const results = await projectVectors
    .aggregate<{ projectId: string; score: number }>([
      {
        $vectorSearch: {
          index: PROJECT_VECTOR_INDEX,
          path: "embedding",
          queryVector: queryDoc.embedding,
          numCandidates: topK * 10,
          limit: topK,
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $project: {
          _id: 0,
          projectId: 1,
          score: 1,
        },
      },
    ])
    .toArray();

  return results;
}
