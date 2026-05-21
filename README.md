# StaySuite — National Hotel Booking Platform

StaySuite is the digital front door of Nigeria's National Hotel Management
Platform. It lets Nigerians register with their NIN, allows foreign
visitors to register, and gives hotel owners and travellers a unified place
to manage their stays.

The UI is being implemented 1:1 against the Figma source of truth at
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

## Implemented pages

| Route | Figma node(s) | Description |
| --- | --- | --- |
| `/` | `25:7` | Public welcome page with three CTAs |
| `/login` | `84:371` | Email / Phone tab + identifier capture |
| `/login/verify` | `84:518` | 4-digit OTP with countdown resend |
| `/register/visitor` | `20:22725` | Visitor registration form |
| `/register/visitor/verify` | `40:104` | Identity verification OTP |
| `/register/visitor/success` | `40:179`, `31:245` | Success + QR ID + wallet/ID card actions |
| `/register/nigerian` | `49:477`, `49:672` | NIN-based registration with inline OTP |
| `/register/nigerian/success` | `49:1024` | Success with Tourism ID card (`71:1360`) and confetti |
| `/dashboard` | `53:46` | Authenticated landing with sidebar nav and action cards |

Every page is fully responsive — mobile-first Tailwind utilities with
`md:`/`sm:` overrides for the design's desktop layout. The dashboard
sidebar collapses to a drawer below `md` (768px).

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
    layout.tsx                         # Root layout, fonts, metadata
    globals.css                        # Tailwind base + global resets
    page.tsx                           # / (welcome)
    login/{page,verify/page}.tsx
    register/
      visitor/{page,verify/page,success/page}.tsx
      nigerian/{page,success/page}.tsx
    dashboard/page.tsx
  components/
    layout/
      AppHeader.tsx                    # Green top bar (responsive)
      AppShell.tsx                     # AppHeader + PageSubHeader + main
      PageSubHeader.tsx                # White subheader with back + title
      DashboardShell.tsx               # Sidebar layout for authed pages
      DashboardSidebar.tsx             # 235px column / mobile drawer
      LanguageSwitch.tsx               # Inline (desktop) / dropdown (mobile)
    ui/                                # Stateless design-system primitives
      Button.tsx                       # primary | blue | navy | white | ghost
      Card.tsx                         # 9px-rounded surface, optional border
      Field.tsx                        # Label + control + hint wrapper
      Input.tsx                        # 48px text input with endAdornment
      Select.tsx                       # Native select w/ Figma chevron icon
      OtpInput.tsx                     # 4-up OTP w/ paste + arrow nav
      OtpResend.tsx                    # "Resend OTP 00:30" countdown widget
      Tabs.tsx                         # Segmented control (Email / Phone)
      UploadField.tsx                  # File picker styled as a CTA
      FigIcon.tsx                      # Image-based icon wrapper
    QrTourismId.tsx                    # QR + Tourism ID line (40:215)
    SuccessHeader.tsx                  # ✓ + "Registration Successful!"
    TourismIdCard.tsx                  # Figma 71:1360 ID-card component
  lib/
    utils.ts                           # cn() className combiner
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
`text-brand-ink`, etc.) anywhere a Figma color appears — never hard-code
the hex outside of the config.

Two breakpoints matter:

* **`< md` (≤ 767px)** — uses the Figma mobile artboards (390px). Header
  is compact, language switch becomes a dropdown, sidebar collapses
  off-canvas.
* **`≥ md`** — locks to the Figma 1440px artboard within a 1440 max-width
  container, centered on larger screens.

## Roadmap

- [ ] Wire the real auth + NIN/passport verification services
- [ ] Wallet funding flow (`/dashboard/wallet`)
- [ ] Hotel search & booking
- [ ] Hotel Owner portal
- [ ] Notification center
