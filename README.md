# LionEats

Group restaurant ordering platform for university students. Create groups, pick a restaurant, set dietary restrictions, invite others to join, chat in real-time to decide what to order, and the group leader dissolves the group when the order is placed.

## Demo
https://drive.google.com/file/d/12NlXWlRDfciQefNBKUtVUqD65-qxw0tB/view?usp=sharing

## Features

- **Sign up with .edu email** — only university students can access the platform
- **Create groups** — pick a restaurant (dropdown), set dietary restrictions, max members (2-18), and an order deadline
- **Browse & filter groups** — filter by restaurant, dietary restrictions, flex dollar acceptance, and timeframe
- **Join groups** — join any open group that isn't full
- **Real-time chat** — discuss what to order with your group in real-time
- **Group lifecycle** — leader can dissolve the group after ordering; groups auto-expire when the deadline passes
- **Profile management** — set your dietary preferences and flex dollar status

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Real-time | Supabase Realtime |
| Auth | Supabase Auth |
| Monitoring | Vercel Analytics + Speed Insights |
| Testing | Playwright (E2E) |
| Deploy | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account ([supabase.com](https://supabase.com))

### 1. Clone the repo

```bash
git clone https://github.com/rmn2151-blip/codecollab.git
cd codecollab
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **Settings > API** and copy your **Project URL** and **anon key**
3. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the database migrations

1. Go to your Supabase dashboard > **SQL Editor**
2. Run each migration file **in order**:

| File | What it does |
|------|-------------|
| `supabase/migrations/001_initial_schema.sql` | Creates all core tables, RLS policies, RPC functions, seeds 20 restaurants |
| `supabase/migrations/002_order_items.sql` | Adds order tracking table |
| `supabase/migrations/003_payment_handles.sql` | Adds Venmo/Zelle fields to profiles |
| `supabase/migrations/004_delivery_urls.sql` | Adds Uber Eats, DoorDash, Grubhub URL fields to restaurants |

### 5. Enable Realtime

In your Supabase dashboard > **Database > Tables**, enable Realtime for:
- `messages`
- `groups`
- `group_members`
- `order_items`

### 6. (Optional) Enable auto-expiration

1. Go to **Database > Extensions** and enable `pg_cron`
2. Run this in the SQL Editor:

```sql
SELECT cron.schedule('expire-groups', '* * * * *',
  $$UPDATE groups SET status = 'closed', closed_at = now()
    WHERE status = 'open' AND order_deadline <= now()$$
);
```

### 7. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx                          # Landing page
    login/page.tsx                    # Login
    signup/page.tsx                   # Signup (.edu validation)
    profile/page.tsx                  # Profile management
    groups/
      page.tsx                        # Browse & filter groups
      new/page.tsx                    # Create a group
      [groupId]/page.tsx              # Group chat page
    api/groups/                       # API routes (CRUD, join, close, leave)
  components/
    ui/                               # shadcn/ui components
    groups/                           # GroupCard, GroupFilters, CreateGroupForm
    chat/                             # ChatWindow, MessageBubble, MessageInput
    layout/                           # Navbar
  lib/
    supabase/                         # Supabase client helpers
    validators/                       # Zod validation schemas
    constants.ts                      # App constants
  middleware.ts                       # Auth route protection
supabase/
  migrations/                         # SQL schema + seed data
e2e/                                  # Playwright E2E tests
```

## Testing

Run E2E tests (requires the dev server to be running):

```bash
npm run test:e2e
```

Run tests with UI:

```bash
npm run test:e2e:ui
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Database Schema

- **profiles** — user accounts (name, email, dietary preferences, flex dollars)
- **restaurants** — seeded list of 20 restaurants
- **groups** — ordering groups (restaurant, max members, deadline, status)
- **group_members** — which users belong to which groups
- **messages** — chat messages within groups

## Team

- **Builder A** — Frontend & UX
- **Builder B** — Backend, Database & Real-time
- **Builder C** — Integration, Auth & DevOps
  
