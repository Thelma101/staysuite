# StaySuite Dashboard URLs

Base URL (local dev): `http://localhost:3230`

Replace with your production domain when deploying.

---

## Public & Authentication

| Screen | Route | Flow |
|--------|-------|------|
| Welcome / Homepage | `/` | Entry point |
| Login | `/login` | → `/login/verify` → `/user/dashboard` |
| Login OTP Verify | `/login/verify` | Back to `/login` |
| Visitor Registration | `/register/visitor` | → `/register/visitor/verify` → `/register/visitor/success` → `/user/dashboard` |
| Nigerian Registration | `/register/nigerian` | → `/register/nigerian/success` → `/user/dashboard` |

---

## User Dashboard

| Screen | Route |
|--------|-------|
| Dashboard | `/user/dashboard` |
| Search Hotels | `/user/search` |
| Nearby Hotels | `/user/nearby` |
| My Bookings | `/user/bookings` |
| Wallet | `/user/wallet` |
| Orders | `/user/orders` |
| Messages | `/user/messages` |
| Profile | `/user/profile` |

**Auth flow:** `/login` → `/login/verify` → `/user/dashboard`

---

## Hotel Staff Dashboard

| Screen | Route |
|--------|-------|
| Dashboard | `/hotel/dashboard` |
| Bookings | `/hotel/bookings` |
| Rooms | `/hotel/rooms` |
| Visitors | `/hotel/visitors` |
| Orders | `/hotel/orders` |
| Staff | `/hotel/staff` |
| Finance | `/hotel/finance` |
| Messages | `/hotel/messages` |
| Settings | `/hotel/settings` |

---

## Platform Admin Dashboard

| Screen | Route |
|--------|-------|
| Dashboard | `/admin/dashboard` |
| Hotels | `/admin/hotels` |
| Users | `/admin/users` |
| Blacklist | `/admin/blacklist` |
| Products | `/admin/products` |
| Messages | `/admin/messages` |
| Analytics | `/admin/analytics` |

---

## Green Lunar Dashboard

| Screen | Route | Flow |
|--------|-------|------|
| Login | `/greenlunar/login` | → `/greenlunar/financials` |
| Forgot Password | `/greenlunar/forgot-password` | Email → OTP → Reset → `/greenlunar/login` |
| Financials (main) | `/greenlunar/financials` | Withdraw modal (account → amount → success), transaction detail modal |
| Email Template Preview | `/greenlunar/email-template` | Password reset email preview |

**Modals on Financials:**
- Withdraw: account number → amount → success
- Transaction row click: transaction details

---

## NTDA Admin Dashboard

| Screen | Route | Flow |
|--------|-------|------|
| Login | `/ntda-auth/login` | → `/ntda/dashboard` |
| Forgot Password | `/ntda-auth/forgot-password` | Email → OTP → Reset → `/ntda-auth/login` |
| Home | `/ntda/dashboard` | Quick links to approvals, broadcast, transactions |
| Hotels | `/ntda/hotels` | View / manage hotels |
| Visitors | `/ntda/visitors` | Visitor registry |
| Pending Approvals | `/ntda/approvals` | Approve / reject modal |
| Broadcast Message | `/ntda/broadcast` | Compose + send confirmation modal |
| Transactions | `/ntda/transactions` | Revenue overview |
| Admins | `/ntda/admins` | Add admin modal |

**Auth flow:** `/ntda-auth/login` → `/ntda/dashboard`  
**Logout:** sidebar → `/ntda-auth/login`

---

## Hotel Owner Dashboard

| Screen | Route | Flow |
|--------|-------|------|
| Welcome / Landing | `/owner` | → `/owner/register` or `/owner/login` |
| Hotel Registration | `/owner/register` | Submit → `/owner/dashboard` |
| Login | `/owner/login` | Hotel Admin / Staff Member tabs → `/owner/dashboard` |
| Registration Status | `/owner/dashboard` | Pending approval view |
| Bookings | `/owner/dashboard/bookings` | Bookings list (max 4 rows) |
| Guests | `/owner/dashboard/guests` | Guests list (max 4 rows) |
| Rooms | `/owner/dashboard/rooms` | Rooms list (max 4 rows) |
| Payments | `/owner/dashboard/payments` | Payments list (max 4 rows) |
| Store | `/owner/dashboard/store` | Store orders (max 4 rows) |
| Staff Management | `/owner/dashboard/staff` | Staff list (max 4 rows) |
| Hotel Information | `/owner/dashboard/hotel-info` | Hotel profile form |
| Wallet | `/owner/dashboard/wallet` | Wallet overview |

**Auth flow:** `/owner/login` → `/owner/dashboard`  
**Registration flow:** `/owner/register` → `/owner/dashboard` (pending approval)  
**Logout:** sidebar → `/owner/login`

---

## Quick Reference — All Dashboard Entry Points

```
/                          Public homepage
/login                     User login
/user/dashboard            User dashboard
/hotel/dashboard           Hotel staff dashboard
/admin/dashboard           Platform admin dashboard
/greenlunar/login          Green Lunar login
/greenlunar/financials     Green Lunar financials
/ntda-auth/login           NTDA admin login
/owner                     Hotel owner welcome
/owner/login               Hotel owner login
/owner/dashboard           Hotel owner dashboard
```
