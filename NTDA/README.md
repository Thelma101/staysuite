# NTDA Admin Dashboard

Standalone Next.js application for the Nigerian Tourism Development Authority admin portal.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3231/ntda-auth/login

## Routes

| Screen | Path |
|--------|------|
| Login | `/ntda-auth/login` |
| Forgot password | `/ntda-auth/forgot-password` |
| Reset email preview | `/ntda-auth/email-template` |
| Dashboard | `/ntda/dashboard` |
| Hotels | `/ntda/hotels` |
| Visitors | `/ntda/visitors` |
| Approvals | `/ntda/approvals` |
| Broadcast | `/ntda/broadcast` |
| Transactions | `/ntda/transactions` |
| Admins | `/ntda/admins` |

## Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` when the backend is available. Without it, lists render empty states ready for API integration.
