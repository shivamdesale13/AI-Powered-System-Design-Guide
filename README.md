# AI-Powered System Design Simulator

AI-Powered System Design Simulator is a production-style SaaS MVP for practicing system design interviews. Users pick a challenge like `Design Twitter`, submit a structured architecture answer, and receive AI-generated interviewer feedback with a score, strengths, weaknesses, missing components, and an ideal answer outline.

## Features

- JWT-based signup and login
- GraphQL-first backend with Apollo Server
- PostgreSQL + Prisma data layer
- Structured submission workflow for interview answers
- AI evaluation service with OpenAI integration and a deterministic fallback mode
- Dashboard with score tracking, recent submissions, and strongest problem area
- Submission history and detailed feedback review screens
- Seeded challenge library for common system design prompts

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
- JWT auth
- Zod validation
- OpenAI API

## Architecture

The repository uses a small workspace layout:

```text
.
├── client/    # React frontend
├── server/    # Express + Apollo + Prisma API
└── .env.example
```

### Backend design
- `server/src/graphql` contains schema and resolvers
- `server/src/services` holds business logic for auth, submissions, dashboard stats, and AI evaluation
- `server/src/middleware/context.ts` extracts and verifies JWT auth for GraphQL requests
- `server/prisma/schema.prisma` defines `User`, `Problem`, `Submission`, and `Evaluation`
- `server/src/seed/seed.ts` seeds the challenge catalog

### Frontend design
- `client/src/pages` contains the landing, auth, dashboard, problem, history, and results pages
- `client/src/components` provides reusable UI pieces such as cards, layout, score display, and the structured answer editor
- `client/src/lib/apollo.ts` attaches the JWT token to GraphQL requests
- `client/src/lib/storage.ts` manages persisted session state

## Database Models

- `User`: account identity and authentication
- `Problem`: system design challenge metadata and prompts
- `Submission`: the candidate's structured answer sections
- `Evaluation`: AI-generated review and score for each submission

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Set these values in `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/system_design_simulator?schema=public"
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
VITE_GRAPHQL_URL=http://localhost:4000/graphql
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
VITE_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_ID=
PORT=4000
```

If `OPENAI_API_KEY` is omitted, the app still works using a deterministic fallback evaluator so the full workflow remains demoable.
If you want Google sign-in, create a Google OAuth Web Client and set both `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID` to that client ID.

### 3. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Seed problems

```bash
npm run seed
```

### 5. Start the full stack

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
GraphQL API: `http://localhost:4000/graphql`

## GraphQL Flow

Main operations:

- `signup`
- `login`
- `problems`
- `problem(slug)`
- `dashboard`
- `submissionHistory`
- `submission(id)`
- `createSubmission`

## Why This Project Is Valuable For Interview Prep

Most interview prep tools stop at prompt lists or static sample answers. This project is more useful because it forces a structured response, evaluates architecture reasoning across multiple dimensions, and keeps historical feedback visible so candidates can measure whether their answers are actually improving.

## Future Improvements

- Streaming AI feedback for faster perceived response time
- Rich-text or diagram-assisted editor
- Rubric customization by company interview style
- Team coaching mode with reviewer comments
- Submission diffing to compare answer revisions over time
- Background jobs and queue-based evaluation pipeline

## Portfolio Notes

This project is intentionally built to demonstrate full-stack engineering quality:

- modular service-oriented backend
- GraphQL-first API design
- validated inputs and auth boundaries
- reusable React UI architecture
- practical environment-based configuration
- database-backed product flow that feels like a real SaaS MVP
