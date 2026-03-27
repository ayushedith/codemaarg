import Link from "next/link";

const sections = [
  {
    title: "Project listing",
    description: "Browse published project ideas with clear summaries.",
    href: "/discover/projects",
    cta: "Open projects",
  },
  {
    title: "Trending ideas",
    description: "See which ideas are receiving the most votes.",
    href: "/discover/trending",
    cta: "Open trending",
  },
];

export default function DiscoverHomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Discover</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Start from the section you need and review community validated ideas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
          >
            <h2 className="text-xl font-bold text-[#0f172a]">{section.title}</h2>
            <p className="mt-2 text-sm font-medium text-[#64748b]">{section.description}</p>
            <Link
              href={section.href}
              className="mt-4 inline-flex rounded-lg bg-[#16a34a] px-3 py-2 text-sm font-semibold text-white"
            >
              {section.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
