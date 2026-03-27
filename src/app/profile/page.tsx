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
  updated?: string;
  welcome?: string;
  error?: string;
};

type ProfilePageProps = {
  searchParams?: Promise<SearchParams>;
};

const skillLevelOptions = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;

const errorMap: Record<string, string> = {
  invalid: "Please review the form fields and try again.",
  github_taken: "That GitHub handle is already linked to another account.",
  failed: "Could not update your profile right now.",
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/profile");
  }

  const userId = session.user.id;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      email: true,
      name: true,
      bio: true,
      skills: true,
      timezone: true,
      githubHandle: true,
      skillLevel: true,
      onboardingCompleted: true,
    },
  });

  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const success =
    resolvedSearchParams.welcome === "1"
      ? "Profile completed. You are all set."
      : resolvedSearchParams.updated === "1"
        ? "Profile updated successfully."
        : null;
  const error = resolvedSearchParams.error ? errorMap[resolvedSearchParams.error] : null;

  async function updateProfile(formData: FormData) {
    "use server";

    const parsed = profileFormSchema.safeParse({
      name: formData.get("name"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      timezone: formData.get("timezone"),
      githubHandle: normalizeGithubHandle(String(formData.get("githubHandle") ?? "")),
      skillLevel: formData.get("skillLevel"),
    });

    if (!parsed.success) {
      redirect("/profile?error=invalid");
    }

    const skills = normalizeSkills(parsed.data.skills);

    if (skills.length === 0) {
      redirect("/profile?error=invalid");
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name: parsed.data.name,
          bio: parsed.data.bio,
          skills,
          timezone: parsed.data.timezone,
          githubHandle: parsed.data.githubHandle,
          skillLevel: parsed.data.skillLevel,
          onboardingCompleted: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        redirect("/profile?error=github_taken");
      }

      redirect("/profile?error=failed");
    }

    redirect("/profile?updated=1");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-600">
              Profile
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-[#0f172a]">
              Your developer profile
            </h1>
            <p className="mt-2 text-sm font-medium text-[#64748b]">
              Keep your information up to date for better recommendations.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-xl border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#334155]"
            >
              Home
            </Link>
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="rounded-xl border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#334155]"
            >
              Sign out
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#334155]">
          Signed in as {user.email}
        </div>

        {success ? (
          <div className="mb-6 rounded-xl border border-[#d1fadf] bg-[#ecfdf3] px-4 py-3 text-sm font-semibold text-[#027a48]">
            {success}
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-xl border border-[#f8d7da] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#b42318]">
            {error}
          </div>
        ) : null}

        <form action={updateProfile} className="grid gap-5">
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
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-[#334155]">
            Skills (comma separated)
            <input
              name="skills"
              required
              defaultValue={user.skills.join(", ")}
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-[#334155]">
              Timezone
              <input
                name="timezone"
                required
                defaultValue={user.timezone ?? ""}
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
              className="rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-medium text-[#0f172a] outline-none focus:border-accent-500"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
          >
            Save profile
          </button>
        </form>
      </div>
    </main>
  );
}
