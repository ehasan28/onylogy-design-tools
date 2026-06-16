import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, Type } from "lucide-react";
import { TOOLS } from "@/lib/seo/tool-meta";

export const metadata: Metadata = {
  title: "All Tools — Onylogy Design Tools",
  description:
    "Browse every free Onylogy Design Tools utility: color palette generator, semantic color systems, font pair generator, typography scales, clamp() generator, accessibility checks, and more.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndexPage() {
  const color = TOOLS.filter((t) => t.category === "color");
  const font = TOOLS.filter((t) => t.category === "font");
  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="text-4xl font-semibold tracking-tight text-fg">
            All tools
          </h1>
          <p className="mt-3 max-w-2xl text-base text-fg-muted">
            Every tool is free, instant, and shareable via URL. Built for
            WordPress, Kadence, Gutenberg, and Tailwind creators.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Category icon={Palette} title="Color tools" tools={color} />
        <Category
          icon={Type}
          title="Font tools"
          tools={font}
          className="mt-16"
        />
      </section>
    </>
  );
}

function Category({
  icon: Icon,
  title,
  tools,
  className,
}: {
  icon: typeof Palette;
  title: string;
  tools: typeof TOOLS;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-fg">
          {title}
        </h2>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col gap-2 rounded-xl border border-line bg-bg-elev/40 p-5 transition-colors hover:bg-bg-elev"
          >
            <span className="text-base font-medium text-fg">
              {tool.shortLabel}
            </span>
            <span className="text-sm text-fg-muted">{tool.description}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
              Open <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
