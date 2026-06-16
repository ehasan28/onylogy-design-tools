import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
import { PaletteWorkspace } from "@/components/color/PaletteWorkspace";
import { TOOLS } from "@/lib/seo/tool-meta";

export const metadata: Metadata = {
  title: "Color Workspace — Palettes, Semantic Systems, Exports",
  description:
    "Build a complete color system for WordPress, Kadence, Gutenberg, or Tailwind projects. Live previews, semantic tokens, accessibility checks, and one-click exports.",
  alternates: { canonical: "/color" },
};

export default function ColorHubPage() {
  const colorTools = TOOLS.filter((t) => t.category === "color");
  return (
    <>
      <header className="border-b border-line bg-gradient-to-b from-accent-soft/40 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Palette className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                Color workspace
              </h1>
              <p className="mt-3 max-w-3xl text-base text-fg-muted">
                Generate, refine, and export a full color system — semantic
                tokens, live previews on real UI, and WCAG accessibility
                checks. Free for WordPress, Kadence, Gutenberg, and Tailwind
                creators.
              </p>
            </div>
          </div>
        </div>
      </header>
      <PaletteWorkspace />
      <section className="border-t border-line bg-bg-elev/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight text-fg">
            Standalone color tools
          </h2>
          <p className="mt-1 text-sm text-fg-muted">
            Each tool is also a dedicated, shareable URL.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-line bg-bg p-5 transition-colors hover:bg-bg-elev"
              >
                <span className="text-base font-medium text-fg">
                  {tool.shortLabel}
                </span>
                <span className="text-sm text-fg-muted">
                  {tool.description}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
