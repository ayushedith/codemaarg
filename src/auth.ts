import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

const hasGitHubOAuth = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);

const emailServer = {
  host: process.env.EMAIL_SERVER_HOST ?? "localhost",
  port: Number(process.env.EMAIL_SERVER_PORT ?? "1025"),
  secure: (process.env.EMAIL_SERVER_SECURE ?? "false") === "true",
  auth:
    process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD
      ? {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        }
      : undefined,
};

const providers: NextAuthOptions["providers"] = [
  Email({
    server: emailServer,
    from: process.env.EMAIL_FROM ?? "CodeMaarg <no-reply@codemaarg.dev>",
  }),
];

if (hasGitHubOAuth) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return true;
      }

      const nextName = user.name?.trim() || user.email?.split("@")[0] || "Developer";
      const nextImage = user.image ?? null;

      const ensuredUser = await prisma.user.upsert({
        where: { email: user.email },
        create: {
          email: user.email,
          name: nextName,
          ...(nextImage ? { avatarUrl: nextImage, image: nextImage } : {}),
        },
        update: {
          name: nextName,
          ...(nextImage ? { avatarUrl: nextImage, image: nextImage } : {}),
        },
        select: {
          onboardingCompleted: true,
        },
      });

      if (!ensuredUser.onboardingCompleted) {
        return "/onboarding";
      }

      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}
