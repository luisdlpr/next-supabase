import { login, signup } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Sign in to your account or create a new one
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground/80 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              formAction={login}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
