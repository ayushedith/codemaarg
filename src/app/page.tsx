import Link from "next/link";
import { ArrowRight, Dot, Search } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Roadmaps", href: "/app/roadmaps" },
  { label: "Projects", href: "/app/projects" },
];

const featureBlocks = [
  {
    title: "Generate practical roadmaps",
    description:
      "Turn rough project ideas into clear milestone plans with tasks, dependencies, and architecture suggestions that match your skill level.",
  },
  {
    title: "Validate ideas early",
    description:
      "Publish concepts, collect votes, and receive constructive threaded feedback so you can refine scope before heavy implementation.",
  },
  {
    title: "Match with the right teammates",
    description:
      "Use semantic profile matching to find collaborators with relevant skills, compatible timezones, and shared project intent.",
  },
];

const footerMain = [
  { label: "Discover Projects", href: "/discover/projects" },
  { label: "Trending Ideas", href: "/discover/trending" },
  { label: "Build Logs", href: "/app/projects" },
  { label: "Developer Profiles", href: "/profile" },
  { label: "Blog", href: "/discover" },
  { label: "Docs", href: "/app" },
];

const footerTools = [
  { label: "Roadmap Generator", href: "/app/roadmaps/new" },
  { label: "Validation Feed", href: "/discover/trending" },
  { label: "Semantic Match", href: "/discover/trending" },
  { label: "Project Workspace", href: "/app/projects" },
  { label: "Milestone Board", href: "/app/roadmaps" },
  { label: "Launch Checklist", href: "/app" },
];

const footerCompany = [
  { label: "About", href: "/about" },
  { label: "Help Center", href: "/help-center" },
  { label: "Privacy", href: "/privacy" },
  { label: "Community Rules", href: "/community-guidelines" },
  { label: "Terms", href: "/terms" },
];

const members = [
  "AK",
  "RM",
  "SK",
  "TN",
  "AS",
  "VT",
  "KP",
  "MG",
  "RH",
  "NJ",
  "PR",
  "YS",
  "AD",
  "VB",
  "TT",
  "CS",
  "HR",
  "DL",
  "VG",
  "IB",
  "AM",
  "RS",
  "NK",
  "PL",
  "KS",
  "PM",
  "SR",
  "DN",
  "JG",
  "LM",
  "RK",
  "AG",
  "FT",
  "MM",
  "JP",
  "KR",
  "SD",
  "OM",
  "CJ",
  "BV",
  "RL",
  "UM",
  "GH",
  "SW",
  "DV",
  "IA",
  "YT",
  "EP",
  "HZ",
  "LC",
  "NR",
  "PK",
  "AR",
  "VM",
  "QS",
  "MB",
  "RP",
  "TG",
  "HL",
  "SF",
  "UG",
  "CA",
  "ZZ",
  "MI",
  "OP",
];

const avatarBg = [
  "bg-[#dfe5f3]",
  "bg-[#ecdfd8]",
  "bg-[#d8ece2]",
  "bg-[#ece7d8]",
  "bg-[#e6def2]",
  "bg-[#dce9ef]",
  "bg-[#ece0ea]",
  "bg-[#e7e9d6]",
  "bg-[#dee3ea]",
  "bg-[#e9dfd7]",
];

const qrPattern = [
  0, 1, 2, 3, 4, 5, 7, 9, 10, 13, 14, 15, 17, 19, 20, 22, 24, 26, 27, 28, 29,
  31, 34, 36, 37, 40, 41, 43, 45, 46, 48,
];

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-500 text-sm font-bold text-white">
        C
      </span>
      <span className="font-serif text-3xl font-bold tracking-tight text-[#0f172a]">
        CodeMaarg
      </span>
    </div>
  );
}

function UsernameBox() {
  return (
    <div className="mx-auto mt-10 w-full max-w-107.5 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-[0_6px_14px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500 text-white">
          <Dot className="h-6 w-6" />
        </span>
        <span className="text-xl font-bold text-[#0f172a]">codemaarg.dev/</span>
        <input
          aria-label="username"
          placeholder="username"
          className="h-10 flex-1 rounded-lg bg-transparent px-1 text-lg font-semibold text-[#475569] outline-none placeholder:text-[#cbd5e1]"
        />
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-xl bg-[#9ca3af] text-white transition hover:bg-[#6b7280]"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function AvatarWall() {
  return (
    <div className="avatar-wall mx-auto mt-14 w-full max-w-155">
      <div className="avatar-wall-grid grid grid-cols-8 gap-3 sm:grid-cols-10">
        {members.map((member, idx) => (
          <div
            key={`${member}-${idx}`}
            className={`avatar-item grid h-11 w-11 place-items-center rounded-full text-xs font-bold text-[#334155] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${avatarBg[idx % avatarBg.length]}`}
          >
            {member}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm font-semibold text-[#94a3b8]">
        12,000+ developers already validating and shipping with CodeMaarg
      </p>
    </div>
  );
}

function QrWidget() {
  return (
    <aside className="fixed bottom-4 right-4 z-40 hidden rounded-2xl border border-[#e2e8f0] bg-white p-3 text-center shadow-[0_8px_18px_rgba(15,23,42,0.12)] lg:block">
      <p className="mb-2 text-sm font-bold text-[#1f2937]">Mobile beta</p>
      <div className="grid w-23.5 grid-cols-7 gap-0.5 rounded-md bg-white p-1 ring-1 ring-[#dbe2ea]">
        {Array.from({ length: 49 }).map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 rounded-xs ${qrPattern.includes(idx) ? "bg-[#0f172a]" : "bg-[#f8fafc]"}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-bold text-accent-600">CM</p>
    </aside>
  );
}

export default async function Home() {
  const session = await auth();
  const onboardingCompleted = session?.user?.id
    ? (
        await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { onboardingCompleted: true },
        })
      )?.onboardingCompleted ?? false
    : false;

  const displayName =
    session?.user?.name?.trim() || session?.user?.email || "Developer";

  return (
    <div className="relative min-h-screen bg-[#f4f5f6] text-[#0f172a]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-55" />

      <header className="sticky top-4 z-30 px-4">
        <div className="mx-auto flex h-14 w-full max-w-220 items-center rounded-2xl border border-[#e6ebf1] bg-white/95 px-3 shadow-[0_8px_20px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-5">
          <Brand />

          <nav className="mx-auto hidden items-center gap-7 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#111827] transition hover:text-accent-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {session?.user ? (
              <>
                <span className="hidden rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#111827] lg:block">
                  {displayName}
                </span>
                <Link
                  href={onboardingCompleted ? "/profile" : "/onboarding"}
                  className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#f1f5f9]"
                >
                  {onboardingCompleted ? "Profile" : "Complete Profile"}
                </Link>
                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#f1f5f9]"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-xl border border-[#e5e7eb] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#f1f5f9]"
              >
                Sign in
              </Link>
            )}
            <Link
              href={session?.user ? (onboardingCompleted ? "/profile" : "/onboarding") : "/auth/signin"}
              className="rounded-xl bg-accent-500 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-accent-600"
            >
              {session?.user
                ? onboardingCompleted
                  ? "Continue Building"
                  : "Start Onboarding"
                : "Start Building"}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-16 pt-14 sm:pt-20">
        <section className="mx-auto max-w-195 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-4 py-2 text-sm font-bold text-white shadow-[0_6px_15px_rgba(15,23,42,0.25)]">
            <span className="text-base">🚀</span>
            Now live: AI Roadmaps plus Semantic Team Match
            <ArrowRight className="h-4 w-4" />
          </div>

          <h1 className="font-serif mt-10 text-5xl font-bold leading-[1.08] text-[#0f172a] sm:text-6xl md:text-7xl">
            From raw ideas
            <br />
            to shipped developer products
          </h1>

          <p className="mx-auto mt-6 max-w-160 text-xl font-medium leading-9 text-[#475569]">
            Plan with clarity, validate with community signal, and build with the right collaborators.
            CodeMaarg helps developers move from concept to launch with confidence.
          </p>

          <UsernameBox />
          <p className="mt-4 text-sm font-semibold text-[#a3afc1]">
            Reserve your creator URL before your preferred name is taken
          </p>

          <AvatarWall />
        </section>

        <section className="mx-auto mt-20 max-w-260">
          <div className="grid gap-5 md:grid-cols-3">
            {featureBlocks.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e3e8ef] bg-white p-6 shadow-[0_6px_16px_rgba(15,23,42,0.05)]"
              >
                <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">{item.title}</h2>
                <p className="mt-3 text-base font-medium leading-7 text-[#4b5563]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-195 text-center">
          <h2 className="font-serif text-5xl font-bold leading-[1.12] text-[#0f172a] sm:text-6xl">
            Build your next project with
            <br />
            better planning and better people
          </h2>

          <UsernameBox />
          <p className="mt-4 text-sm font-semibold text-[#a3afc1]">
            Create your profile and start your first roadmap in minutes
          </p>
        </section>
      </main>

      <footer className="mx-auto mt-24 w-full max-w-260 px-4 pb-12">
        <div className="border-t border-[#d8dee7] pt-10">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <p className="font-serif text-6xl font-bold text-[#d8dde6]">CodeMaarg</p>
              <p className="mt-5 max-w-70 text-sm font-semibold leading-7 text-[#64748b]">
                A developer first platform for roadmap generation, idea validation, and semantic team matchmaking.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#111827]">Main Pages</p>
              <ul className="mt-4 space-y-2.5">
                {footerMain.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[15px] font-semibold text-[#475569] hover:text-[#111827]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#111827]">Tools</p>
              <ul className="mt-4 space-y-2.5">
                {footerTools.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[15px] font-semibold text-[#475569] hover:text-[#111827]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#111827]">Company</p>
              <ul className="mt-4 space-y-2.5">
                {footerCompany.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[15px] font-semibold text-[#475569] hover:text-[#111827]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 border-t border-[#e2e8f0] pt-5 text-sm font-semibold text-[#64748b] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 CodeMaarg Inc.</p>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Built for developers who execute
            </div>
          </div>
        </div>
      </footer>

      <QrWidget />
    </div>
  );
}
