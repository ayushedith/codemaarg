import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const appLinks = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/roadmaps", label: "Roadmaps" },
  { href: "/app/projects", label: "Projects" },
  { href: "/discover/projects", label: "Discover" },
  { href: "/profile", label: "Profile" },
];

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/app");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, onboardingCompleted: true },
  });

  if (!user?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0f172a]">
      <header className="border-b border-[#dbe3ee] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-serif text-3xl font-bold">CodeMaarg</p>
            <p className="text-sm font-medium text-[#64748b]">
              Build with clarity and momentum
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {appLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#334155]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className="rounded-xl bg-[#0f172a] px-3 py-2 text-sm font-semibold text-white"
            >
              Sign out
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
