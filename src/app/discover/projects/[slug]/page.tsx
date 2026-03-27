import Link from "next/link";

type PublicProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicProjectDetailPage({
  params,
}: PublicProjectDetailPageProps) {
  const { slug } = await params;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#16a34a]">Project slug</p>
        <h1 className="mt-2 font-serif text-4xl font-bold">{slug}</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Public project details, vote totals, and comments will be loaded here.
        </p>
      </div>

      <div className="rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
        <h2 className="text-xl font-bold">Validation signal</h2>
        <p className="mt-2 text-sm font-medium text-[#64748b]">
          This section will show upvotes, downvotes, and discussion summary.
        </p>
        <Link
          href="/discover/projects"
          className="mt-4 inline-flex rounded-lg border border-[#dbe3ee] px-3 py-2 text-sm font-semibold text-[#334155]"
        >
          Back to project listing
        </Link>
      </div>
    </section>
  );
}
