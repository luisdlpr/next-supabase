import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Supabase Auth + Storage
          </h1>
          <p className="text-lg text-foreground/60 max-w-lg mx-auto leading-relaxed">
            Experience our Auth and Storage through a simple profile management
            example. Create a user profile and upload an avatar image. Fast,
            simple, secure.
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
