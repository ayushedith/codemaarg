import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Rocket,
  Users,
  Terminal,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              CodeMaarg
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-primary-600 transition-colors">
              How it Works
            </Link>
            <Link href="/projects" className="hover:text-primary-600 transition-colors">
              Discover Projects
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden md:block"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="grow">
        {/* ── Hero Section ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary-400 opacity-20 blur-[100px]"></div>

          <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Solving the "Cold Start" Developer Problem</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              Stop dreaming about <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-indigo-600">
                your next big project.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              CodeMaarg gives you AI-generated step-by-step milestones to
              build any project, helps you validate ideas, and semantically
              matches you with the exact right developers to scale it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/roadmap-generator"
                className="flex items-center gap-2 h-14 px-8 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
              >
                Generate a Roadmap <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 h-14 px-8 rounded-full bg-white text-slate-700 font-semibold border shadow-sm hover:bg-slate-50 transition-all w-full sm:w-auto justify-center"
              >
                Explore Ideas
              </Link>
            </div>
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────────────────────────────── */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Everything you need to ship.
              </h2>
              <p className="text-slate-600 text-lg">
                From a vague concept to a fully-fleshed out open-source community.
                CodeMaarg is custom-built for developer workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  AI Learning Roadmaps
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Tell us what you want to build. Our LLM pipeline generates a
                  personalized roadmap with concrete milestones, tasks, and
                  architecture suggestions tailored to your skill level.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Idea Validation
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  A Product Hunt designed for code. Post your early-stage
                  architecture or MVP repo, gather upvotes, and receive crucial
                  technical feedback via our nested thread system before you
                  scale.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Semantic Matchmaking
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Stop cold messaging. Our MongoDB Atlas Vector Search engine
                  embeds your GitHub history and bio to automatically match you
                  with teammates possessing complementary skills and overlapping
                  timezones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Proof / Stats Section ──────────────────────────────────── */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">
              Built on a high-performance stack
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
              {/* Stack logos simulated with text for now */}
              <div className="flex items-center gap-2 font-bold text-xl"><Code2 /> Next.js</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Code2 /> Prisma</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Code2 /> PostgreSQL</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Code2 /> Tailwind CSS</div>
              <div className="flex items-center gap-2 font-bold text-xl"><Code2 /> Vector Search</div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-600"></div>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to write your first commit?
            </h2>
            <p className="text-primary-100 mb-10 text-xl max-w-2xl mx-auto">
              Join thousands of developers turning ideas into shipped products.
              Whether you are riding solo or building a squad, CodeMaarg has
              you covered.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-primary-600 font-bold text-lg hover:bg-slate-50 shadow-xl transition-transform hover:scale-105"
            >
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary-600" />
            <span className="text-lg font-bold text-slate-900">CodeMaarg</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CodeMaarg Inc. Empowering developers to build together.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
