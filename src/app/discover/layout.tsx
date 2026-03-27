import Link from "next/link";

const discoverLinks = [
  { href: "/discover/projects", label: "Projects" },
  { href: "/discover/trending", label: "Trending" },
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
];

export default function DiscoverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0f172a]">
      <header className="border-b border-[#dbe3ee] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="font-serif text-3xl font-bold">Discover</p>
            <p className="text-sm font-medium text-[#64748b]">
              Explore ideas and community momentum
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {discoverLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-sm font-semibold text-[#334155]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
