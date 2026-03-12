import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CirclePlay,
  Globe,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const productLinks = ["Products", "Resources", "Docs"];

const platformPillars = [
  {
    title: "Roadmap Intelligence",
    description:
      "Convert raw project ideas into clear milestone plans with practical tasks, suggested libraries, and backend patterns that match your current skill level.",
  },
  {
    title: "Community Validation",
    description:
      "Collect meaningful votes and thoughtful comments from builders who understand execution. Learn what people want before you spend months building in isolation.",
  },
  {
    title: "Semantic Team Match",
    description:
      "Match with collaborators through skill context, timezone proximity, and project intent. Build teams that can ship consistently with less friction.",
  },
  {
    title: "Project Visibility",
    description:
      "Publish your idea profile with clean storytelling and strong technical framing so the right developers, mentors, and early adopters can find you quickly.",
  },
  {
    title: "Execution Dashboard",
    description:
      "Track roadmap completion, validation momentum, and team progress in one place. Move from ambition to shipped outcomes with structure and confidence.",
  },
  {
    title: "Secure Growth Foundation",
    description:
      "Built on reliable data architecture with efficient query patterns, scalable indexing, and modern cloud ready workflows that support long term growth.",
  },
];

const outcomes = [
  { metric: "62%", label: "faster roadmap clarity for new ideas" },
  { metric: "3.1x", label: "more meaningful feedback from peers" },
  { metric: "44%", label: "better collaboration consistency" },
  { metric: "87%", label: "higher confidence before build start" },
];

const executionFlow = [
  {
    step: "01",
    title: "Capture Intent",
    details:
      "Share your project title, outcome goal, target users, and current capability. The system builds context that is specific, useful, and ready for planning.",
  },
  {
    step: "02",
    title: "Generate Plan",
    details:
      "Receive a structured roadmap with milestone sequence, practical scope boundaries, and technical recommendations that support quality delivery.",
  },
  {
    step: "03",
    title: "Validate Direction",
    details:
      "Publish your concept to the community. Gather signal through thoughtful voting and threaded feedback from developers who care about results.",
  },
  {
    step: "04",
    title: "Find Collaborators",
    details:
      "Get smart match suggestions based on semantic profile fit, preferred working hours, and complementary capability so teams form naturally.",
  },
  {
    step: "05",
    title: "Build with Focus",
    details:
      "Execute milestone tasks with clear ownership and visible progress. Replace uncertainty with momentum as your team moves through each phase.",
  },
  {
    step: "06",
    title: "Launch with Confidence",
    details:
      "Ship with validated direction, documented architecture, and a clear contributor story that supports growth, hiring, and user trust.",
  },
];

const audienceTracks = [
  {
    title: "Solo Builders",
    summary:
      "You get strategic structure, practical technical guidance, and a trusted way to gain validation before investing heavy development effort.",
  },
  {
    title: "Student Developers",
    summary:
      "You learn through real project execution with clear milestones and thoughtful feedback, building confidence while creating portfolio quality work.",
  },
  {
    title: "Startup Teams",
    summary:
      "You align product direction, architecture choices, and hiring strategy through one shared system that keeps everyone focused on outcomes.",
  },
  {
    title: "Engineering Leaders",
    summary:
      "You monitor idea quality, team readiness, and execution velocity with a platform that supports consistent planning and responsible delivery.",
  },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder and Product Engineer",
    quote:
      "CodeMaarg gave me more than a plan. It gave me confidence. I moved from a rough concept to a shipping roadmap in one afternoon and found two serious collaborators in one week.",
  },
  {
    name: "Riya Sen",
    role: "Full Stack Developer",
    quote:
      "The quality of discussion is excellent. Feedback is practical, respectful, and technical. I no longer guess if an idea is useful. I validate, refine, and then build with purpose.",
  },
  {
    name: "Karthik Iyer",
    role: "Engineering Manager",
    quote:
      "For early stage initiatives this platform is extremely valuable. Our team aligns faster, makes stronger architecture decisions, and reduces waste before serious implementation begins.",
  },
];

const faqs = [
  {
    question: "Who should use CodeMaarg first",
    answer:
      "Any developer with an idea and a desire to execute. You can be a beginner, an experienced engineer, or a startup founder looking for technical clarity.",
  },
  {
    question: "How does matchmaking actually work",
    answer:
      "The system compares semantic profile context with project needs, then combines this with structured factors such as timezone and skill overlap to rank candidate fit.",
  },
  {
    question: "Can I keep my project private",
    answer:
      "Yes. You can control visibility and decide when to publish for validation. Private planning can happen before any public sharing step.",
  },
  {
    question: "Is this only for startup ideas",
    answer:
      "No. You can use it for open source tools, learning projects, internal innovation tracks, and community products of many sizes.",
  },
  {
    question: "Do I need advanced AI knowledge",
    answer:
      "No. The platform converts your plain language input into a structured roadmap and architectural suggestions that are easy to understand and execute.",
  },
  {
    question: "What makes the feedback useful",
    answer:
      "The system promotes constructive technical conversation and threaded context so each comment adds clarity rather than noise.",
  },
];

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

      <main className="relative px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-35" />

        <section className="relative z-10 mx-auto max-w-352.5 text-center">
          <div className="mx-auto max-w-185 rounded-3xl border border-white/80 bg-white/70 px-7 py-4 text-lg font-semibold text-[#222d44] shadow-[0_10px_35px_rgba(24,40,86,0.12)] backdrop-blur-md">
            CodeMaarg now powers founder first developer collaboration at global scale.
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
                {["Postgres", "Prisma", "Atlas", "Next"].map((item) => (
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

        <section className="relative z-10 mx-auto mt-16 max-w-275 rounded-4xl border border-white/80 bg-white/70 px-6 py-8 shadow-[0_14px_30px_rgba(20,49,96,0.1)] backdrop-blur-md sm:px-10 sm:py-9">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[#4f6792]">
            Platform Overview
          </p>
          <h2 className="font-display mt-2 text-center text-3xl font-bold text-[#102447] sm:text-5xl">
            Everything you need to move from idea to impact
          </h2>
          <p className="mx-auto mt-4 max-w-220 text-center text-lg font-medium leading-8 text-[#4f6284] sm:text-xl">
            CodeMaarg is a complete environment for serious builders. You can plan better,
            validate faster, collaborate smarter, and launch with confidence. Every major step
            in early product creation is supported by structured guidance and practical signal.
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {platformPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-3xl border border-[#dbe8fb] bg-[#f6faff] p-6 shadow-[0_10px_20px_rgba(16,60,130,0.08)]"
              >
                <h3 className="font-display text-2xl font-bold text-[#12284f]">{pillar.title}</h3>
                <p className="mt-3 text-base font-medium leading-7 text-[#4f6388]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#d8e6fa] bg-white/80 px-6 py-9 shadow-[0_12px_28px_rgba(26,60,118,0.09)] backdrop-blur-md sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5e75a1]">
                Performance Outcomes
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold text-[#122952] sm:text-4xl">
                Measurable gains that teams can feel
              </h2>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#16284c] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#1f3564]"
            >
              View case studies
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <div
                key={item.metric}
                className="rounded-3xl border border-[#d8e6fb] bg-[#f8fbff] p-5 text-center"
              >
                <p className="font-display text-5xl font-bold text-primary-600">{item.metric}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[#4f6891]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#d9e7fb] bg-white/80 px-6 py-10 shadow-[0_13px_30px_rgba(24,55,107,0.1)] backdrop-blur-md sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5d74a0]">
            Execution Journey
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-[#11274d] sm:text-5xl">
            A clear path from concept to launch
          </h2>
          <p className="mt-3 max-w-230 text-lg font-medium leading-8 text-[#4d6388]">
            This is not a generic checklist. It is a practical operating model designed for
            modern product teams that want quality speed and confident decision making.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {executionFlow.map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-[#dbe7fb] bg-[#f7fbff] p-6 shadow-[0_10px_22px_rgba(26,68,142,0.06)]"
              >
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-600">
                  Step {item.step}
                </p>
                <h3 className="font-display mt-2 text-2xl font-bold text-[#132b53]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-[#4d6287]">
                  {item.details}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#dae7fb] bg-white/80 px-6 py-10 shadow-[0_13px_30px_rgba(24,55,107,0.1)] backdrop-blur-md sm:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5d74a0]">
                Who benefits most
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold text-[#12284f] sm:text-5xl">
                Designed for every serious builder
              </h2>
            </div>
            <p className="max-w-130 text-base font-semibold leading-7 text-[#4f6388]">
              Whether you are learning, scaling, or leading teams, the system adapts to your
              context and helps you maintain steady progress with less confusion.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {audienceTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-3xl border border-[#dbe8fb] bg-[#f7fbff] p-6 shadow-[0_10px_22px_rgba(24,65,131,0.07)]"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-600" />
                  <h3 className="font-display text-2xl font-bold text-[#12284f]">
                    {track.title}
                  </h3>
                </div>
                <p className="mt-3 text-base font-medium leading-7 text-[#4e6288]">
                  {track.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#dae7fb] bg-white/80 px-6 py-10 shadow-[0_13px_30px_rgba(24,55,107,0.1)] backdrop-blur-md sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5d74a0]">
            Trusted by builders
          </p>
          <h2 className="font-display mt-2 text-3xl font-bold text-[#11274d] sm:text-5xl">
            Professional voices from real teams
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-[#dbe8fb] bg-[#f7fbff] p-6 shadow-[0_10px_22px_rgba(24,65,131,0.07)]"
              >
                <div className="mb-4 flex items-center gap-1 text-[#f6b22a]">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-base font-medium leading-7 text-[#4d6287]">“{item.quote}”</p>
                <p className="mt-5 font-display text-xl font-bold text-[#102549]">{item.name}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#5f76a2]">
                  {item.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#dae7fb] bg-white/80 px-6 py-10 shadow-[0_13px_30px_rgba(24,55,107,0.1)] backdrop-blur-md sm:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#5d74a0]">
                Frequently asked questions
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold text-[#11274d] sm:text-5xl">
                Common questions from new users
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#f4f8ff] px-4 py-2 text-sm font-bold text-[#3f5f95] ring-1 ring-[#d7e4fa]">
              <ShieldCheck className="h-4 w-4" />
              Secure by design
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-3xl border border-[#dbe8fb] bg-[#f7fbff] p-6 shadow-[0_10px_22px_rgba(24,65,131,0.07)]"
              >
                <h3 className="font-display text-2xl font-bold text-[#122a52]">
                  {item.question}
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-[#4d6287]">
                  {item.answer}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Verified guidance
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-14 max-w-300 rounded-4xl border border-[#d3e2fa] bg-[#16284c] px-6 py-10 text-white shadow-[0_18px_36px_rgba(17,40,86,0.26)] sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#afc6f0]">
            Ready to start
          </p>
          <h2 className="font-display mt-2 max-w-220 text-3xl font-bold leading-tight sm:text-5xl">
            Build with focus, validate with confidence, and launch with the right team
          </h2>
          <p className="mt-4 max-w-230 text-lg font-medium leading-8 text-[#d2def5]">
            Join a growing global network of developers who want clarity, quality, and momentum.
            Start with one idea today and turn it into a meaningful product journey.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary-500 px-8 text-lg font-bold text-white shadow-[0_8px_0_0_#0c4eb8] transition hover:bg-primary-600"
            >
              Create your roadmap
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-[#8ea7d5] px-8 text-lg font-bold text-[#dbe8ff] transition hover:bg-white/10"
            >
              Explore live projects
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
