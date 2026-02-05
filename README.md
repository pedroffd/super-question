# Super Question

Fullstack quiz app to prep for a Fullstack Engineer interview. The app shows job cards, explains the quiz flow, runs timed questions, and returns a final score. All questions are based on the provided PDF.

## Features
- Job card selection flow
- Quiz intro and rules
- One question at a time with 5 options
- Global timer and per-question timer
- Final score and percentage
- Questions and options randomized on each start

## Tech Stack
**Backend**
- NestJS
- Supabase (Postgres + API)

**Frontend**
- React + Vite
- Tailwind CSS
- shadcn/ui
- lucide-react

**Tooling**
- Biome (lint/format)
- Husky (pre-commit lint)

## Project Structure
```
backend/    NestJS API
frontend/   Vite React app
```

## Environment Variables
**Backend**
```
SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
# optional fallback:
SUPABASE_SERVICE_ROLE_KEY=...
```

**Frontend**
```
VITE_API_URL=http://localhost:3000/api
```

## Setup
```
npm install
npm --prefix backend install
npm --prefix frontend install
```

## Run
```
npm --prefix backend run start:dev
npm --prefix frontend run dev
```

## Seed Supabase
Run the SQL file in the Supabase SQL Editor:
```
backend/sql/supabase_seed.sql
```

## Scripts
```
npm run lint
npm run format
```

## Deployment
- Backend: Railway
- Frontend: Vercel

Set `VITE_API_URL` in Vercel to your Railway URL:
```
VITE_API_URL=https://<railway-app>/api
```
