import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedTools } from "@/lib/seo/tool-meta";

export function RelatedTools({ slug }: { slug: string }) {
  const related = getRelatedTools(slug, 3);
  if (related.length === 0) return null;
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight text-fg">
          Keep exploring
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-line bg-bg-elev/40 p-5 transition-colors hover:bg-bg-elev"
            >
              <span className="text-[10px] uppercase tracking-wider text-fg-dim">
                {tool.category}
              </span>
              <span className="text-base font-medium text-fg">
                {tool.shortLabel}
              </span>
              <span className="text-sm text-fg-muted">{tool.description}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-1">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
