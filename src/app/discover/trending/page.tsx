import Link from "next/link";

const trendingProjects = [
  {
    slug: "developer-handoff-companion",
    title: "Developer Handoff Companion",
    votes: 58,
    summary: "Structured context handoff for product and engineering teams.",
  },
  {
    slug: "incident-replay-lab",
    title: "Incident Replay Lab",
    votes: 53,
    summary: "Reconstruct production incidents and test preventive fixes.",
  },
  {
    slug: "api-quality-studio",
    title: "API Quality Studio",
    votes: 49,
    summary: "Measure API quality and reliability before shipping.",
  },
];

export default function DiscoverTrendingPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Trending ideas</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Ranked by community vote signal across published projects.
        </p>
      </div>

      <div className="grid gap-4">
        {trendingProjects.map((project, index) => (
          <article
            key={project.slug}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#16a34a]">
                  Rank {index + 1}
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#0f172a]">{project.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#64748b]">{project.summary}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#334155]">
                  {project.votes} votes
                </p>
              </div>
              <Link
                href={`/discover/projects/${project.slug}`}
                className="rounded-lg border border-[#dbe3ee] px-3 py-2 text-sm font-semibold text-[#334155]"
              >
                View project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
