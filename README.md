# NexterView 🎙️

> AI-powered mock interview platform. Practice interviews, get real feedback, and track your improvement — all in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)
![License](https://img.shields.io/badge/license-Private-red)

NexterView generates tailored interview questions using Google Gemini AI, records your spoken answers via the Web Speech API, transcribes them in real time, and then grades your performance with a detailed, actionable feedback report.

---

## ✨ Features

- **AI Question Generation** — Role-specific questions via Google Gemini 2.5 Flash, customized by job role, topics, difficulty, type, and experience level.
- **Voice-Based Answering** — Answer by speaking; live transcription powered by the browser's Web Speech API. Falls back to keyboard input if mic is unavailable.
- **Intelligent Feedback** — Gemini evaluates every answer and returns a structured report: overall score, skill breakdown, strengths, actionable improvements, and per-question analysis.
- **Multiple Attempts & Progress Tracking** — Retake any interview and track score trends across attempts with charts.
- **Performance Dashboard** — Your readiness score, average trend chart, focus areas, and recent activity at a glance.
- **Rate Limiting** — Per-user daily limits on interview creation and retakes via Arcjet.
- **Authentication** — Full sign-in/sign-up via Clerk, with automatic DB user sync on first visit.
- **Responsive Dark UI** — Built with Tailwind CSS v4, Radix UI, shadcn/ui, and Framer Motion animations.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── dashboard/
│   │   ├── page.tsx                    # Overview / performance dashboard
│   │   └── (interview)/
│   │       ├── interviews/page.tsx     # All interviews list
│   │       └── interview/[id]/         # Session, attempts, feedback
│   ├── sign-in/ & sign-up/             # Clerk auth pages
│   ├── contact/ & privacy/ & terms/    # Static pages
├── actions/
│   └── Interview.ts                    # Server Actions: create, fetch, feedback, attempts
├── services/
│   └── generateQuestions.ts            # Gemini AI: question generation & feedback
├── components/
│   ├── landing/                        # Landing page sections
│   ├── dashboard/                      # Dashboard widgets & charts
│   ├── interviewDash/                  # Interview list, voice interview, form
│   ├── interview-feedback/             # Feedback report components
│   ├── interview-analytics/            # Score charts and skill analytics
│   └── ui/                             # shadcn/ui base components
└── lib/
    ├── prisma.ts                        # Prisma client singleton
    ├── schema.ts                        # Zod validation schemas
    ├── arcjet.ts                        # Arcjet rate limiter config
    ├── useIsClient.ts                   # SSR-safe client detection hook
    └── CheckUser.ts                     # Clerk → DB user sync
prisma/
├── schema.prisma                        # Database schema
└── migrations/                          # Migration history
```

---

## 🗃️ Database Schema

| Model | Key Fields | Relations |
|---|---|---|
| `User` | `clerkId`, `email`, `plan` (Free/Pro) | → many `Interview` |
| `Interview` | `jobRole`, `topics[]`, `difficulty`, `interviewType`, `experienceLevel`, `status`, `score` | → many `Question`, `Attempt` |
| `Question` | `question`, `order` | → `Interview` |
| `Attempt` | `attemptNo`, `score`, `feedback` (JSON) | → `Interview`, `User` |

Database: **PostgreSQL** via [Prisma ORM](https://www.prisma.io/).

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# PostgreSQL (e.g. Neon, Supabase, Railway)
DATABASE_URL=
DIRECT_URL=

# Arcjet (rate limiting)
ARCJET_KEY=

# Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=
```

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | [clerk.com](https://clerk.com) → API Keys |
| `DATABASE_URL` / `DIRECT_URL` | [Neon](https://neon.tech) or [Supabase](https://supabase.com) → Connection String |
| `ARCJET_KEY` | [arcjet.com](https://arcjet.com) → Dashboard |
| `GOOGLE_GENERATIVE_AI_API_KEY` | [Google AI Studio](https://aistudio.google.com/apikey) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/bedigambar/NexterView.git
cd nexterview

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in all required values

# 4. Push the database schema
npx prisma migrate dev

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma migrate dev` | Create & apply a migration (dev) |
| `npx prisma migrate deploy` | Apply migrations (production) |

---

## 🧠 How It Works

```
1. User signs in via Clerk → profile synced to PostgreSQL
2. User creates an interview:
   - Picks job role, topics, difficulty, type, experience level, question count
   - Optionally adds a custom first question
   - Gemini AI generates questions via generateInterviewQuestions()
3. User takes the interview:
   - AI interviewer speaks each question via the Web Speech Synthesis API
   - User answers verbally → transcribed live via the Web Speech Recognition API
   - Falls back to keyboard input if mic fails or is unavailable
4. After the last answer → generateFeedback() is called:
   - Gemini evaluates all Q&A pairs
   - Returns structured JSON: overall score, skill scores, strengths, improvements
   - Attempt saved to DB; interview status updated to "completed"
5. User views the feedback report with charts and per-question breakdowns
6. User can retake the interview (rate-limited by Arcjet)
7. Dashboard aggregates all attempts into readiness score, trend charts, and focus areas
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS v4, Radix UI, shadcn/ui, Framer Motion |
| Charts | Recharts |
| Voice | Web Speech API (Recognition + Synthesis) |
| AI | Google Gemini 2.5 Flash via `@ai-sdk/google` |
| Auth | Clerk |
| ORM | Prisma 6 |
| Database | PostgreSQL |
| Rate Limiting | Arcjet |
| Validation | Zod |
| Forms | React Hook Form + `@hookform/resolvers` |
| Notifications | Sonner |

---

## 📄 License

This project is available under the [MIT License](https://github.com/bedigambar/NexterView/blob/main/LICENSE)
