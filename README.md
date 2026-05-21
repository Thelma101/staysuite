# StaySuite — National Hotel Booking Platform

StaySuite is the digital front door of Nigeria's National Hotel Management
Platform. It lets Nigerians register with their national ID, allows foreign
visitors to register, and gives hotel owners and travellers a unified place
to manage their stays.

The application is being implemented to match the official Figma design 1:1.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Fonts | Inter + Montserrat (via `next/font`) |
| Icons / images | Sourced from Figma, served from `public/figma/` |

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to view the welcome
page. The page is designed at a 1440 × 1024 canvas; it currently renders at
that fixed canvas to guarantee a pixel-accurate match with Figma.

## Project structure

```
src/
  app/
    layout.tsx        # Root layout, fonts, metadata
    page.tsx          # Welcome page (Figma node 25:7)
    globals.css       # Tailwind base + global resets
  components/
    SiteHeader.tsx           # Green top bar (Figma node 20:22791)
    PrimaryActionButton.tsx  # 398×56 CTA used in the welcome stack
public/
  figma/              # Image assets exported from Figma
```

## Design source

- Figma file: `VkQJ8AttnbaGEMwSncqnYF`
- Welcome page node: `25:7`
- [Open in Figma](https://www.figma.com/design/VkQJ8AttnbaGEMwSncqnYF/National-Hotel-Booking-platform--Copy-?node-id=25-7&m=dev)

## Roadmap

- [ ] Nigerian registration flow
- [ ] Visitor / Foreigner registration flow
- [ ] Login + session management
- [ ] Hotel Owner dashboard
- [ ] Booking search & inventory
