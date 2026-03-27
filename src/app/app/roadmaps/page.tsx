import Link from "next/link";

const sampleRoadmaps = [
  {
    id: "sample-api-platform",
    title: "Developer API Platform",
    stage: "In progress",
    updatedAt: "Updated today",
  },
  {
    id: "sample-ai-notes",
    title: "AI Note Summarizer",
    stage: "Draft",
    updatedAt: "Updated yesterday",
  },
  {
    id: "sample-dev-community",
    title: "Developer Community Hub",
    stage: "Review",
    updatedAt: "Updated 3 days ago",
  },
];

export default function RoadmapsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <div>
          <h1 className="font-serif text-4xl font-bold">My roadmaps</h1>
          <p className="mt-2 text-base font-medium text-[#475569]">
            Create and manage your product execution plans.
          </p>
        </div>
        <Link
          href="/app/roadmaps/new"
          className="rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white"
        >
          New roadmap
        </Link>
      </div>

      <div className="grid gap-4">
        {sampleRoadmaps.map((roadmap) => (
          <article
            key={roadmap.id}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">{roadmap.title}</h2>
                <p className="mt-1 text-sm font-medium text-[#64748b]">
                  {roadmap.stage} • {roadmap.updatedAt}
                </p>
              </div>
              <Link
                href={`/app/roadmaps/${roadmap.id}`}
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
