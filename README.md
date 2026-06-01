## Overview

Simple task board built with Next.js and Supabase for authentication and storage. The app is intentionally minimal and focused on clarity and developer ergonomics.

## Live deployments

- [Frontend (live)](https://indpro-assignment-zeta.vercel.app/)

## Assumptions

- The Supabase project is used for authentication and as the primary database for a `tasks` table.
- The `tasks` table contains at least: `id`, `user_id`, `title`, `status`, `priority`, `due_date`, `created_at`, `updated_at`.
- Environment variables are set in your deployment environment (see `.env` section below).

## Tradeoffs

- Simplicity over completeness: the app keeps authentication and a small CRUD surface rather than full ACLs, webhooks, or background workers.
- Client-driven UI: a small amount of session checks happen in client components using the Supabase client for simplicity. For stricter security you'd move some checks to server components or middleware.
- Minimal styling: Tailwind and a small component set are used to keep the UI readable but not production-polished.

## Technical decisions

- Next.js app router (app/*) for latest patterns and Server / Client component separation.
- Supabase (`@supabase/ssr` and browser client) for auth and persistence because it provides a fast developer DX.
- `sonner` for toast notifications — lightweight and easy to integrate.
- Component naming standardized to kebab-case where practical (e.g., `task-card.tsx`).

## Local development

1. Install dependencies

```bash
pnpm install
```

2. Create environment variables (copy `.env.example` or set values)

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - your Supabase publishable key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` = "http://localhost:3000"

3. Run the dev server

```bash
pnpm dev
```

Open http://localhost:3000

## Files of interest

- `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` — supabase client helpers
- `src/app/page.tsx` — main task board view
- `src/components/*` — UI components (task-card, modals, sidebar, toasts)

## Learn More

See the Next.js and Supabase docs:

- https://nextjs.org/docs
- https://supabase.com/docs

