# StaySuite — Visitor & Green Lunar

Production deploy bundle containing only the **Visitor registration** and **Green Lunar financial** flows.

## Render settings

| Setting | Value |
|---------|-------|
| Root directory | `visitor-greenlunar` |
| Build command | `npm install && npm run build` |
| Start command | `npm run start` |
| Node version | 18+ |

## Routes

| Flow | Route | Next step |
|------|-------|-----------|
| Home | `/` | Entry point |
| Visitor register | `/register/visitor` | → `/register/visitor/verify` → `/register/visitor/success` |
| Green Lunar login | `/greenlunar/login` | → `/greenlunar/financials` |
| Green Lunar forgot password | `/greenlunar/forgot-password` | → `/greenlunar/login` |
| Green Lunar financials | `/greenlunar/financials` | Withdraw + transaction modals |
| Email template preview | `/greenlunar/email-template` | Static preview |

## Local development

```bash
cd visitor-greenlunar
npm install
npm run dev
```

## Notes

- Frontend-only demo (no backend API).
- Auth is UI-only; routes are open for stakeholder review.
