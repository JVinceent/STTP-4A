# CooPERA website

One-page site for CooPERA (Kape & Paste, DOST-SEI STTP+ 2026). Next.js App Router + TypeScript + Tailwind CSS + real-time Three.js 3D architectural maquette scenes and interactive demos.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (deploy target: Vercel)
```

## Where things live

| What | File |
|---|---|
| All copy, metrics, story, farms, and team roster | `src/content.ts` |
| Page sections | `src/app/page.tsx` |
| Nav + scroll-spy | `src/components/Nav.tsx` |
| Shared Three.js procedural farm builders | `src/lib/farm3d.ts` |
| Interactive 3D Hero farm cluster & workflow chips | `src/components/HeroVisual.tsx` |
| Interactive 3D aerial route map & live payout simulator | `src/components/PickupMap.tsx`, `src/components/HowItWorksSection.tsx` |
| Interactive Mission/Vision panels | `src/components/AboutVisuals.tsx` |
| Interactive module & freight fee configurator | `src/components/PlansSection.tsx` |
| Interactive Farmer Field Notes card | `src/components/ValidationFarmerCard.tsx` |
| Footer 3D highland terrace relief banner | `src/components/TerrainBanner3D.tsx` |
| Interactive pilot inquiry form | `src/components/ContactForm.tsx` |
| Logo | `src/components/Logo.tsx`, `public/logo.png` |
| Fieldwork & team photos | `public/photos/` |
| Colors and theme tokens | `src/app/globals.css` |

## Photos

Real fieldwork & team photos in `public/photos/`: `team.jpg`, `team-2.jpg`, `san-pedro-mpc-visit.jpg`, `san-pedro-mpc-interview.jpg`, `sidc-visit.jpg`, `sidc-building.jpg`, `bootcamp-session.jpg`.
Strip EXIF location data before adding new phone photos (e.g., `magick in.jpg -auto-orient -strip -resize 1800x1800> out.jpg`).
