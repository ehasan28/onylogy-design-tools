import { Clock, Tag } from "lucide-react";

export function PreviewBlogCard() {
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
        className="h-40 w-full"
        style={{
          background: `linear-gradient(135deg, var(--preview-primary), var(--preview-accent))`,
        }}
      />
      <div className="p-5">
        <div
          className="flex items-center gap-3 text-xs"
          style={{ color: "var(--preview-muted)" }}
        >
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: "var(--preview-surface-muted)",
            }}
          >
            <Tag className="h-3 w-3" /> Design Systems
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> 6 min read
          </span>
        </div>
        <h3
          className="mt-3"
          style={{
            fontFamily: "var(--preview-font-heading)",
            fontSize: "var(--preview-h3-size)",
            lineHeight: "var(--preview-h3-lh)",
            fontWeight: "var(--preview-h3-weight)",
            letterSpacing: "var(--preview-h3-ls)",
          }}
        >
          How to design a color system your team will actually use
        </h3>
        <p
          className="mt-2"
          style={{
            fontFamily: "var(--preview-font-body)",
            fontSize: "var(--preview-body-size)",
            lineHeight: "var(--preview-body-lh)",
            color: "var(--preview-muted)",
          }}
        >
          Semantic tokens, accessibility budgets, and the right amount of
          flexibility. A field guide for product teams.
        </p>
        <div
          className="mt-5 flex items-center gap-3 text-sm"
          style={{ fontFamily: "var(--preview-font-body)" }}
        >
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs"
            style={{
              background: "var(--preview-primary)",
              color: "var(--preview-primary-fg)",
            }}
          >
            JD
          </span>
          <div>
            <div style={{ fontWeight: 500 }}>Jordan Diaz</div>
            <div
              className="text-xs"
              style={{ color: "var(--preview-muted)" }}
            >
              Today
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
