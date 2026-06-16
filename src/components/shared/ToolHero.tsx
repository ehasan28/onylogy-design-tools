import Link from "next/link";
import { ChevronRight, Palette, Type } from "lucide-react";
import type { ToolMeta } from "@/lib/seo/tool-meta";

export function ToolHero({ tool }: { tool: ToolMeta }) {
  const Icon = tool.category === "color" ? Palette : Type;
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-xs text-fg-muted"
        >
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            href={`/${tool.category}`}
            className="capitalize hover:text-fg"
          >
            {tool.category} tools
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-fg">{tool.shortLabel}</span>
        </nav>
        <div className="mt-4 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {tool.title}
            </h1>
            <p className="mt-3 max-w-3xl text-base text-fg-muted">
              {tool.description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
