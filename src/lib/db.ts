// ============================================================================
// Prisma Client — Singleton + Accelerate-ready Setup
// ============================================================================
//
// WHY A SINGLETON?
// ────────────────
// Next.js in dev mode performs "fast refresh" which re-evaluates modules on
// every edit.  Each re-evaluation would create a NEW PrismaClient → a new
// connection pool → and eventually exhaust the database's connection limit.
//
// The fix: stash the client on `globalThis` (which survives fast refresh)
// so only ONE instance ever exists during development.  In production the
// module is evaluated exactly once, so the guard is a no-op.
//
// PRISMA ACCELERATE
// ─────────────────
// When deploying to serverless / edge (Vercel, Cloudflare) you MUST use a
// connection pooler. Prisma Accelerate provides:
//   • Managed connection pooling  (no pgBouncer to self-host)
//   • Query-level caching         ($cacheStrategy per query)
//   • Global edge distribution    (< 50 ms cold start)
//
// To enable Accelerate:
//   1. Sign up at https://console.prisma.io and create an Accelerate project.
//   2. Set DATABASE_URL to the Accelerate connection string (prisma://…).
//   3. Uncomment the Accelerate extension import below.
//
// This file currently works WITHOUT Accelerate. The commented sections show
// exactly what to change when you're ready to flip the switch.
//
// ============================================================================

import { PrismaClient } from "@prisma/client";
// ── Uncomment when enabling Prisma Accelerate ──────────────────────────────
// import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create a single PrismaClient configured for the current environment.
 *
 * Development  → verbose query logging, warn + error
 * Production   → errors only
 */
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });

  // ── Uncomment to wire up Accelerate extension ────────────────────────────
  // return client.$extends(withAccelerate()) as unknown as PrismaClient;

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ============================================================================
// USAGE IN SERVER COMPONENTS / ROUTE HANDLERS
// ============================================================================
//
//   import { prisma } from "@/lib/db";
//
//   // Standard query
//   const projects = await prisma.project.findMany({
//     where: { status: "PUBLISHED" },
//     orderBy: { upvoteCount: "desc" },
//     take: 20,
//   });
//
//   // Query with Accelerate caching (once extension is enabled)
//   // const projects = await prisma.project.findMany({
//   //   where: { status: "PUBLISHED" },
//   //   cacheStrategy: { ttl: 60, swr: 120 },   // 60 s TTL, 120 s stale-while-revalidate
//   // });
//
// ============================================================================
