# StaySuite — National Hotel Booking Platform

StaySuite is Nigeria's National Hotel Management Platform. It lets
Nigerians register with their NIN, allows foreign visitors to obtain a
Tourism ID, and gives hotel owners and NTDA administrators a unified
portal to manage stays, bookings, and analytics.

The UI is implemented 1:1 against the Figma source of truth at
[`VkQJ8AttnbaGEMwSncqnYF`](https://www.figma.com/design/VkQJ8AttnbaGEMwSncqnYF/National-Hotel-Booking-platform--Copy-?node-id=25-7&m=dev).

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) | Built-in routing, optimized images, RSC by default |
| Language | TypeScript (strict) | Type-safe components, future-proof refactors |
| Styling | Tailwind CSS 3 | Co-located, fast, design-token friendly |
| Fonts | Inter + Montserrat via `next/font` | Self-hosted, layout-shift free |
| Class utility | [`clsx`](https://github.com/lukeed/clsx) | Tiny (<1kB), great DX for conditional classes |
| Icons / images | Sourced from Figma, served from `public/figma/` | Single source of truth, no SVG re-drawing |

## Architecture — 3 Dashboards

The project is structured around **three major dashboards** as defined in the BRD:

| Dashboard | URL prefix | Layout shell | Sidebar accent | Who uses it |
| --- | --- | --- | --- | --- |
| **User** | `/user/*` | `UserDashboardShell` | Green | Registered Nigerian citizens and foreign visitors |
| **Hotel** | `/hotel/*` | `HotelDashboardShell` | Blue | Hotel staff (management, receptionist, accountant, bar/kitchen, security) |
| **Admin** | `/admin/*` | `AdminDashboardShell` | Navy | NTDA administrators and moderators |

Public pages (landing, login, registration) live outside the dashboards.

## Routes

### Public & Auth

| Route | Figma node(s) | Description |
| --- | --- | --- |
| `/` | `25:7` | Landing page with three CTAs |
| `/login` | `84:371` | Email / Phone tab + identifier capture |
| `/login/verify` | `84:518` | 4-digit OTP with countdown resend |
| `/register/visitor` | `20:22725` | Foreigner registration form |
| `/register/visitor/verify` | `40:104` | Identity verification OTP |
| `/register/visitor/success` | `40:179`, `31:245` | Success + QR Tourism ID + wallet/ID card actions |
| `/register/nigerian` | `49:477`, `49:672` | NIN-based registration with inline OTP |
| `/register/nigerian/success` | `49:1024` | Success with Tourism ID card (`71:1360`) and confetti |

### User Dashboard (`/user/*`)

| Route | Description |
| --- | --- |
| `/user/dashboard` | Welcome, Tourism ID, wallet balance, action cards |
| `/user/search` | Search and book hotels (filter by location, category, amenities) |
| `/user/nearby` | GPS-based nearby hotel discovery |
| `/user/bookings` | Booking history and check-in details |
| `/user/wallet` | Fund wallet, view transactions, manage balance |
| `/user/orders` | Order goods and services from hotels |
| `/user/messages` | Messaging with hotels and users |
| `/user/profile` | Tourism ID card, profile management |

### Hotel Dashboard (`/hotel/*`)

| Route | Description |
| --- | --- |
| `/hotel/dashboard` | Operations overview, bookings, revenue |
| `/hotel/bookings` | Approve/decline bookings, manage check-ins |
| `/hotel/rooms` | Room management, pricing, availability |
| `/hotel/visitors` | Sign visitors in/out, visitor history |
| `/hotel/orders` | Bar, kitchen, laundry order management |
| `/hotel/staff` | Staff roles and permissions (RBAC) |
| `/hotel/finance` | Financial transactions and settlements |
| `/hotel/messages` | Guest and admin communication |
| `/hotel/settings` | Hotel profile, images, facilities, regulatory docs |

### Admin Dashboard (`/admin/*`)

| Route | Description |
| --- | --- |
| `/admin/dashboard` | Platform metrics and NTDA analytics |
| `/admin/hotels` | Approve, block, or manage registered hotels |
| `/admin/users` | Search users by date, gender, country |
| `/admin/blacklist` | Manage blacklisted individuals |
| `/admin/products` | Create products for in-app purchase |
| `/admin/messages` | Send messages to hotels and users |
| `/admin/analytics` | Detailed NTDA reports |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (run before every push)
npm run start      # serve the production build
npm run lint       # ESLint via next/lint
```

## Project structure

```
src/
  app/
    layout.tsx                             # Root layout, fonts, metadata
    globals.css                            # Tailwind base + global resets
    (public)/page.tsx                      # / (landing)
    (auth)/
      login/{page,verify/page}.tsx
      register/
        visitor/{page,verify/page,success/page}.tsx
        nigerian/{page,success/page}.tsx
    user/                                  # User dashboard segment
      layout.tsx                           # → UserDashboardShell
      dashboard/page.tsx
      wallet/page.tsx
      bookings/page.tsx
      search/page.tsx
      nearby/page.tsx
      messages/page.tsx
      profile/page.tsx
      orders/page.tsx
    hotel/                                 # Hotel dashboard segment
      layout.tsx                           # → HotelDashboardShell
      dashboard/page.tsx
      bookings/page.tsx
      rooms/page.tsx
      staff/page.tsx
      orders/page.tsx
      finance/page.tsx
      visitors/page.tsx
      settings/page.tsx
      messages/page.tsx
    admin/                                 # Admin dashboard segment
      layout.tsx                           # → AdminDashboardShell
      dashboard/page.tsx
      hotels/page.tsx
      users/page.tsx
      blacklist/page.tsx
      messages/page.tsx
      analytics/page.tsx
      products/page.tsx
  components/
    layout/
      AppHeader.tsx                        # Green top bar (responsive)
      AppShell.tsx                         # AppHeader + PageSubHeader + main
      PageSubHeader.tsx                    # White subheader with back + title
      DashboardTopbar.tsx                  # Shared hamburger + content topbar
      UserDashboardShell.tsx               # Green sidebar + topbar (user)
      UserSidebar.tsx                      # 8-item user nav
      HotelDashboardShell.tsx              # Blue sidebar + topbar (hotel)
      HotelSidebar.tsx                     # 9-item hotel nav
      AdminDashboardShell.tsx              # Navy sidebar + topbar (admin)
      AdminSidebar.tsx                     # 7-item admin nav
      LanguageSwitch.tsx                   # Inline (desktop) / dropdown (mobile)
    ui/                                    # Stateless design-system primitives
      Button.tsx
      Card.tsx
      Field.tsx
      Input.tsx
      Select.tsx
      OtpInput.tsx
      OtpResend.tsx
      Tabs.tsx
      UploadField.tsx
      FigIcon.tsx
    QrTourismId.tsx
    SuccessHeader.tsx
    TourismIdCard.tsx
  types/
    index.ts                               # Barrel re-export
    user.ts                                # User, RegisterPayload types
    hotel.ts                               # Hotel, Booking, Room, Staff types
    admin.ts                               # AdminUser, SearchParams, Blacklist
    auth.ts                                # AuthSession, OTP, LoginMethod
    wallet.ts                              # Wallet, Transaction types
    messaging.ts                           # Message, Conversation types
  lib/
    utils.ts                               # cn() className combiner
    constants.ts                           # States, categories, facilities, roles
    permissions.ts                         # Permission enum, role→permission map
  middleware.ts                            # Route protection (ready for auth)
public/
  figma/
    icons/         (14 SVGs)
    img/           (9 PNG illustrations)
    patterns/      (3 SVG decorative shapes)
    background.png, logo.png, identity-card.svg, globe.svg, lock.svg
```

## Design system

All colors live in `tailwind.config.ts` under the `brand`, `surface`,
`border`, and `muted` keys. Use the brand classes (`bg-brand-green`,
`text-brand-ink`, etc.) — never hard-code hex outside of the config.

Two breakpoints matter:

* **`< md` (≤ 767px)** — Figma mobile artboards (390px). Header is compact,
  sidebar collapses off-canvas.
* **`≥ md`** — Figma 1440px artboard within a max-width container.

## Permissions & RBAC

Hotel staff access is controlled via a `Permission` enum and per-role
defaults defined in `src/lib/permissions.ts`:

| Role | Key Permissions |
| --- | --- |
| Management | All permissions |
| Receptionist | Bookings, visitors sign-in/out, calls |
| Accountant | Financial transactions |
| Bar/Kitchen/Laundry | Orders management |
| Security | View visitors |

## Roadmap

- [ ] Wire real auth (NIN/NIMC integration, session tokens)
- [ ] Wallet funding and debit flow
- [ ] Hotel search, filtering, and booking
- [ ] Hotel registration and onboarding
- [ ] Real-time messaging (WebSocket)
- [ ] GPS-based hotel proximity
- [ ] NTDA analytics dashboard
- [ ] Products marketplace
- [ ] Push notifications
