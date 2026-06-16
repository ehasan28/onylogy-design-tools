# Onylogy Design Tools

> Free, browser-based color & typography design-system tools for WordPress, Kadence, Gutenberg, and Tailwind creators.

Generate palettes, semantic color systems, font pairings, and responsive typography scales — preview them on real UI components, and export to **CSS variables, Tailwind (v3 & v4), SCSS, JSON, and Kadence**. Everything runs client-side; state is shareable via URL.

🔗 **Live:** https://onylogy.studio

---

## Features

### Color
- **Palette Generator** — 5 presets (SaaS, Dark, Pastel, Minimal, Accessible) plus color-harmony modes (complementary, analogous, triadic, split-complementary, tetradic). Edit, lock, randomise, and adjust hue/saturation/lightness across the whole palette, with undo/redo.
- **Numbered scales (50–950)** — perceptual OKLCH tint/shade ramps for every semantic color, exported in Tailwind/CSS/SCSS shape.
- **Semantic Color System** — 11 roles wired into a live preview, with auto-derived hover/active states and a one-click shadcn `globals.css` export.
- **Color Picker** — HEX / RGB / HSL / OKLCH with alpha, the native **EyeDropper**, sliders, recent colors, and nearest-named / nearest-Tailwind color.
- **Accessibility Checker** — WCAG 2.x **and APCA (WCAG 3 draft)** scoring, a full contrast matrix, color-blindness simulation, and concrete suggested fixes.
- **Image → Palette** — extract a palette from any uploaded image and auto-assign roles.
- **Tailwind Color Generator** — semantic + numbered tokens, v3 `module.exports` and v4 `@theme` output.

### Typography
- **Font Pair Generator** — curated Google Fonts pairings by site type, with favorites and live previews.
- **Typography Scale Generator** — modular scales (minor-second → golden ratio), per-step overrides, and an optional companion spacing scale.
- **Clamp() Generator** — fluid responsive type, whole-scale output, configurable viewports/units.
- **Tailwind Typography Generator** — `fontFamily` + `fontSize` tuples (v3 & v4).
- **Readability Checker** — body size, line-height, real measured line-length, contrast, and Flesch reading-ease on your own pasted content.

### Cross-cutting
- Light / dark / system theming, shareable URL state, per-tool SEO metadata + FAQ structured data, sitemap & robots, and PNG/"share image" export of palettes and scales.

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **Radix UI** primitives · **Framer Motion**
- **Zustand** for state · **culori** for color math
- **Vitest** for unit tests

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Run unit tests (Vitest) |

---

## Project structure

```
src/
  app/            # routes: home, /color, /font, /tools/*
  components/     # color/, typography/, preview/, layout/, ui/, shared/
  lib/
    color/        # conversion, contrast (WCAG + APCA), harmony, scales, clustering
    typography/   # scale, readability, parsing, font presets
    exporters/    # color/ and typography/ → css, tailwind, scss, json, kadence
    utils/        # clipboard, download, url-state
  stores/         # zustand: color, typography, theme
```

---

## Deployment

Deploys to [Vercel](https://vercel.com) with zero configuration — connect the repo and ship. Set your production domain in `src/lib/site.ts`.

## License

[MIT](./LICENSE)
