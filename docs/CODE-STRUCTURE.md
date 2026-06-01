# Code Structure — NTDA & Green Lunar Dashboards

## Repository layout (post-restructure)

```
temp-clone/
├── NTDA/                          # Standalone NTDA admin app (port 3231)
│   ├── public/figma/              # Shared design assets (icons)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Root layout + fonts
│   │   │   ├── globals.css
│   │   │   ├── ntda/              # Authenticated dashboard routes
│   │   │   │   ├── layout.tsx     # NtdaDashboardShell wrapper
│   │   │   │   ├── dashboard/
│   │   │   │   ├── hotels/
│   │   │   │   ├── visitors/
│   │   │   │   ├── approvals/
│   │   │   │   ├── broadcast/
│   │   │   │   ├── transactions/
│   │   │   │   └── admins/
│   │   │   └── ntda-auth/         # Public auth routes
│   │   │       ├── login/
│   │   │       ├── forgot-password/
│   │   │       └── email-template/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── NtdaDashboardShell.tsx
│   │   │   │   └── NtdaSidebar.tsx
│   │   │   └── ui/                # Button, Input, Select, SlidePanel, …
│   │   └── lib/
│   │       ├── utils.ts
│   │       ├── validation.ts
│   │       └── api/
│   │           ├── client.ts      # HTTP client + ApiError
│   │           └── ntda.ts        # NTDA endpoint wrappers
│   ├── package.json
│   ├── tailwind.config.ts
│   └── README.md
│
├── GreenLunar/                    # Standalone Green Lunar app (port 3232)
│   ├── public/figma/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   └── greenlunar/
│   │   │       ├── layout.tsx
│   │   │       ├── login/
│   │   │       ├── forgot-password/
│   │   │       ├── financials/    # Main dashboard + withdraw modals
│   │   │       └── email-template/
│   │   ├── components/ui/
│   │   └── lib/
│   │       ├── utils.ts
│   │       ├── validation.ts
│   │       └── api/
│   │           ├── client.ts
│   │           └── greenlunar.ts
│   ├── package.json
│   └── README.md
│
├── src/                           # Legacy monolith (User, Hotel, Owner, Admin)
└── docs/
    ├── CODE-STRUCTURE.md          # This file
    └── API-SPECIFICATION.md
```

## Route → component relationships

### NTDA

- `NtdaLayout` → wraps all `/ntda/*` pages with `NtdaDashboardShell`
- `NtdaDashboardShell` → `NtdaSidebar` + top bar + `<main>{children}</main>`
- Auth pages under `/ntda-auth/*` use full-page layouts (no sidebar)

### Green Lunar

- `GreenLunarLayout` → minimal pass-through for `/greenlunar/*`
- `financials/page.tsx` → embeds its own sidebar + withdraw/transaction slide panels

## Data flow

1. Page components call functions in `src/lib/api/*.ts`
2. API modules use `apiRequest` from `client.ts` when `NEXT_PUBLIC_API_BASE_URL` is set
3. Without API URL, modules return empty collections or zeroed stats (production-safe empty states)
4. Forms validate via `src/lib/validation.ts` before local UI actions or API submission
