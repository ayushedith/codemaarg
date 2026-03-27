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
    <main className="relative min-h-screen bg-[#f4f5f6] px-4 py-10 text-[#0f172a]">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-[0_12px_28px_rgba(15,23,42,0.1)]">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#475569] transition hover:text-[#0f172a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="font-serif text-4xl font-bold tracking-tight text-[#0f172a]">
          Sign in to CodeMaarg
        </h1>
        <p className="mt-3 text-base font-medium text-[#475569]">
          Continue with email magic link or GitHub OAuth.
        </p>

        {errorMessage ? (
          <div className="mt-5 rounded-xl border border-[#f8d7da] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#b42318]">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-8 space-y-4">
          <form onSubmit={onEmailSignIn} className="space-y-3">
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
              className="w-full rounded-xl border border-[#d0d7e2] px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none transition focus:border-accent-500"
            />
            <button
              type="submit"
              disabled={isEmailPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Mail className="h-4 w-4" />
              {isEmailPending ? "Sending..." : "Send sign-in link"}
            </button>
            <p className="text-xs font-medium text-[#64748b]">
              Configure SMTP settings in env variables to deliver links in production.
            </p>
          </form>

          <button
            type="button"
            onClick={onGitHubSignIn}
            disabled={isOAuthPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d0d7e2] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#0f172a] transition hover:bg-[#eef2f7] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Github className="h-4 w-4" />
            {isOAuthPending ? "Connecting..." : "Continue with GitHub"}
          </button>
          <p className="text-xs font-medium text-[#64748b]">
            Add GITHUB_ID and GITHUB_SECRET env vars to enable GitHub OAuth.
          </p>
        </div>
      </div>
    </main>
  );
}
