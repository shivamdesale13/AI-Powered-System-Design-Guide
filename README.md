# AI-Powered System Design Simulator

A production-style SaaS MVP for system design interview practice.

Users choose a classic architecture challenge such as `Design Twitter`, write a structured solution, submit it for evaluation, and receive interviewer-style AI feedback with a score, strengths, weaknesses, trade-off analysis, and an ideal answer outline.

## Live App

- Frontend: https://ai-powered-system-design-guide-clie.vercel.app/
- Backend GraphQL API: https://ai-powered-system-design-guide.onrender.com/graphql

## Why This Project Stands Out

Most interview-prep tools either give you static prompts or generic model answers. This project is built around deliberate practice:

- structured answer writing instead of freeform notes
- AI-generated interviewer feedback across multiple design dimensions
- persistent history and progress tracking
- a full-stack architecture that feels like a real SaaS product, not a toy demo

## Core Features

- Email/password authentication with JWT
- Google auth-ready architecture
- GraphQL-first backend with Apollo Server
- PostgreSQL + Prisma persistence
- AI evaluation pipeline with OpenAI support and fallback mode
- Dashboard with score trends and recent submissions
- Submission history and detailed evaluation review
- Seeded challenge library for common system design interview prompts

## Product Flow

1. User signs up or logs in
2. User selects a system design challenge
3. User writes a structured architecture response
4. User submits the answer
5. The AI evaluator scores the answer and generates feedback
6. The user reviews strengths, weaknesses, missing components, and an ideal outline
7. The dashboard and history views track improvement over time

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Apollo Client
- React Router

### Backend

- Node.js
- Express 5
- Apollo Server
- GraphQL
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation
- OpenAI API

## Architecture

```text
.
├── client/    # React frontend
├── server/    # Express + Apollo + Prisma API
└── .env.example
```

### Frontend structure

- `client/src/pages` holds the landing, auth, dashboard, challenge, history, and results pages
- `client/src/components` contains the reusable UI system: layout, cards, stats, feedback, and editor components
- `client/src/app/AuthProvider.tsx` manages authenticated app state
- `client/src/lib/apollo.ts` configures GraphQL requests and auth headers

### Backend structure

- `server/src/graphql` defines the schema and resolvers
- `server/src/services` contains auth, AI evaluation, dashboard, and submission logic
- `server/src/middleware/context.ts` resolves the authenticated GraphQL user from JWT
- `server/prisma/schema.prisma` defines the main data model
- `server/src/seed/seed.ts` loads starter problems into the database

## Database Models

- `User`: account details, auth provider, optional Google profile data
- `Problem`: challenge metadata and interview prompt
- `Submission`: structured architecture answer sections
- `Evaluation`: AI-generated score and detailed review

## AI Evaluation Output

Each submission can return:

- score
- strengths
- weaknesses
- missing components
- scalability review
- trade-offs review
- database review
- API review
- reliability review
- final recommendation
- sample ideal answer outline

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create the env file

```bash
cp .env.example .env
```

Use values like:

```env
CLIENT_URL=http://localhost:5173
VITE_GRAPHQL_URL=http://localhost:4000/graphql
VITE_GOOGLE_CLIENT_ID=

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/system_design_simulator?schema=public"
JWT_SECRET=replace_with_a_long_random_secret
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
GOOGLE_CLIENT_ID=
PORT=4000
```

Notes:

- If `OPENAI_API_KEY` is blank, the app still works using a deterministic fallback evaluator
- Google sign-in requires both `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID`

### 3. Generate Prisma client

```bash
npm run prisma:generate
```

### 4. Apply migrations

For local development:

```bash
npx dotenv -e .env -- prisma migrate deploy --schema server/prisma/schema.prisma
```

### 5. Seed starter problems

```bash
npm run seed
```

### 6. Start the app

```bash
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/graphql`

## Production Notes

Current deployment setup:

- Frontend hosted on Vercel
- Backend hosted on Render
- Database hosted on Neon

Required production environment variables:

### Frontend

```env
VITE_GRAPHQL_URL=https://ai-powered-system-design-guide.onrender.com/graphql
VITE_GOOGLE_CLIENT_ID=
```

### Backend

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret
CLIENT_URL=https://ai-powered-system-design-guide-clie.vercel.app
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
GOOGLE_CLIENT_ID=
PORT=4000
```

## GraphQL Operations

Main operations currently implemented:

- `signup`
- `login`
- `googleAuth`
- `problems`
- `problem(slug)`
- `dashboard`
- `submissionHistory`
- `submission(id)`
- `createSubmission`

## Future Improvements

- Complete Google auth configuration and production OAuth setup
- Background job queue for AI evaluation
- Rich-text editor and diagram support
- Score trend charts over time
- Team review mode and shared feedback
- Submission diffing between attempts
- Rate limiting and deeper production hardening

## Portfolio Value

This project is intentionally designed to show strong full-stack engineering fundamentals:

- modular backend service layer
- GraphQL-first API design
- relational data modeling with Prisma
- reusable component architecture
- polished frontend UX
- realistic deployment path using Vercel, Render, and Neon
