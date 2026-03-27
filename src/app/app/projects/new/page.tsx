export default function NewProjectPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#dbe3ee] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <h1 className="font-serif text-4xl font-bold">Create project idea</h1>
        <p className="mt-2 text-base font-medium text-[#475569]">
          Write a clear problem statement and invite validation.
        </p>
      </div>

      <form className="grid gap-4 rounded-2xl border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
        <label className="grid gap-2 text-sm font-semibold text-[#334155]">
          Title
          <input
            placeholder="Developer onboarding analytics toolkit"
            className="rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 py-3 text-sm font-medium outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#334155]">
          Description
          <textarea
            rows={6}
            placeholder="Describe the problem, users, and initial solution scope"
            className="rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 py-3 text-sm font-medium outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#334155]">
          Tags
          <input
            placeholder="analytics, productivity, devtools"
            className="rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 py-3 text-sm font-medium outline-none"
          />
        </label>

        <button
          type="button"
          className="w-fit rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Save draft
        </button>
      </form>
    </section>
  );
}
