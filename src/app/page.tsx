import Link from "next/link";
import { ArrowRight, Palette, Type, Sparkles, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COLOR_FEATURES = [
  "Palette generator with SaaS, dark, pastel, and accessible presets",
  "Semantic color systems (primary, surface, success, warning…)",
  "Live preview on buttons, cards, navbars, hero sections",
  "WCAG AA / AAA contrast checker",
  "Exports: CSS, Tailwind, SCSS, JSON, Kadence",
];

const FONT_FEATURES = [
  "Curated font pairings for SaaS, editorial, ecommerce, minimal sites",
  "Modular typography scales with clamp() generator",
  "Live preview on hero, blog, dashboard, ecommerce sections",
  "Readability and accessibility analyzer",
  "Exports: CSS, Tailwind, clamp, SCSS, JSON, Kadence",
];

const FEATURED_TOOLS = [
  {
    href: "/tools/palette-generator",
    label: "Palette Generator",
    description: "5 preset modes, fully editable.",
  },
  {
    href: "/tools/semantic-color-system",
    label: "Semantic Color System",
    description: "Primary, surface, success, warning, more.",
  },
  {
    href: "/tools/accessibility-checker",
    label: "Accessibility Checker",
    description: "WCAG AA / AAA pair analysis.",
  },
  {
    href: "/tools/font-pair-generator",
    label: "Font Pair Generator",
    description: "Pairings curated by site type.",
  },
  {
    href: "/tools/clamp-generator",
    label: "Clamp() Generator",
    description: "Responsive type without media queries.",
  },
  {
    href: "/tools/typography-scale-generator",
    label: "Type Scale Generator",
    description: "Modular ratios from minor-second to golden.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,var(--token-accent-soft),transparent_60%)]" />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <Badge variant="accent" size="md">
            <Sparkles className="h-3 w-3" />
            Free for WordPress creators
          </Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            Design systems for WordPress,
            <br />
            <span className="bg-gradient-to-r from-accent to-fg bg-clip-text text-transparent">
              built visually, exported instantly.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            Generate palettes, semantic color systems, font pairings, and
            responsive typography scales. Preview on real UI components.
            Export to Tailwind, CSS, SCSS, JSON, or Kadence — without leaving
            your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/color"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-white shadow-pop transition-opacity hover:opacity-90"
            >
              Open color workspace <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/font"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-bg-elev px-5 text-sm font-medium text-fg transition-colors hover:bg-bg-elev-2"
            >
              Open font workspace <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-wider text-fg-dim">
            <span>WordPress</span>
            <span className="h-1 w-1 rounded-full bg-fg-dim/60" />
            <span>Kadence</span>
            <span className="h-1 w-1 rounded-full bg-fg-dim/60" />
            <span>Gutenberg</span>
            <span className="h-1 w-1 rounded-full bg-fg-dim/60" />
            <span>Tailwind</span>
            <span className="h-1 w-1 rounded-full bg-fg-dim/60" />
            <span>Next.js</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
        <Link
          href="/color"
          className="group relative overflow-hidden rounded-2xl border border-line bg-bg-elev/50 p-8 transition-all hover:bg-bg-elev hover:shadow-pop"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Palette className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg">
                Color tools
              </h2>
              <p className="text-xs uppercase tracking-wider text-fg-dim">
                Palettes, semantic systems, accessibility
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            {COLOR_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
            Open color workspace <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        <Link
          href="/font"
          className="group relative overflow-hidden rounded-2xl border border-line bg-bg-elev/50 p-8 transition-all hover:bg-bg-elev hover:shadow-pop"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Type className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg">
                Font tools
              </h2>
              <p className="text-xs uppercase tracking-wider text-fg-dim">
                Pairings, scales, clamp(), readability
              </p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-fg-muted">
            {FONT_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
            Open font workspace <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fg">
              Pick a tool, ship in minutes
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Each tool is a dedicated workspace — share a URL, export the
              tokens, done.
            </p>
          </div>
          <Link
            href="/tools"
            className="hidden text-sm font-medium text-accent hover:underline sm:inline"
          >
            All tools →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col gap-1 rounded-xl border border-line bg-bg-elev/40 p-5 transition-colors hover:bg-bg-elev"
            >
              <div className="flex items-center gap-2 text-fg">
                <Layers className="h-4 w-4 text-fg-dim" />
                <span className="font-medium">{tool.label}</span>
              </div>
              <p className="text-sm text-fg-muted">{tool.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Open tool <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
