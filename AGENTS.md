<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AI Agents — Next.js App Router + Supabase

## 📋 Commands

- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Type check**: `npx tsc --noEmit`
- **Tests**: Not configured yet (will use Playwright per architecture)

## 📝 Code Style

- **Imports**: Use `@/` alias for absolute paths (e.g., `import { foo } from "@/lib/db"`)
- **Types**: TypeScript strict mode enabled. All functions must have explicit return types for public APIs
- **Naming**: camelCase for functions/vars, PascalCase for components/types, kebab-case for files
- **Formatting**: 2-space indent, double quotes, template literals for multi-line strings
- **Error handling**: Use explicit error types, avoid generic catch-all handlers
- **Components**: Server Components by default (no `"use client"` unless state/effects needed)
- **Exports**: Named exports preferred except for page/layout/route components

This file defines strict behavior for AI agents working in this codebase.

The goal is to ensure all generated code is:

- production-ready
- type-safe
- secure (RLS-aware)
- consistent with App Router patterns

---

# ⚙️ Tech Stack Context

- Next.js (App Router)
- TypeScript (strict mode)
- Supabase (Postgres + Auth + RLS)
- Tailwind CSS
- React Server Components (default)

---

# 🧱 Architecture Rules (NON-NEGOTIABLE)

## 1. App Router-first

- Use Server Components by default
- Only use `"use client"` when required for:
  - state
  - effects
  - browser APIs

---

## 2. Data Access Layer (MANDATORY)

ALL database access must go through `/lib/db`.

### ❌ Never do this:

```ts
supabase.from("posts").select("*");
```

### ✅ Always do this:

```ts
getPosts();
getUserPosts(userId);
createPost(data);
```

## 3. File Structure Rules

Must follow:

```
/app
  /(routes)
/components        → pure UI only
/lib
  /db              → all queries
  /supabase        → client/server setup
  /utils           → helpers
/hooks             → client hooks only
/types             → shared types
/tests             → Playwright tests
```

## 4. Supabase Rules (CRITICAL)

Assume Row Level Security (RLS) is ENABLED
Every table must have explicit policies
Default posture: deny unless explicitly allowed
Required when working with DB:
Define schema
Define RLS policies
Consider multi-user access
Consider malicious access patterns

## 5. Server/Client Separation

Server (default)
DB queries
auth checks
business logic
Client (only when needed)
UI state
event handlers
animations
browser APIs

## 🧩 When responding

Agents MUST:

- Be concise
- Avoid filler text
- Output production-ready code
- Follow project structure exactly
- Prefer existing abstractions over new ones
- 🚫 Anti-Patterns (DO NOT DO)
- Direct Supabase queries in components
- Missing RLS policies
- Mixing UI and business logic
- Using client components unnecessarily
- Returning untyped data
- Overengineering simple features
- 🎯 System Goal

This codebase should remain:

scalable
secure
AI-friendly (structured DB + query layer)
easy to extend with future RAG / AI features
