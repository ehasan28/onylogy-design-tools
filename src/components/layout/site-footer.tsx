import Link from "next/link";

const COLOR_TOOLS = [
  { href: "/tools/color-picker", label: "Color Picker" },
  { href: "/tools/palette-generator", label: "Palette Generator" },
  { href: "/tools/semantic-color-system", label: "Semantic Color System" },
  { href: "/tools/accessibility-checker", label: "Accessibility Checker" },
  {
    href: "/tools/tailwind-color-generator",
    label: "Tailwind Color Generator",
  },
];

const FONT_TOOLS = [
  { href: "/tools/font-pair-generator", label: "Font Pair Generator" },
  {
    href: "/tools/typography-scale-generator",
    label: "Typography Scale Generator",
  },
  { href: "/tools/clamp-generator", label: "Clamp Generator" },
  {
    href: "/tools/tailwind-typography-generator",
    label: "Tailwind Typography",
  },
  { href: "/tools/readability-checker", label: "Readability Checker" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-elev/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-sm font-semibold text-fg">Onylogy Design Tools</div>
          <p className="mt-2 max-w-xs text-xs text-fg-muted">
            Free design-system tools for WordPress, Kadence, Gutenberg, and
            modern frontend workflows.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
            Color
          </h4>
          <ul className="mt-3 space-y-2">
            {COLOR_TOOLS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-sm text-fg-muted hover:text-fg"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
            Font
          </h4>
          <ul className="mt-3 space-y-2">
            {FONT_TOOLS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-sm text-fg-muted hover:text-fg"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
            Resources
          </h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/color"
                className="text-sm text-fg-muted hover:text-fg"
              >
                Color Workspace
              </Link>
            </li>
            <li>
              <Link
                href="/font"
                className="text-sm text-fg-muted hover:text-fg"
              >
                Font Workspace
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="text-sm text-fg-muted hover:text-fg"
              >
                All Tools
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-fg-muted sm:flex-row sm:items-center sm:px-6">
          <span>
            © {new Date().getFullYear()} Onylogy Design Tools. Free forever.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-dim">
            Built for WordPress creators
          </span>
        </div>
      </div>
    </footer>
  );
}
