export default async function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Verify Your Email
          </h1>
          <p className="mt-4 text-foreground/60">
            We&apos;ve sent a verification email to you.
          </p>
          <p className="mt-2 text-sm text-foreground/60">
            Please check your inbox and click the verification link to complete
            your registration.
          </p>
        </div>

        <div className="pt-6 space-y-3">
          <p className="text-sm text-foreground/50">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
          <div className="flex gap-3 justify-center">
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
              >
                Go to Home
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
