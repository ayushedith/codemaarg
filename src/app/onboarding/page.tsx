import Link from "next/link";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import {
  profileFormSchema,
  normalizeGithubHandle,
  normalizeSkills,
} from "@/lib/profile";

type SearchParams = {
  error?: string;
};

type OnboardingPageProps = {
  searchParams?: Promise<SearchParams>;
};

const skillLevelOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;

const errorMap: Record<string, string> = {
  invalid: "Please review the form fields and try again.",
  github_taken: "That GitHub handle is already linked to another account.",
  failed: "Could not save your onboarding details. Please try again.",
};

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/onboarding");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      name: true,
      bio: true,
      skills: true,
      timezone: true,
      githubHandle: true,
      skillLevel: true,
      onboardingCompleted: true,
    },
  });

  if (user.onboardingCompleted) {
    redirect("/profile");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams.error ? errorMap[resolvedSearchParams.error] : null;

  async function submitOnboarding(formData: FormData) {
    "use server";

    const parsed = profileFormSchema.safeParse({
      name: formData.get("name"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      timezone: formData.get("timezone"),
      githubHandle: normalizeGithubHandle(String(formData.get("githubHandle") ?? "")),
    });

    if (!parsed.success) {
      redirect("/onboarding?error=invalid");
    }

    const skills = normalizeSkills(parsed.data.skills);

    if (skills.length === 0) {
      redirect("/onboarding?error=invalid");
    }

    try {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: parsed.data.name,
          bio: parsed.data.bio,
          skills,
          timezone: parsed.data.timezone,
          githubHandle: parsed.data.githubHandle,
          skillLevel: formData.get("skillLevel") as
            | "BEGINNER"
            | "INTERMEDIATE"
            | "ADVANCED"
            | "EXPERT",
          onboardingCompleted: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        redirect("/onboarding?error=github_taken");
      }

      redirect("/onboarding?error=failed");
    }

    redirect("/profile?welcome=1");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
              Onboarding
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-[#0f172a]">
              Complete your developer profile
            </h1>
            <p className="mt-2 text-sm font-medium text-[#64748b]">
              This info powers roadmap personalization and teammate matchmaking.
            </p>
          </div>
          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="rounded-xl border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#334155]"
          >
            Sign out
          </Link>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-[#f8d7da] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#b42318]">
            {error}
          </div>
        ) : null}

        <form action={submitOnboarding} className="grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-[#334155]">
            Name
            <input
              name="name"
              defaultValue={user.name ?? ""}
              required
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#334155]">
            Bio
            <textarea
              name="bio"
              rows={5}
              defaultValue={user.bio ?? ""}
              required
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
              placeholder="Tell others what you build and what you're learning."
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#334155]">
            Skills (comma separated)
            <input
              name="skills"
              required
              defaultValue={user.skills.join(", ")}
              placeholder="TypeScript, Next.js, PostgreSQL"
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#334155]">
              Timezone
              <input
                name="timezone"
                required
                defaultValue={user.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone}
                placeholder="Asia/Kolkata"
                className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[#334155]">
              Skill level
              <select
                name="skillLevel"
                defaultValue={user.skillLevel}
                className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
              >
                {skillLevelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-[#334155]">
            GitHub handle
            <input
              name="githubHandle"
              required
              defaultValue={user.githubHandle ?? ""}
              placeholder="your-github-handle"
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
          >
            Save and continue
          </button>
        </form>
      </div>
    </main>
  );
}
