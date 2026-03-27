// ============================================================================
// AI Roadmap Generator — POST /api/roadmap
// ============================================================================
//
// ARCHITECTURAL DECISIONS
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. PROMPT ENGINEERING STRATEGY
//    ────────────────────────────
//    We use a three-layer prompt structure:
//      a) SYSTEM prompt  — defines the AI's persona and hard constraints
//                           (JSON-only output, no markdown, safety rails).
//      b) FEW-SHOT EXAMPLES — two concrete input/output pairs that
//                           demonstrate the exact JSON shape we expect.
//                           This grounds the model far more reliably than
//                           a description alone.
//      c) USER prompt     — the actual runtime request with the project
//                           title and skill level injected.
//
//    The model is additionally constrained via `response_format` to
//    guarantee valid JSON (OpenAI's "JSON mode").
//
// 2. INPUT VALIDATION
//    ─────────────────
//    We validate at the boundary with Zod before anything hits the LLM.
//    This prevents prompt injection, unexpected types, and wasted tokens.
//
// 3. STREAMING vs. BLOCKING
//    ───────────────────────
//    This initial version returns the full JSON response in one shot.
//    For production UX you'd switch to `stream: true` and pipe SSE chunks
//    to the client using `ReadableStream`.  The prompt structure stays the
//    same.
//
// 4. LLM PROVIDER ABSTRACTION
//    ─────────────────────────
//    We use the OpenAI SDK with a configurable `baseURL`.  This works
//    unchanged with OpenAI, Azure OpenAI, Groq, Together, Fireworks, or
//    any OpenAI-compatible provider — just swap the env vars.
//
// ============================================================================

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";

// ── Input schema ─────────────────────────────────────────────────────────────

const RoadmapRequestSchema = z.object({
  projectTitle: z
    .string()
    .min(3, "Project title must be at least 3 characters")
    .max(200, "Project title must be at most 200 characters"),
  skillLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
});

// ── OpenAI client (works with any compatible provider) ───────────────────────

function createOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL, // optional override for Groq / Together / etc.
  });
}

// ── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert software architect and developer educator.
Your job is to generate a detailed, personalized learning roadmap for a developer
who wants to build a specific project.

HARD CONSTRAINTS — you MUST follow every one of these:
1. Respond ONLY with a single valid JSON object. No markdown, no explanation, no preamble.
2. The JSON must exactly match the schema shown in the examples below.
3. Milestones must be ordered from foundational to advanced.
4. Each milestone must list concrete, actionable tasks — not vague advice.
5. Recommend ONLY well-known, actively maintained open-source dependencies.
6. Tailor complexity and depth to the user's stated skill level.
7. The "architectureSuggestions" field must contain backend-specific patterns
   (e.g., database choice, caching strategy, API design) relevant to the project.`;

// ── Few-shot examples ────────────────────────────────────────────────────────

const FEW_SHOT_EXAMPLES: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: JSON.stringify({
      projectTitle: "Real-time collaborative markdown editor",
      skillLevel: "INTERMEDIATE",
    }),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      projectTitle: "Real-time collaborative markdown editor",
      skillLevel: "INTERMEDIATE",
      estimatedWeeks: 8,
      milestones: [
        {
          order: 1,
          title: "Core Markdown Rendering",
          description:
            "Build a client-side markdown parser and live preview pane.",
          tasks: [
            "Set up a Next.js 14 App Router project with TypeScript",
            "Integrate remark and rehype for markdown-to-HTML pipeline",
            "Build a split-pane editor component with CodeMirror 6",
            "Add syntax highlighting via shiki",
          ],
          dependencies: [
            "next",
            "@codemirror/lang-markdown",
            "remark",
            "rehype-react",
            "shiki",
          ],
        },
        {
          order: 2,
          title: "Real-time Collaboration with CRDTs",
          description:
            "Add multi-cursor, conflict-free real-time editing using Yjs.",
          tasks: [
            "Set up a WebSocket server with ws",
            "Integrate Yjs as the CRDT engine",
            "Connect Yjs to CodeMirror via y-codemirror.next",
            "Implement awareness protocol for cursor presence",
          ],
          dependencies: ["yjs", "y-codemirror.next", "y-websocket", "ws"],
        },
        {
          order: 3,
          title: "Persistence & Auth",
          description:
            "Persist documents in PostgreSQL and add user authentication.",
          tasks: [
            "Model documents and users in Prisma",
            "Implement NextAuth.js with GitHub OAuth provider",
            "Build API routes for CRUD operations on documents",
            "Store Yjs document state as binary snapshots in the DB",
          ],
          dependencies: ["prisma", "@prisma/client", "next-auth"],
        },
      ],
      architectureSuggestions: [
        {
          topic: "Database",
          recommendation:
            "PostgreSQL with Prisma ORM. Store Yjs binary state in a `bytea` column for efficient snapshot persistence.",
        },
        {
          topic: "Real-time Transport",
          recommendation:
            "Use a standalone WebSocket server (not Next.js API routes) for persistent connections. Deploy behind a load balancer with sticky sessions.",
        },
        {
          topic: "Caching",
          recommendation:
            "Cache rendered HTML previews in Redis with a 30-second TTL. Invalidate on document update via Pub/Sub.",
        },
      ],
    }),
  },
  {
    role: "user",
    content: JSON.stringify({
      projectTitle: "Personal finance tracker with AI insights",
      skillLevel: "BEGINNER",
    }),
  },
  {
    role: "assistant",
    content: JSON.stringify({
      projectTitle: "Personal finance tracker with AI insights",
      skillLevel: "BEGINNER",
      estimatedWeeks: 10,
      milestones: [
        {
          order: 1,
          title: "Project Setup & UI Foundation",
          description:
            "Initialize the project and build core UI layout with static data.",
          tasks: [
            "Create a Next.js project with the App Router and Tailwind CSS",
            "Build a responsive dashboard layout with sidebar navigation",
            "Create mock data files for transactions and categories",
            "Build a transactions list component with sorting and filtering",
          ],
          dependencies: [
            "next",
            "tailwindcss",
            "lucide-react",
            "@radix-ui/react-slot",
          ],
        },
        {
          order: 2,
          title: "Database & CRUD",
          description:
            "Replace mock data with a real PostgreSQL database and build full CRUD.",
          tasks: [
            "Install Prisma and model Transaction, Category, and User tables",
            "Implement Server Actions for creating, updating, deleting transactions",
            "Add form validation with react-hook-form and Zod",
            "Build a category management page",
          ],
          dependencies: [
            "prisma",
            "@prisma/client",
            "react-hook-form",
            "zod",
            "@hookform/resolvers",
          ],
        },
        {
          order: 3,
          title: "Charts & AI Spending Insights",
          description:
            "Visualize spending patterns and add LLM-powered financial tips.",
          tasks: [
            "Build monthly spending bar charts with Recharts",
            "Create category breakdown pie chart",
            "Build an API route to summarize spending and query an LLM for tips",
            "Display AI insights in a dedicated dashboard card",
          ],
          dependencies: ["recharts", "openai"],
        },
      ],
      architectureSuggestions: [
        {
          topic: "Database",
          recommendation:
            "SQLite via Prisma for local development; switch to PostgreSQL on deployment. Use decimal fields for monetary values to avoid floating-point errors.",
        },
        {
          topic: "API Design",
          recommendation:
            "Start with Next.js Server Actions for mutations. They reduce client-side code. Migrate to dedicated API routes only if you need external API consumers.",
        },
        {
          topic: "Security",
          recommendation:
            "Never send raw financial data to third-party LLMs. Aggregate and anonymize spending totals before constructing the prompt.",
        },
      ],
    }),
  },
];

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const openai = createOpenAIClient();
    const body = await request.json();

    // Validate input at the system boundary
    const parsed = RoadmapRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { projectTitle, skillLevel } = parsed.data;

    // Build the chat completion request
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      response_format: { type: "json_object" },
      temperature: 0.4, // Low temperature for structured, consistent output
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...FEW_SHOT_EXAMPLES,
        {
          role: "user",
          content: JSON.stringify({ projectTitle, skillLevel }),
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json(
        { error: "LLM returned an empty response" },
        { status: 502 },
      );
    }

    // Parse the JSON to validate structure before sending to client
    const roadmap = JSON.parse(raw);

    return NextResponse.json({
      roadmap,
      usage: {
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
      },
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "LLM response was not valid JSON" },
        { status: 502 },
      );
    }

    console.error("[/api/roadmap] Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
