import Link from "next/link";

const publicProjects = [
  {
    slug: "developer-handoff-companion",
    title: "Developer Handoff Companion",
    summary: "Create handoff packs for async product teams.",
    votes: 58,
  },
  {
    slug: "test-suite-simplifier",
    title: "Test Suite Simplifier",
    summary: "Reduce fragile integration tests with guided refactors.",
    votes: 42,
  },
  {
    slug: "api-quality-studio",
    title: "API Quality Studio",
    summary: "Benchmark API quality before release.",
    votes: 36,
  },
];

export default function DiscoverProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Discover projects</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Browse published ideas and open detailed pages to review demand signal.
        </p>
      </div>

      <div className="grid gap-4">
        {publicProjects.map((project) => (
          <article
            key={project.slug}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">{project.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#64748b]">{project.summary}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#16a34a]">
                  {project.votes} votes
                </p>
              </div>
              <Link
                href={`/discover/projects/${project.slug}`}
                className="rounded-lg border border-[#dbe3ee] px-3 py-2 text-sm font-semibold text-[#334155]"
              >
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
