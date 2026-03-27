import Link from "next/link";

const principles = [
  {
    title: "Clarity before complexity",
    description:
      "We help developers turn unclear ideas into practical milestones before writing heavy implementation code.",
  },
  {
    title: "Signal over noise",
    description:
      "Validation features prioritize meaningful feedback and vote signal so builders can focus on ideas that matter.",
  },
  {
    title: "Build with the right people",
    description:
      "Matchmaking is designed to connect developers based on context, skills, and shared execution intent.",
  },
];

const storyBlocks = [
  {
    title: "Why we built this",
    description:
      "Most developer products fail before code quality becomes the issue. They fail in planning, scope, and alignment. CodeMaarg exists to solve that earlier stage.",
    tone: "bg-[#ecfdf3] border-[#b7ebca]",
  },
  {
    title: "What we optimize for",
    description:
      "We optimize for shipping velocity with fewer wrong turns by combining roadmap clarity, community feedback loops, and execution focused collaboration.",
    tone: "bg-[#eff6ff] border-[#c8ddff]",
  },
];

const momentumStats = [
  { label: "Roadmaps generated", value: "2.4k+", tone: "text-[#16a34a]" },
  { label: "Ideas validated", value: "890+", tone: "text-[#1d4ed8]" },
  { label: "Collaboration matches", value: "1.1k+", tone: "text-[#b45309]" },
];

const phases = [
  {
    step: "01",
    title: "Idea to roadmap",
    detail:
      "Developers submit a concept and receive a structured roadmap aligned to skill level and delivery scope.",
  },
  {
    step: "02",
    title: "Roadmap to validation",
    detail:
      "The idea is published for community feedback through votes and discussion based refinement.",
  },
  {
    step: "03",
    title: "Validation to execution",
    detail:
      "Builders move forward with clear plans, better confidence, and stronger collaboration inputs.",
  },
];

const highlights = [
  { value: "Roadmap first", label: "Start with clear milestones" },
  { value: "Community signal", label: "Validate with real feedback" },
  { value: "Match focused", label: "Find relevant collaborators" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2f7] px-4 py-10 text-[#0f172a]">
      <div className="pointer-events-none absolute -left-20 top-8 h-80 w-80 rounded-full bg-[#bbf7d0]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#dbeafe]/70 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl space-y-7">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#dbe3ee] bg-white p-8 shadow-[0_20px_48px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="pointer-events-none absolute -right-18 -top-18 h-64 w-64 rounded-full border border-[#dbe3ee] bg-[#f8fafc]" />

          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#16a34a]">
            About CodeMaarg
          </p>
          <h1 className="font-serif mt-3 max-w-3xl text-5xl font-bold leading-[1.02] sm:text-6xl">
            Built for developers who want to ship, not stall
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#475569]">
            CodeMaarg helps builders move from vague concepts to clear execution paths. We combine
            roadmap generation, validation workflows, and focused collaboration surfaces so teams can
            make better decisions before and during implementation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-[#dbe3ee] bg-[#f8fafc] p-4"
              >
                <p className="text-lg font-bold text-[#0f172a]">{item.value}</p>
                <p className="mt-1 text-sm font-medium text-[#64748b]">{item.label}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {momentumStats.map((item) => (
              <article key={item.label} className="rounded-xl border border-[#dbe3ee] bg-white px-4 py-3">
                <p className={`text-2xl font-bold ${item.tone}`}>{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {storyBlocks.map((block) => (
            <article
              key={block.title}
              className={`rounded-2xl border p-6 shadow-[0_10px_20px_rgba(15,23,42,0.06)] ${block.tone}`}
            >
              <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">{block.title}</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#334155]">{block.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_10px_20px_rgba(15,23,42,0.07)]"
            >
              <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">{principle.title}</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#4b5563]">
                {principle.description}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#16a34a]">Workflow</p>
              <h2 className="font-serif mt-2 text-4xl font-bold">How the product flows</h2>
            </div>
            <Link
              href="/discover"
              className="rounded-xl border border-[#dbe3ee] bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#334155]"
            >
              Explore discovery
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {phases.map((phase) => (
              <article
                key={phase.step}
                className="rounded-2xl border border-[#dbe3ee] bg-[#fbfcfe] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#16a34a]">
                  Step {phase.step}
                </p>
                <h3 className="mt-2 text-xl font-bold text-[#0f172a]">{phase.title}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-[#64748b]">{phase.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[#facc15]/45 bg-gradient-to-r from-[#fffbeb] via-[#fefce8] to-[#fff7ed] p-7 shadow-[0_12px_28px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b45309]">Who we serve</p>
          <h2 className="mt-2 font-serif text-4xl font-bold text-[#0f172a]">Built for builders who execute</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#475569]">
            Solo developers, startup teams, and open source contributors use CodeMaarg to reduce
            planning uncertainty and convert momentum into shipped outcomes.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#f7d68a] bg-white px-3 py-1 text-xs font-semibold text-[#92400e]">
              Solo builders
            </span>
            <span className="rounded-full border border-[#f7d68a] bg-white px-3 py-1 text-xs font-semibold text-[#92400e]">
              Startup teams
            </span>
            <span className="rounded-full border border-[#f7d68a] bg-white px-3 py-1 text-xs font-semibold text-[#92400e]">
              Open source collaborators
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-[#0f172a] bg-[#0f172a] p-7 text-white shadow-[0_18px_34px_rgba(15,23,42,0.22)] sm:p-9">
          <h2 className="font-serif text-4xl font-bold">Ready to build with better direction</h2>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-[#cbd5e1]">
            Join CodeMaarg to plan your next product, validate your assumptions, and execute with
            higher confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/auth/signin"
              className="rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Start building
            </Link>
            <Link
              href="/app"
              className="rounded-xl border border-[#334155] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Open app
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
