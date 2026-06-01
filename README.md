This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

Simple task board built with Next.js and Supabase for authentication and storage. The app is intentionally minimal and focused on clarity and developer ergonomics.

## Live deployments

- Frontend (live): REPLACE_WITH_FRONTEND_URL
- Backend (Supabase, optional public URL / project): REPLACE_WITH_BACKEND_URL

Note: I cannot create external deployments from this environment. The two lines above are placeholders — follow the "Deployment" section below to deploy to free hosting (Vercel for frontend, Supabase for backend) and replace the placeholders with the actual URLs.

## Assumptions

- The Supabase project is used for authentication and as the primary database for a `tasks` table.
- The `tasks` table contains at least: `id`, `user_id`, `title`, `status`, `priority`, `due_date`, `created_at`, `updated_at`.
- No `progress` column is expected (this codebase was updated to remove progress-related UI and types).
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
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key

3. Run the dev server

```bash
pnpm dev
```

Open http://localhost:3000

## Deployment

Frontend (Vercel)

1. Connect the repository to Vercel (https://vercel.com/new)
2. Set the same environment variables in the Vercel project settings
3. Deploy and copy the produced URL into the "Frontend (live)" slot above

Backend (Supabase)

1. Create a free Supabase project (https://app.supabase.com/)
2. Create a `tasks` table with the expected columns (see assumptions)
3. Add the public anon key and URL to your frontend environment

If you want an actual backend URL or a server that hosts API endpoints, you can deploy serverless functions (Vercel/Netlify) that talk to Supabase and expose any additional endpoints.

## Files of interest

- `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` — supabase client helpers
- `src/app/page.tsx` — main task board view
- `src/components/*` — UI components (task-card, modals, sidebar, toasts)

## Notes, assumptions & next steps

- Replace `REPLACE_WITH_FRONTEND_URL` and `REPLACE_WITH_BACKEND_URL` with real deployment URLs.
- If you removed or altered DB columns (e.g., `progress`) ensure `src/lib/types.ts` matches your database schema.
- For production, secure the Supabase service role key and move any privileged operations to server-only code.

## Learn More

See the Next.js and Supabase docs:

- https://nextjs.org/docs
- https://supabase.com/docs

