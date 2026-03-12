import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  CirclePlay,
  Globe,
  Sparkles,
} from "lucide-react";

const productLinks = ["Products", "Resources", "Docs"];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-primary-600 shadow-[0_6px_14px_rgba(24,112,243,0.35)]">
        <span className="h-4.5 w-4.5 rounded-full border-[5px] border-white border-r-transparent border-b-transparent" />
      </span>
      <span className="font-display text-4 font-semibold tracking-tight text-[#181f2f] sm:text-3xl">
        CODEMAARG
      </span>
    </div>
  );
}

function IsoTile({ title, labels }: { title: string; labels: string[] }) {
  return (
    <div className="relative rounded-[1.6rem] border border-white/70 bg-white/70 p-4 shadow-[0_16px_35px_rgba(35,65,115,0.16)] backdrop-blur-md sm:p-5">
      <p className="text-[0.67rem] font-semibold uppercase tracking-[0.17em] text-[#4e6490]">
        {title}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
        {labels.map((label) => (
          <span
            key={label}
            className="rounded-xl border border-[#d8e6ff] bg-[#f8fbff] px-2 py-2 text-center text-[0.68rem] font-semibold text-[#38507b] shadow-[0_6px_12px_rgba(16,53,112,0.08)] sm:text-xs"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="h-1.5 bg-[#2f4f5f]" />

      <header className="px-4 pt-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex h-22 w-full max-w-352.5 items-center rounded-[2.35rem] border border-white/80 bg-white/80 px-5 shadow-[0_8px_30px_rgba(19,46,90,0.13)] backdrop-blur-md sm:px-7 lg:px-12">
          <BrandMark />

          <nav className="mx-auto hidden items-center gap-12 lg:flex">
            {productLinks.map((item) => (
              <Link
                key={item}
                href="#"
                className="text-lg font-semibold tracking-tight text-[#222d44] transition-colors hover:text-primary-600"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-[#dae6fb] bg-[#edf4ff] px-4 py-2.5 text-sm font-semibold text-[#33496f] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:flex"
            >
              <Globe className="h-4 w-4 text-primary-500" />
              India
              <ChevronDown className="h-4 w-4 text-[#7c8ca8]" />
            </button>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-primary-600 ring-1 ring-[#d6e4fb] transition hover:bg-[#f5f9ff] sm:text-base"
            >
              Contact us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="relative px-4 pb-20 pt-8 sm:px-6 lg:px-10">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />

        <section className="relative z-10 mx-auto max-w-352.5 text-center">
          <div className="mx-auto max-w-185 rounded-3xl border border-white/80 bg-white/70 px-7 py-4 text-lg font-semibold text-[#222d44] shadow-[0_10px_35px_rgba(24,40,86,0.12)] backdrop-blur-md">
            CodeMaarg now powers founder-first developer collaboration at global scale.
            <a href="#" className="ml-2 font-bold text-primary-600 hover:text-primary-700">
              Click here
            </a>
            <span className="ml-1 text-[#586986]">to read more.</span>
          </div>

          <h1 className="mx-auto mt-11 max-w-245 text-balance text-5xl font-bold leading-[0.95] text-[#0f1d38] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-primary-600">Global Developer</span>
            <br />
            Project Operating System
          </h1>

          <p className="mx-auto mt-7 max-w-220 text-pretty text-lg font-semibold text-[#586987] sm:text-2xl">
            Superior project clarity, higher shipping velocity, and minimal coordination friction.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-primary-500 bg-primary-500 px-10 text-lg font-bold text-white shadow-[0_8px_0_0_#0c4eb8,0_15px_26px_rgba(17,82,190,0.35)] transition hover:-translate-y-0.5 hover:bg-primary-600"
            >
              Start Now
            </Link>

            <Link
              href="#"
              className="inline-flex h-14 items-center gap-3 rounded-xl border border-[#93a9c9] bg-[#deebfa] px-6 text-lg font-extrabold uppercase tracking-[0.08em] text-[#163059] shadow-[0_6px_0_0_#1d2e4f,0_14px_22px_rgba(17,43,90,0.2)] transition hover:-translate-y-0.5"
            >
              Learn More
              <CirclePlay className="h-7 w-7 text-primary-500" />
            </Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-18 max-w-352.5">
          <div className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-72 max-w-232.5 rounded-full bg-[#8eb8f9]/30 blur-[90px]" />

          <div className="relative mx-auto h-107.5 w-full max-w-282.5 min-[420px]:h-127.5 sm:h-140">
            <div className="floating absolute left-1/2 top-0 z-30 w-[68%] -translate-x-1/2 rounded-4xl border border-[#d7e3f7] bg-white/85 px-7 py-6 shadow-[0_22px_45px_rgba(26,63,125,0.21)] backdrop-blur-md sm:px-10 sm:py-8">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-500 shadow-[0_14px_30px_rgba(25,110,241,0.4)] sm:h-24 sm:w-24">
                <span className="h-11 w-11 rounded-full border-10 border-[#edf4ff] border-r-transparent border-b-transparent" />
              </div>
              <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#6380b2] sm:text-sm">
                Core Intelligence Layer
              </p>
            </div>

            <div className="absolute left-1/2 top-[31.5%] z-20 h-7 w-7 -translate-x-1/2 rounded-md bg-primary-500 shadow-[0_12px_20px_rgba(24,112,243,0.34)]" />
            <div className="absolute left-[31%] top-[34%] h-px w-[18%] bg-[#8ea9cc]" />
            <div className="absolute right-[31%] top-[34%] h-px w-[18%] bg-[#8ea9cc]" />
            <div className="absolute left-1/2 top-[36%] h-[14%] w-px -translate-x-1/2 bg-[#8ea9cc]" />

            <div className="floating-slow absolute left-[3%] top-[39%] z-20 w-[37%] min-w-65 transform-[rotate(-8deg)]">
              <IsoTile
                title="Validation Network"
                labels={["Votes", "Comments", "Feedback", "Proof"]}
              />
            </div>

            <div className="floating absolute right-[3%] top-[39%] z-20 w-[37%] min-w-65 transform-[rotate(8deg)]">
              <IsoTile
                title="Team Match"
                labels={["Vector", "Timezone", "Skills", "Culture"]}
              />
            </div>

            <div className="floating-slow absolute left-1/2 top-[64%] z-20 w-[36%] min-w-67.5 -translate-x-1/2">
              <IsoTile
                title="Delivery Engine"
                labels={["Milestones", "Backlog", "Roadmap", "Launch"]}
              />
            </div>

            <div className="absolute bottom-0 left-1/2 z-10 w-[56%] min-w-72.5 -translate-x-1/2 rounded-[1.8rem] border border-[#d6e2f7] bg-white/80 px-5 py-4 shadow-[0_16px_35px_rgba(25,52,100,0.17)] backdrop-blur-md">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {["Postgres", "Prisma", "Atlas", "Next.js"].map((item) => (
                  <span
                    key={item}
                    className="grid h-10 place-items-center rounded-lg border border-[#d8e6ff] bg-[#f7fbff] text-[0.65rem] font-extrabold uppercase tracking-[0.09em] text-[#315585] sm:text-[0.72rem]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-16 max-w-275 rounded-4xl border border-white/80 bg-white/60 px-6 py-5 shadow-[0_14px_30px_rgba(20,49,96,0.1)] backdrop-blur-md sm:px-10 sm:py-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f6792]">
                Built for scale
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#102447] sm:text-3xl">
                AI-first product building from idea to launch
              </h2>
            </div>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#16284c] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#1f3564]"
            >
              Explore Platform
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
