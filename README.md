# La Vanguardia clone — Frontend

Next.js (App Router) + JavaScript + Tailwind CSS v4 clone of the La
Vanguardia header and footer, built from the provided reference
screenshots (desktop header, mobile header, sticky/scrolled header,
desktop footer, mobile footer).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

## What's included so far

- **Header** (`components/Header.jsx`)
  - Desktop: hamburger button, centered logo, Subscribe button (navy row),
    with the full category nav row underneath (cream row, links separated
    by "/", matching the reference exactly).
  - On scroll, the category row collapses away and the logo shrinks to
    a compact size — matching `header-after-sticky.png`. The hamburger
    and Subscribe button stay a fixed size/position in both states.
  - Mobile: a single compact navy row — hamburger, centered logo, filled
    account icon. No secondary strip, matching `header-mobile.png` exactly.
  - Hamburger (desktop and mobile) opens a slide-out drawer
    (`components/MobileNavDrawer.jsx`) with the full nav list and a
    Subscribe button.
- **Footer** (`components/Footer.jsx`) — centered logo, muted copyright
  line, and a wrapping row of legal links, matching `footer-desktop.png`
  / `footer-mobile.png` (no social icons, no extra tag row).
- **Logo** (`components/Logo.jsx`) — text-based mimic of the wordmark
  (Playfair Display, bold/black weight, uppercase) since no logo asset
  was provided. To swap in a real logo image: drop your file in
  `public/images/`, then uncomment the `<img>` block in `Logo.jsx` and
  remove the text wordmark block below it.
- **Colors** — sampled directly from the screenshots and defined as
  Tailwind v4 theme tokens in `app/globals.css`: `navy` (#001c4c),
  `cream` (#eaede2), `gold` (#ffd700), `ink` (#1a1a1a).
- **Fonts** — self-hosted via `@fontsource/playfair-display` (serif —
  logo, nav links, footer) and `@fontsource/inter` (sans — Subscribe
  button/UI). Bundled as local static assets, no runtime calls to
  Google Fonts.
- **Data** — `data/siteConfig.json` holds the nav labels and footer
  links/copyright, so header/footer content isn't hardcoded in
  components.

## Project conventions

- All components/pages are `.jsx` (JavaScript, not TypeScript).
- App Router (`app/`), matching the folder/routing style of the
  reference project.
- Tailwind CSS v4, configured via `@theme inline` in `app/globals.css`
  (no separate `tailwind.config`).
- Shared `SiteChrome.jsx` wraps every page with `Header` + `Footer` via
  the root layout, so header/footer stay consistent site-wide.
- Route folders scaffolded (placeholder pages only, to be designed
  later): `app/[category]/page.jsx` (category listing),
  `app/[category]/[slug]/page.jsx` (article detail),
  `app/authors/[slug]/page.jsx` (author profile).

## Next steps (planned)

- Homepage layout, built as a combination of smaller components
  (matching the reference project's composition style).
- Design the category, detail, and author pages.
