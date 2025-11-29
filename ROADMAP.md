# Project Roadmap & File Guide

This guide explains how this Next.js project is organized, what each file/folder does, and the basics you need to build your own app using the App Router. It’s written to be practical and easy to scan.

## Quick Start

- Install deps: `npm install`
- Copy envs: `cp .env.local.example .env.local`
- Add Clerk keys in `.env.local`
- Run dev server: `npm run dev`
- Open: `http://localhost:3000`

## App Router Basics

- **Route = Folder**: Every folder under `src/app` is a route segment.
- **`page.tsx`**: The UI for a route (e.g., `app/dashboard/page.tsx` → `/dashboard`).
- **`layout.tsx`**: A wrapper that persists around pages in its folder (navbars, shells).
- **Server by default**: Files are Server Components unless you add `use client` at the top.
- **API routes**: `app/api/**/route.ts` implement server endpoints.
- **Middleware**: `src/middleware.ts` runs before routes to protect or rewrite requests.

## Top-Level Files

- `package.json`: Scripts and dependencies (`next`, `react`, `@clerk/nextjs`, `tailwindcss`).
- `next.config.ts`: Next.js configuration (currently defaults).
- `tsconfig.json`: TypeScript settings and path alias `@/* → src/*`.
- `eslint.config.mjs`: ESLint configuration (Next core web vitals, TypeScript rules).
- `postcss.config.mjs`: Enables Tailwind CSS via PostCSS.
- `.env.local.example`: Example environment variables for Clerk auth.
- `public/`: Static assets (served at `/<file>`).
- `README.md`: Project summary and quick usage.
- `ROADMAP.md`: This detailed guide.

## `src/` Overview

- `src/middleware.ts`:
  - Uses Clerk middleware to protect all routes except `/sign-in` and `/sign-up`.
  - If a user is not signed in and the route isn’t public, it blocks and asks to sign in.
- `src/app/globals.css`:
  - Tailwind v4 layer import and global CSS (light/dark variables, base font).

### Root App Files (`src/app`)

- `src/app/layout.tsx` (Server Component):
  - The root HTML shell for the entire app.
  - Wraps children with `ClerkProvider` (auth context) and renders `<html><body>{children}</body></html>`.
  - If Clerk keys are missing, it shows a “Setup Required” screen so you know to configure `.env.local`.
- `src/app/page.tsx` (Server Component):
  - Landing page (`/`). If user is signed in, redirects to `/dashboard`.
  - Otherwise shows “Sign In / Create Account” CTA buttons.
- `src/app/favicon.ico`: Favicon.

### Auth Routes

- `src/app/sign-in/[[...sign-in]]/page.tsx`:
  - Renders Clerk’s `<SignIn />` with `afterSignInUrl="/dashboard"`.
- `src/app/sign-up/[[...sign-up]]/page.tsx`:
  - Renders Clerk’s `<SignUp />` with `afterSignUpUrl="/dashboard"`.

### Dashboard Segment (`/dashboard`)

- `src/app/dashboard/layout.tsx` (Client Component):
  - Marked with `"use client"` because it uses browser hooks (`usePathname`) and Clerk’s `useUser`.
  - Provides the persistent dashboard shell: header, nav, user email, and `<UserButton />`.
  - Persists while navigating between `/dashboard`, `/dashboard/agencies`, and `/dashboard/contacts`.
- `src/app/dashboard/page.tsx` (Server Component):
  - Dashboard home with links to Agencies and Contacts.
- `src/app/dashboard/agencies/page.tsx` (Server Component):
  - Static table showing sample agencies (server-rendered HTML table).
- `src/app/dashboard/contacts/page.tsx` (Client Component):
  - Fetches contacts from `/api/contacts` on mount.
  - Displays daily usage: view count, remaining views; shows limit-reached UI at 50/day.

### API Route: Contacts

- `src/app/api/contacts/route.ts`:
  - `GET` handler checks the current user via Clerk (`auth()`), applies a per-user, per-day view limit (50).
  - Uses an in-memory `Map` for counts (fine for demo; use Redis/DB in production).
  - Returns contacts plus counters or a 429 with `limitExceeded: true`.

## How Auth Works Here

- **Middleware** protects most routes:
  - Public: `/sign-in`, `/sign-up`.
  - Protected: everything else (including `/dashboard` and `/api/contacts`).
- **Root layout** provides `ClerkProvider` globally.
- **Home page** checks session: if authenticated, `redirect('/dashboard')`.
- **Dashboard layout** shows current user email and a sign-out button.

## Server vs Client Components

- **Server (default)**: Better performance; can fetch data directly. No browser-only hooks.
- **Client**: Add `use client` at top if you need `useState`, `useEffect`, `usePathname`, event handlers, or 3rd-party widgets.
- **Pattern**: Keep layouts/pages server-side when possible; isolate small client wrappers for interactivity/providers.

## Styling

- Tailwind CSS v4 through PostCSS plugin.
- Utility classes on elements (`className="..."`).
- Global variables in `globals.css` handle light/dark backgrounds.

## Add Your Own Pages

- New route page:
  - Create: `src/app/reports/page.tsx`
  - Example:
    ```tsx
    export default function ReportsPage() {
      return <h1 className="text-2xl font-bold">Reports</h1>;
    }
    ```
- Nested under dashboard:
  - Create: `src/app/dashboard/reports/page.tsx` → `/dashboard/reports`.

## Add Your Own API Route

- Create a folder and `route.ts`:
  - Path: `src/app/api/reports/route.ts`
  - Example:
    ```ts
    import { NextResponse } from "next/server";
    export async function GET() {
      return NextResponse.json({ ok: true, ts: Date.now() });
    }
    ```

## Environment Variables (Clerk)

- Copy and edit `.env.local`:
  ```dotenv
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
  CLERK_SECRET_KEY=sk_test_your_secret_key
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
  ```
- Restart dev server after changes.

## Common Tasks

- **Run dev**: `npm run dev`
- **Type-check**: `npm run build` (Next runs TS checks)
- **Lint**: `npm run lint`
- **Build prod**: `npm run build`
- **Start prod**: `npm run start`

## Tips & Gotchas

- If the app only shows “Setup Required”, add your Clerk keys to `.env.local`.
- If you see hydration warnings, keep the root layout server-side and wrap child content in a small client provider if needed.
- In-memory rate limiting resets when the server restarts; use Redis/DB to persist.

## Mental Model Recap

- `layout.tsx` wraps and persists; `page.tsx` renders route content.
- Root layout → nested layouts → page (composition order).
- Client components only when necessary; otherwise prefer server components.
- Middleware protects routes before they render.

You can now read files confidently and extend this app with new pages and APIs.
