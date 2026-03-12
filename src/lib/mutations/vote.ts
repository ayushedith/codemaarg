// ============================================================================
// Vote Mutations — Transactional Co-located Storage Pattern
// ============================================================================
//
// Every vote mutation is wrapped in a Prisma interactive transaction that:
//   1. Upserts the Vote row (source of truth)
//   2. Atomically increments/decrements the materialized counters on Project
//
// This guarantees the counters stay consistent even under concurrent writes.
// If either operation fails, both are rolled back.
//
// These functions are designed to be called from Server Actions or Route
// Handlers — they must NEVER run on the client.
// ============================================================================

import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type VoteType = "UPVOTE" | "DOWNVOTE";

interface CastVoteInput {
  userId: string;
  projectId: string;
  voteType: VoteType;
}

/**
 * Cast or change a vote. Handles three cases:
 *   1. New vote          → insert Vote + increment counter
 *   2. Same vote again   → remove Vote + decrement counter (toggle off)
 *   3. Changed vote type → update Vote + adjust both counters
 */
export async function castVote({ userId, projectId, voteType }: CastVoteInput) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const existing = await tx.vote.findUnique({
      where: { userId_projectId: { userId, projectId } },
    });

    // ── Case 2: Toggle OFF (user clicks the same vote type again) ────────
    if (existing && existing.voteType === voteType) {
      await tx.vote.delete({
        where: { id: existing.id },
      });

      await tx.project.update({
        where: { id: projectId },
        data: {
          ...(voteType === "UPVOTE"
            ? { upvoteCount: { decrement: 1 } }
            : { downvoteCount: { decrement: 1 } }),
        },
      });

      return { action: "removed" as const, voteType };
    }

    // ── Case 3: Flip vote type ───────────────────────────────────────────
    if (existing && existing.voteType !== voteType) {
      await tx.vote.update({
        where: { id: existing.id },
        data: { voteType },
      });

      await tx.project.update({
        where: { id: projectId },
        data: {
          // Decrement the old counter, increment the new one
          ...(voteType === "UPVOTE"
            ? { upvoteCount: { increment: 1 }, downvoteCount: { decrement: 1 } }
            : { upvoteCount: { decrement: 1 }, downvoteCount: { increment: 1 } }),
        },
      });

      return { action: "changed" as const, voteType };
    }

    // ── Case 1: New vote ─────────────────────────────────────────────────
    await tx.vote.create({
      data: { userId, projectId, voteType },
    });

    await tx.project.update({
      where: { id: projectId },
      data: {
        ...(voteType === "UPVOTE"
          ? { upvoteCount: { increment: 1 } }
          : { downvoteCount: { increment: 1 } }),
      },
    });

    return { action: "created" as const, voteType };
  });
}
