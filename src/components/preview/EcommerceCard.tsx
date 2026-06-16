import { Star, ShoppingBag } from "lucide-react";

export function PreviewEcommerceCard() {
  return (
    <article
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
      }}
    >
      <div
        className="relative flex h-44 items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 20%, var(--preview-accent), transparent 70%), var(--preview-surface-muted)`,
        }}
      >
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
          style={{
            background: "var(--preview-destructive)",
            color: "#ffffff",
            fontFamily: "var(--preview-font-body)",
          }}
        >
          -25%
        </span>
        <span
          className="inline-flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
          }}
        >
          <ShoppingBag className="h-8 w-8" />
        </span>
      </div>
      <div className="p-4">
        <div
          className="flex items-center gap-1"
          style={{ color: "var(--preview-warning)" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
          <Star className="h-3 w-3 fill-current opacity-30" />
          <span
            className="ml-1 text-xs"
            style={{ color: "var(--preview-muted)" }}
          >
            4.2 (212)
          </span>
        </div>
        <h3
          className="mt-2"
          style={{
            fontFamily: "var(--preview-font-heading)",
            fontSize: "var(--preview-h5-size)",
            lineHeight: "var(--preview-h5-lh)",
            fontWeight: "var(--preview-h5-weight)",
            letterSpacing: "var(--preview-h5-ls)",
          }}
        >
          Studio Tote — Slate
        </h3>
        <div
          className="mt-1 flex items-baseline gap-2"
          style={{ fontFamily: "var(--preview-font-body)" }}
        >
          <span
            className="font-semibold"
            style={{
              fontSize: "var(--preview-h4-size)",
              color: "var(--preview-fg)",
            }}
          >
            $89
          </span>
          <span
            className="line-through opacity-50"
            style={{
              fontSize: "var(--preview-caption-size)",
              color: "var(--preview-muted)",
            }}
          >
            $119
          </span>
        </div>
        <button
          className="mt-4 h-10 w-full rounded-lg transition-opacity hover:opacity-90"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
            fontFamily: "var(--preview-font-body)",
            fontWeight: "var(--preview-button-weight)",
            fontSize: "var(--preview-button-size)",
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
