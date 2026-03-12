import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeMaarg | Turn Ideas into Shipped Projects",
  description:
    "Developer Project Ideation and Collaboration Platform. Generate AI roadmaps for your project ideas, validate them, and find the perfect team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 selection:bg-primary-200 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}
