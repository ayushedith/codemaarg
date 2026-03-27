import SignInForm from "./SignInForm";

type SearchParams = {
  callbackUrl?: string;
  error?: string;
};

type SignInPageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const callbackUrl = resolvedSearchParams.callbackUrl ?? "/";
  const error = resolvedSearchParams.error;

  return <SignInForm callbackUrl={callbackUrl} error={error} />;
}
