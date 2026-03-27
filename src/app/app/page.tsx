import Link from "next/link";

const quickActions = [
  {
    title: "Generate a roadmap",
    description: "Turn an idea into an execution path.",
    href: "/app/roadmaps/new",
    cta: "Create roadmap",
  },
  {
    title: "Publish a project idea",
    description: "Share your concept and gather feedback.",
    href: "/app/projects/new",
    cta: "Create project",
  },
  {
    title: "Explore community projects",
    description: "Review active ideas and see trends.",
    href: "/discover/projects",
    cta: "Open discover",
  },
];

export default function AppDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Dashboard</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Manage your roadmaps, project ideas, and discovery workflow from one place.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <article
            key={action.title}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <h2 className="text-xl font-bold text-[#0f172a]">{action.title}</h2>
            <p className="mt-2 text-sm font-medium text-[#64748b]">{action.description}</p>
            <Link
              href={action.href}
              className="mt-4 inline-flex rounded-lg bg-[#16a34a] px-3 py-2 text-sm font-semibold text-white"
            >
              {action.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
