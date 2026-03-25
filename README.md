# Dine Colorado Springs

Restaurant and dining directory for Colorado Springs, CO. Connecting locals and visitors to the best food experiences in the city.

**Production URL:** [dinecoloradosprings.com](https://dinecoloradosprings.com)
**Vercel Slug:** `dinecoloradosprings`
**GitHub:** [Trace9095/dinecoloradosprings](https://github.com/Trace9095/dinecoloradosprings)
**GA4:** G-1KCQYM3MCQ

## Tech Stack

- **Web:** Next.js 16 (App Router) | Tailwind CSS v4 | TypeScript
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Analytics:** Vercel Analytics + GA4
- **Monorepo:** Turborepo

## Structure

```
apps/
  web/        — Next.js 16 web app (Vercel root dir)
  mobile/     — Expo mobile app
packages/
  shared/     — Shared types and utilities
```

## Local Development

```bash
npm install
cd apps/web && npx next dev
```

## Deployment

Auto-deploys to Vercel on push to `main`. Vercel root dir: `apps/web`.

## Business Rules

- Business listings: $99/mo minimum — NO free tier
- All businesses verified as real and OPEN before listing
- Real photos only — no stock photos
- Sister businesses appear as actual directory entries
