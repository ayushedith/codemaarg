export default function NewRoadmapPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Create roadmap</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Describe your idea and generate a milestone based build plan.
        </p>
      </div>

      <form className="grid gap-4 rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
        <label className="grid gap-2 text-sm font-semibold text-[#334155]">
          Project title
          <input
            placeholder="Build a collaborative coding platform"
            className="rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 py-3 text-sm font-medium outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#334155]">
          Current skill level
          <select className="rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 py-3 text-sm font-medium outline-none">
            <option>BEGINNER</option>
            <option>INTERMEDIATE</option>
            <option>ADVANCED</option>
            <option>EXPERT</option>
          </select>
        </label>

        <button
          type="button"
          className="w-fit rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Generate roadmap
        </button>
      </form>
    </section>
  );
}
