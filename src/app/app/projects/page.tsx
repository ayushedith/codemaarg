import Link from "next/link";

const sampleProjects = [
  {
    id: "proj-community-sprint",
    title: "Community Sprint Platform",
    status: "Draft",
    signal: "12 votes",
  },
  {
    id: "proj-doc-assistant",
    title: "Developer Docs Assistant",
    status: "Published",
    signal: "47 votes",
  },
  {
    id: "proj-ci-insights",
    title: "CI Insights Dashboard",
    status: "Published",
    signal: "31 votes",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div>
          <h1 className="font-serif text-4xl font-bold">My projects</h1>
          <p className="mt-2 text-base font-medium text-[#475569]">
            Manage project ideas, publish updates, and track community signal.
          </p>
        </div>
        <Link
          href="/app/projects/new"
          className="rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white"
        >
          New project
        </Link>
      </div>

      <div className="grid gap-4">
        {sampleProjects.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">{project.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#64748b]">
                  {project.status} • {project.signal}
                </p>
              </div>
              <Link
                href={`/app/projects/${project.id}`}
                className="rounded-lg border border-[#dbe3ee] px-3 py-2 text-sm font-semibold text-[#334155]"
              >
                Open
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
