"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ArrowLeft, Mail, Github } from "lucide-react";

type SignInFormProps = {
  callbackUrl: string;
  error?: string;
};

const errorTextMap: Record<string, string> = {
  AccessDenied: "Access denied. Please try a different sign-in method.",
  Verification: "That sign-in link is invalid or expired. Request a new one.",
  OAuthSignin: "OAuth sign in could not be started.",
  OAuthCallback: "OAuth callback failed. Please try again.",
  OAuthAccountNotLinked:
    "This email is already linked with another sign-in method.",
  Callback: "The sign-in callback failed. Please try again.",
  EmailCreateAccount: "Could not create your account from email sign in.",
  EmailSignin: "Could not send the email sign-in link.",
};

export default function SignInForm({ callbackUrl, error }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [isEmailPending, setIsEmailPending] = useState(false);
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const errorMessage = useMemo(
    () => (error ? errorTextMap[error] ?? "Sign in failed. Please try again." : null),
    [error],
  );

  const onEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsEmailPending(true);
    await signIn("email", {
      email,
      callbackUrl,
    });
    setIsEmailPending(false);
  };

  const onGitHubSignIn = async () => {
    setIsOAuthPending(true);
    await signIn("github", { callbackUrl });
    setIsOAuthPending(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#eef2f7] px-4 py-8 text-[#0f172a]">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#bbf7d0]/65 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-[#dbeafe]/80 blur-3xl" />

      <section className="relative w-full max-w-2xl rounded-[2rem] border border-[#dbe3ee] bg-white/95 p-8 shadow-[0_22px_48px_rgba(15,23,42,0.14)] backdrop-blur sm:p-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-sm font-semibold text-[#475569] transition hover:text-[#0f172a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <span className="rounded-full border border-[#d9f1e2] bg-[#ecfdf3] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#067647]">
            Secure sign-in
          </span>
        </div>

        <h1 className="font-serif text-4xl font-bold tracking-tight text-[#0f172a] sm:text-5xl">
          Welcome back
        </h1>
        <p className="mt-3 text-base font-medium text-[#475569]">
          Sign in to continue building on CodeMaarg with email magic link or GitHub OAuth.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-xl border border-[#f8d7da] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#b42318]">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-8 space-y-5">
          <form onSubmit={onEmailSignIn} className="space-y-3.5">
            <label htmlFor="email" className="block text-sm font-semibold text-[#334155]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#cfd8e6] bg-[#fbfcfe] px-4 text-sm font-semibold text-[#0f172a] outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
            />
            <button
              type="submit"
              disabled={isEmailPending}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-4 text-sm font-bold text-white transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Mail className="h-4 w-4" />
              {isEmailPending ? "Sending link..." : "Send sign-in link"}
            </button>
            <p className="text-xs font-medium text-[#64748b]">
              Configure SMTP env values to deliver magic links in production.
            </p>
          </form>

          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
            <span className="h-px flex-1 bg-[#dbe3ee]" />
            or
            <span className="h-px flex-1 bg-[#dbe3ee]" />
          </div>

          <button
            type="button"
            onClick={onGitHubSignIn}
            disabled={isOAuthPending}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#cfd8e6] bg-[#f8fafc] px-4 text-sm font-bold text-[#0f172a] transition hover:bg-[#eef2f7] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Github className="h-4 w-4" />
            {isOAuthPending ? "Connecting..." : "Continue with GitHub"}
          </button>
          <p className="text-xs font-medium text-[#64748b]">
            Add GITHUB_ID and GITHUB_SECRET env vars to enable GitHub OAuth.
          </p>
        </div>
      </section>
    </main>
  );
}
