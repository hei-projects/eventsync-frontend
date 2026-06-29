# EventSync Frontend

Cyberpunk-themed event discovery platform built with Next.js 14. Browse tech conferences, view session schedules with live status, interact with Q&A, and build your personal schedule.

## Stack

- **Next.js** 14.2.5 (App Router with SSR + Client components)
- **React** 18
- **TypeScript** 5
- **Tailwind CSS** 3.4 (custom cyberpunk design system)
- **Framer Motion** 11.3 (page/component animations)
- **Lucide React** (icons)
- **date-fns** 3.3 (date formatting)
- **Sonner** (toast notifications)

## Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Backend API running on `http://localhost:8080`

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment

Create `.env.local` at the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home (SSR)
│   ├── layout.tsx          # Root layout (Navbar, Footer, Particles)
│   ├── events/             # /events, /events/[id]
│   ├── sessions/           # /sessions/[id]
│   ├── speakers/           # /speakers, /speakers/[id]
│   ├── favorites/          # /favorites
│   └── admin/              # /admin (redirect to React Admin)
├── components/
│   ├── events/             # EventCard
│   ├── sessions/           # SessionCard, PlanningGrid, CapacityBar, FavoriteButton
│   ├── speakers/           # SpeakerCard
│   ├── qa/                 # QASystem (live Q&A)
│   ├── sections/           # Homepage sections (Hero, Features, Events, Speakers, CTA)
│   ├── layout/             # Navbar, Footer
│   └── ui/                 # GlassCard, LiveBadge, Tag, StatCard, ParticleBackground
├── hooks/
│   ├── useFavorites.ts     # localStorage favorites management
│   └── useQA.ts            # Q&A state + optimistic updates + cooldowns
├── lib/
│   ├── api.ts              # Typed fetch functions for all backend endpoints
│   ├── adapters.ts         # Backend DTO → frontend type converters
│   └── utils.ts            # cn(), formatDate(), getTrackColor(), etc.
└── types/
    └── index.ts            # Frontend TypeScript types
```

## Pages & Routes

| Route | Type | Description |
|---|---|---|
| `/` | SSR | Hero, live sessions, features, events grid, speakers, CTA |
| `/events` | Client | All events with search + status filter |
| `/events/[id]` | SSR | Event detail with cover, stats, schedule grid, speakers |
| `/sessions/[id]` | SSR | Session detail with Q&A, speakers, capacity bar |
| `/speakers` | Client | All speakers with search |
| `/speakers/[id]` | SSR | Speaker profile, bio, social links, sessions |
| `/favorites` | Client | Saved sessions (localStorage) |
| `/admin` | SSR | Redirect to React Admin (`localhost:5173`) |

## Backend Connection

All API calls go through `src/lib/api.ts`, which fetches from `NEXT_PUBLIC_API_URL` (default `http://localhost:8080`).

15+ typed functions cover every backend endpoint. Response data flows through `adapters.ts` which converts backend DTOs (snake_case) to frontend types (camelCase).

Server-side pages (`page.tsx`) fetch data directly at request time. Client-side pages use `useEffect` with loading skeletons.

## Design System

Cyberpunk/neon theme with custom CSS in `globals.css`:

- **Fonts:** Orbitron (headings/monospace), Rajdhani (body)
- **Glassmorphism:** `.glass`, `.glass-card`, `.glass-strong` utility classes
- **Gradients:** `.gradient-text`, neon-purple/cyan accents
- **Glows:** Red pulse for live indicators, neon borders on hover
- **Background:** Animated particle canvas + subtle grid overlay
- **Components:** `LiveBadge`, `LiveDot`, `LiveGlow`, `GlassCard`, `StatCard`

## Features

- **Live Status** — Real-time `live` indicator on sessions and events
- **Q&A System** — Post questions, upvote (5s frontend + 30s backend cooldown), sorted by votes
- **Personal Schedule** — Save/bookmark sessions to `localStorage`
- **Planning Grid** — Multi-track visual schedule with room columns and time rows
- **Responsive** — Mobile hamburger menu, adaptive grids
