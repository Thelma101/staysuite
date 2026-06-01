# API Specification — NTDA & Green Lunar Dashboards

Base URL: `{NEXT_PUBLIC_API_BASE_URL}` (e.g. `https://api.greenlunar.ng/v1`)

## Authentication

| Method | Header | Description |
|--------|--------|-------------|
| Bearer JWT | `Authorization: Bearer <token>` | Required on all protected routes |
| Session cookie | `credentials: include` | Optional HttpOnly session (supported by client) |

### Auth endpoints (shared pattern)

| Endpoint | Method | Request | Response |
|----------|--------|---------|----------|
| `/auth/login` | POST | `{ email, password }` | `{ token, user: { id, name, role } }` |
| `/auth/forgot-password` | POST | `{ email }` | `{ message }` |
| `/auth/verify-otp` | POST | `{ email, otp }` | `{ resetToken }` |
| `/auth/reset-password` | POST | `{ resetToken, password }` | `{ message }` |

**Rate limits (recommended):** Login 10/min/IP; OTP 5/hour/email; API 1000/hour/token.

**Error envelope:**

```json
{
  "message": "Human-readable error",
  "code": "VALIDATION_ERROR",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

| HTTP | Meaning |
|------|---------|
| 400 | Validation failed |
| 401 | Unauthorized |
| 403 | Forbidden (role) |
| 404 | Not found |
| 429 | Rate limited |
| 500 | Server error |

---

## NTDA Admin API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ntda/dashboard/stats` | GET | Dashboard KPIs |
| `/ntda/dashboard/activity` | GET | Recent activity feed |
| `/ntda/hotels` | GET | Hotel registry list |
| `/ntda/hotels/:id` | GET | Hotel detail |
| `/ntda/visitors` | GET | Visitor list |
| `/ntda/visitors/:id` | GET, PATCH | Visitor profile / update |
| `/ntda/approvals` | GET | Pending hotel applications |
| `/ntda/approvals/:id/approve` | POST | Approve application |
| `/ntda/approvals/:id/reject` | POST | Reject application |
| `/ntda/broadcasts` | GET, POST | List / send broadcast |
| `/ntda/transactions/stats` | GET | Revenue summary |
| `/ntda/transactions` | GET | Transaction ledger |
| `/ntda/admins` | GET, POST | Admin users |
| `/ntda/admins/:id/permissions` | PUT | `{ permissions: string[] }` |

### Example: Dashboard stats

**GET** `/ntda/dashboard/stats`

```json
{
  "totalHotels": 1248,
  "totalVisitors": 34891,
  "pendingApprovals": 45,
  "totalTransactions": "₦2.4B"
}
```

### Example: Visitor

**PATCH** `/ntda/visitors/:id`

```json
{
  "name": "James Williams",
  "country": "United Kingdom",
  "status": "Active"
}
```

---

## Green Lunar API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/greenlunar/wallet` | GET | Balance and summary stats |
| `/greenlunar/transactions` | GET | Transaction history |
| `/greenlunar/withdrawals` | POST | Initiate withdrawal |

### Example: Wallet

**GET** `/greenlunar/wallet`

```json
{
  "balance": "₦38,000,000",
  "pendingSettlement": "₦5,800,000",
  "totalCharges": "₦43,850,200",
  "transactionVolume": "8678",
  "totalWithdrawal": "₦6,000,000"
}
```

### Example: Transaction row

```json
{
  "id": "tx_001",
  "name": "Oluwaseun Adeyemi",
  "bank": "GTBank",
  "date": "Apr 12, 2025",
  "amount": "230,000",
  "reference": "GL-20250412-001"
}
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | No (dev UI) | Backend API root |
| `NODE_ENV` | Auto | `development` / `production` |

## Deployment notes

- Build each app independently: `cd NTDA && npm run build`
- Serve on separate ports or subdomains (`ntda.*`, `finance.greenlunar.*`)
- Do not share `node_modules` between apps; install per folder
- Configure CORS on API to allow each dashboard origin
