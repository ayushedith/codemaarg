// ============================================================================
// Comment Mutations — Materialized Path Builder
// ============================================================================
//
// When creating a comment we:
//   1. Generate a CUID for the new comment
//   2. If it's a reply, fetch the parent's `path` and append the new id
//   3. Calculate `depth` by counting segments in the path
//
// Reading a full thread for a project is a single non-recursive query:
//   prisma.comment.findMany({
//     where: { projectId },
//     orderBy: { path: "asc" },  // groups threads + respects hierarchy
//   })
// ============================================================================

import { prisma } from "@/lib/db";
import { createId } from "@paralleldrive/cuid2";

interface CreateCommentInput {
  content: string;
  authorId: string;
  projectId: string;
  parentId?: string; // omit for root-level comments
}

/**
 * Create a comment with a properly constructed materialized path.
 */
export async function createComment({
  content,
  authorId,
  projectId,
  parentId,
}: CreateCommentInput) {
  const id = createId();
  let path: string;
  let depth: number;

  if (parentId) {
    // Fetch the parent to extend its path
    const parent = await prisma.comment.findUniqueOrThrow({
      where: { id: parentId },
      select: { path: true, depth: true },
    });

    path = `${parent.path}/${id}`;
    depth = parent.depth + 1;
  } else {
    // Root-level comment
    path = `/${id}`;
    depth = 0;
  }

  return prisma.comment.create({
    data: {
      id,
      content,
      path,
      depth,
      parentId,
      authorId,
      projectId,
    },
    include: {
      author: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });
}

/**
 * Fetch all comments for a project, sorted in threaded order.
 * The materialized path naturally groups children under parents
 * when sorted lexicographically.
 */
export async function getThreadedComments(projectId: string) {
  return prisma.comment.findMany({
    where: { projectId },
    orderBy: [{ path: "asc" }, { createdAt: "asc" }],
    include: {
      author: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });
}

/**
 * Fetch all descendants of a specific comment (subtree query).
 * Uses LIKE prefix matching on the materialized path.
 */
export async function getCommentSubtree(commentId: string) {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
    select: { path: true },
  });

  return prisma.comment.findMany({
    where: {
      path: { startsWith: `${comment.path}/` },
    },
    orderBy: { path: "asc" },
    include: {
      author: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  });
}
