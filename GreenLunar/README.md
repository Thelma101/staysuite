# Green Lunar Financial Dashboard

Standalone Next.js application for Green Lunar Nigeria Limited financial operations.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3232/greenlunar/login

## Routes

| Screen | Path |
|--------|------|
| Login | `/greenlunar/login` |
| Forgot password | `/greenlunar/forgot-password` |
| Financials | `/greenlunar/financials` |
| Email template preview | `/greenlunar/email-template` |

## Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` when the backend is available.
