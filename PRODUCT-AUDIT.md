# Onylogy Studio — Product Audit & Improvement Plan

_Audit date: 2026-06-15. Based on a full read of the source (`src/`) **plus a live walkthrough of the running app** (localhost:3000) in the browser. The project type-checks cleanly (`tsc --noEmit` → 0 errors)._

## 0. Live preview verification (browser)

Walked through the running site in both light and dark themes. **It looks genuinely production-grade** — the design, polish, and live-preview system are well above typical side-project quality. Confirmed working: homepage (light/dark), color workspace (sticky palette bar, presets, Randomise, ~15 live preview components — nav, buttons, pricing, blog, ecommerce, form, alerts, table, modal, dashboard), the WCAG contrast report with AA/AAA badges, the CSS-variable export panel, the font workspace (modular scale + ratio/base controls), color picker, clamp generator, accessibility checker, font-pair generator, and the theme toggle (Light/Dark/System).

Two corrections to the static audit from what the browser showed:

- **Clamp generator is richer than expected** — it already outputs the *whole scale's* clamps (a full `:root { … }` block), plus min/max size + min/max viewport sliders and mobile-size presets. Audit item 3.8 is largely already done; only the unit-choice and spacing-clamp ideas remain.
- **Accessibility "suggested fix" gap confirmed visually** — on a passing pair the tool shows a verdict line ("Excellent contrast across all body and UI use cases") but no *concrete suggested hex* to fix a failing pair. Item 3.4 stands.

New runtime-only finding:

- 🔴 **The header "GitHub" link points to `https://github.com`** (a placeholder), not your repo. Must be set to the real URL before launch.

---

## 1. What the product is today

A Next.js 16 / React 19 / Tailwind v4 web app — a free suite of color + typography tools aimed at WordPress, Kadence, Gutenberg, and Tailwind creators. Everything runs client-side, state is shareable via URL, and outputs export to CSS, Tailwind, SCSS, JSON, and Kadence.

### Feature inventory (what works now)

1. **Color workspace** (`/color`) — full palette workspace with live UI previews.
2. **Palette Generator** — 5 presets (SaaS, Dark, Pastel, Minimal, Accessible), per-swatch edit, lock, role assignment, randomize, OKLCH-based generation, localStorage history (last 10).
3. **Color Picker** — HEX/RGB/HSL/OKLCH live conversion, copy each format, native color input.
4. **Semantic Color System** — 11 roles (primary, secondary, accent, muted, background, surface, foreground, border, success, warning, destructive) wired into one shared preview theme.
5. **Accessibility / Contrast Checker** — WCAG 2.x AA + AAA scoring for normal/large/UI thresholds.
6. **Tailwind Color Generator** — semantic `theme.extend.colors` block.
7. **Font workspace** (`/font`) — pairing + scale workspace with live previews.
8. **Font Pair Generator** — 12 curated Google Fonts pairings across 5 categories, live preview, correct `<link>` emission.
9. **Typography Scale Generator** — H1–H6 + body + caption from 8 classic modular ratios; also detects a ratio from observed sizes.
10. **Clamp() Generator** — fluid type via linear viewport interpolation.
11. **Tailwind Typography Generator** — `fontFamily` + `fontSize` tuples with line-height / weight / letter-spacing.
12. **Readability Checker** — body size, line-height, line length (measure), contrast vs. WCAG + Bringhurst baselines.
13. **Shared infrastructure** — preview component library (navbar, hero, pricing, dashboard, table, forms, alerts, e-commerce), 6 export formats, URL state encoding, dark/light theming (`next-themes`), SEO metadata + FAQs per tool, `sitemap.ts`, `robots.ts`.

### Verification findings

- ✅ **Type-safe** — compiles with zero TypeScript errors.
- ⚠️ **Dead/unbuilt engine** — `src/lib/color/cluster.ts`, `roles.ts`, and `compose.ts` implement a complete **image → palette extraction** pipeline (color clustering, role inference, alpha compositing) that **no UI imports**. Either ship it as a tool (see 3.1) or remove it before publishing.
- ⚠️ **README is still create-next-app boilerplate** — must be replaced before GitHub (see §4).
- ⚠️ **No tests** — `vitest` is installed but there are zero test files, despite math-heavy logic (contrast, OKLCH, scale, clamp) that is perfect for unit tests.
- ⚠️ **Favorites gap** — the font-pair FAQ promises "favourites stored in localStorage," but `typography-store.ts` has no favorites logic. Either build it or fix the copy.

---

## 2. The big gaps to be "best-in-class"

These are the things that separate this from a polished hobby project and put it alongside Coolors / Realtime Colors / Tailwind's own tools.

1. **Ship image-based palette extraction** — the engine already exists; expose it. Upload an image (or paste) → extract dominant colors → auto-assign roles → load into the palette. This is a flagship feature of every top color tool and you're ~80% there in code.
2. **Numbered color scales (50–950)** — Tailwind/shadcn users expect `primary-50 … primary-950`, not just a single semantic value. Today exports emit one hex per role. Generate perceptual tint/shade ramps (OKLCH lightness steps) and export them.
3. **APCA contrast (WCAG 3 draft)** alongside WCAG 2.x — modern accessibility tooling shows both; you already have the luminance math to add it.
4. **Color-blindness simulation** — protanopia / deuteranopia / tritanopia preview toggle on the palette and accessibility tools.
5. **Combined "design system" save + export** — `theme-store` already merges color + type, but there's no way to save a named project or export both together (one CSS/Tailwind file with colors *and* type). This is the natural "finish my system" moment.
6. **Tailwind v4 `@theme` output** — generators emit v3 `module.exports`. v4 is now the default; output a `@theme { --color-… }` block too.
7. **Full Google Fonts search** — 12 curated pairs is a nice start, but a search/browse across the Google Fonts library (with variable-font axes) is what makes a font tool sticky.
8. **Share-as-image / OG preview** — export a palette or type-scale as a PNG, and generate a dynamic OG image per shared URL.

---

## 3. Per-tool improvement list

### 3.1 Color Picker
- **Add the native EyeDropper API** ("pick from anywhere on screen") — supported in Chromium; huge value, tiny code.
- **Alpha support** — `RgbaColor` already carries alpha, but the UI uses `<input type="color">` which can't set it. Add an alpha slider + show `#RRGGBBAA` / `rgba()`.
- **HSL & OKLCH sliders** (not just text) so users can nudge L/C/H directly.
- **Recent / saved colors** strip.
- **Nearest named color** + nearest Tailwind color label.
- **Contrast-against helper** — pick a second color, show live ratio (the FAQ implies "check WCAG in one click" — make it explicit here).

### 3.2 Palette Generator
- **Harmony modes** — complementary, analogous, triadic, split-complementary, tetradic. Currently presets vary by hue range only.
- **Tint/shade ramps** per swatch (the 50–950 scales from §2.2).
- **Image extraction** entry point (§2.1).
- **Undo/redo** (history exists but is load-only; add step-back).
- **Adjust-all controls** — global hue/lightness/saturation/temperature sliders; `shiftSwatchHue()` exists but appears unused.
- **Export the full palette**, not just semantic roles (today `ExportDrawer` exports `semantic` only — locked/extra swatches are dropped).

### 3.3 Semantic Color System
- **State derivations** — auto-generate hover/active/focus/disabled variants per role.
- **Auto dark-mode variant** from the light system (and vice versa).
- **Per-role contrast badge** inline (you compute `bestForeground` already).
- **shadcn `globals.css` export** (`--background`, `--foreground`, … in the exact shadcn token shape) — you already advertise shadcn compatibility.

### 3.4 Accessibility / Contrast Checker
- **Actual "suggested improvement"** — the meta promises suggestions, but `paletteWcagReport` only returns ratios. Add: nudge a color along OKLCH lightness until it passes AA/AAA, and show the suggested hex.
- **APCA score** beside WCAG (§2.3).
- **Color-blindness simulation** (§2.4).
- **Matrix view** — every foreground × background pair in the palette at a glance.

### 3.5 Tailwind Color Generator
- **v4 `@theme` output** (§2.6).
- **Numbered scales** in the config, not just semantic keys.
- **CSS-variable-backed colors** option (`primary: 'rgb(var(--primary) / <alpha-value>)'`).

### 3.6 Font Pair Generator
- **Full Google Fonts browse/search** + **variable-font axes** (§2.7).
- **Build the favorites feature** the FAQ already promises (or remove the claim).
- **Upload / local & Adobe fonts** support.
- **"Why this pairs" notes** and contrast-of-personality hints.
- **Swap heading/body** and **lock one side while shuffling the other.**

### 3.7 Typography Scale Generator
- **Per-step manual override** (nudge one size without breaking the ratio elsewhere).
- **Fluid toggle** — emit clamp() per step directly (bridge to the Clamp tool).
- **Live specimen** with real paragraph/heading text, not just size labels **(visual check)**.
- **Spacing scale** companion (4/8pt rhythm) — most "type scale" tools now include spacing.

### 3.8 Clamp() Generator
- **rem/px unit choice** and configurable root size.
- **Apply to spacing/margins**, not only font-size.
- **Generate the whole scale's clamps at once** (tie into 3.7).
- **Show the min/max viewport breakpoints visually** on a slider.

### 3.9 Tailwind Typography Generator
- **v4 `@theme` output** (§2.6).
- **`@tailwindcss/typography` (prose) config** option — the name collides with that plugin; clarify or support it.

### 3.10 Readability Checker
- **Measure real rendered width** instead of estimating chars/line from a glyph-width factor **(visual check)**.
- **Flesch reading-ease / grade level** for pasted body text.
- **Paste-your-own-content** mode to test against real copy.

---

## 4. Pre-publish checklist (GitHub + Vercel)

Before this goes public, in rough priority order:

1. **Fix the placeholder `GitHub` link** in the header — currently `https://github.com`. Point it at the real repo (and the footer/social links if any).
2. **Replace `README.md`** — it's still the Next.js starter text. Write: what Onylogy Studio is, screenshots/GIF, feature list, tech stack, local-dev steps, deploy notes, license. _(I can draft this for you.)_
3. **Add a `LICENSE`** (MIT is typical for a free tool).
3. **Add an OG image + per-page social cards** — `layout.tsx` declares `summary_large_image` but there's no image asset; broken social previews look unfinished.
4. **Add FAQ structured data (JSON-LD `FAQPage`)** — you've written great FAQs and target SEO keywords, but they aren't marked up for rich results. Big, cheap SEO win.
5. **Write a few unit tests** — `vitest` is already installed. Cover `contrast.ts`, `convert.ts` (OKLCH round-trips), `scale.ts`, and the clamp math. Gives you confidence + a green CI badge.
6. **Add CI** — a GitHub Action running `lint`, `tsc --noEmit`, `test`, `build`.
7. **Verify the production build + every route renders** in the browser **(visual check)** — the audit confirmed types compile but not runtime rendering.
8. **Resolve the unused image-extraction engine** — ship it (§2.1) or delete `cluster.ts`/`roles.ts`/`compose.ts` so reviewers don't trip on dead code.
9. **Fix the favorites copy/feature mismatch** (§1).
10. **Deploy to Vercel** — connect the GitHub repo, set the project, add the custom domain; Next 16 deploys with zero config.

---

## 4b. Implementation status — 2026-06-15

Worked through the audit in phases. `tsc --noEmit` passes (0 errors); color (10/10) and typography (8/8) math verified in Node; all new screens confirmed rendering in the browser.

**Done**
- **Launch blockers:** GitHub link now reads from `src/lib/site.ts` (set `repoUrl` to the real repo); README replaced; `LICENSE` (MIT) added; dynamic OG image (`app/opengraph-image.tsx`); FAQ JSON-LD was already present; font-pair **favorites** built (heart toggle + Favorites filter, localStorage) with a `StoreHydrator`.
- **Color engine:** numbered **50–950 OKLCH ramps**; new exports — **Tailwind v4 `@theme`**, **shadcn/ui** tokens (color + typography v4 too); **APCA** (WCAG 3) shown beside WCAG 2.x; **concrete suggested fix** in the contrast checker; **color-harmony** modes; **adjust-all** H/S/L + **undo/redo**; **color-blindness simulation** (SVG filters).
- **Color picker:** native **EyeDropper**, **alpha** + OKLCH L/C/H sliders, **recent colors**, **nearest named / nearest Tailwind** color.
- **Typography:** **Flesch reading-ease + paste-your-own-content**; **per-step overrides** (size/LH/weight/tracking) with reset; **spacing scale** lib + CSS export.
- **Flagship:** **Image → Palette** extractor tool (`/tools/image-palette`) wiring up the existing clustering engine, with "Load into tools" + per-swatch copy; **PNG share export** of palettes.
- **Quality:** Vitest unit tests for color/typography/exporters; `test`/`typecheck` scripts; **GitHub Actions CI** (lint → typecheck → test → build).

**Deferred (noted, not built)** — full Google Fonts library search + variable-font axes (needs a bundled font dataset/API); named multi-project save + combined color-and-type export; an N×N contrast matrix view; surfacing the spacing scale inside a dedicated tool. Two caveats: unit tests are written but couldn't run in my sandbox (Vitest's Linux native binary isn't installed — run `npm test` locally), and the production `next build` likewise needs a one-time online install.

## 5. Suggested next step

If you want, I can do any of these immediately:
- Draft the real **README.md** (replacing the boilerplate).
- Write the **unit tests** for the color/typography math.
- Build the **image → palette extraction tool** that wires up your existing engine.
- Add **numbered 50–950 scales** + **Tailwind v4 `@theme` export.**

Tell me which to start with.
