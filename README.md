# CooPERA website

One-page site for CooPERA (Kape & Paste, DOST-SEI STTP+ 2026). Next.js App Router + TypeScript + Tailwind, static, no backend.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (deploy target: Vercel)
```

## Where things live

| What | File |
|---|---|
| All copy, numbers and placeholders | `src/content.ts` |
| Page sections | `src/app/page.tsx` |
| Nav + scroll-spy | `src/components/Nav.tsx` |
| Hero isometric visual | `src/components/HeroVisual.tsx` |
| "See it work" map | `src/components/PickupMap.tsx` |
| Drawn field art (SVG, no stock photos) | `src/components/FieldArt.tsx` |
| Logo | `src/components/Logo.tsx`, `public/icon.svg` |
| Colors and fonts | `src/app/globals.css` |

## Fill in the placeholders

Search `src/content.ts` for `[`:

- `[TEAM EMAIL]`, `[Facebook]`, `[LinkedIn]` (top of the file). Once real, turn the Facebook/LinkedIn chips in `Contact()` into links.
- `[role]` for each team member (in `page.tsx`, `Team()`).
- `[Bootcamp 1: add one sentence]`, `[Bootcamp 6: add one sentence]` in `STORY`.
- `[₱___ / month]` stays until pricing is set after the pilot.

## Photos

Put photos in `public/photos/`. Any slot showing `[Photo: /photos/<name>.jpg]` is waiting for that file: add the file, then set `src: "/photos/<name>.jpg"` and a real `alt` in `content.ts`. Strip location data before adding phone photos (for example `magick in.jpg -auto-orient -strip -resize 1800x1800> out.jpg`).

Photos in use now: `team.jpg`, `san-pedro-mpc-visit.jpg`, `san-pedro-mpc-interview.jpg`, `sidc-visit.jpg`. Also copied but unused: `team-2.jpg`, `sidc-building.jpg`, `bootcamp-session.jpg`.

Still needed: `dost-consultation.jpg`, `farmer-interview-1.jpg`, `bootcamp-1.jpg` … `bootcamp-6.jpg`, `choosing-the-problem.jpg`, `one-concept.jpg`, `demo-day.jpg`, and one portrait per member (`team-<first>-<last>.jpg`, names listed in `TEAM`).
