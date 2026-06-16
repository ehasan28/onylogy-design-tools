import { ArrowRight, Plus, Trash2 } from "lucide-react";

const SIZES = [
  { id: "sm", label: "Small", height: "h-8", px: "px-3", textSize: "0.8125rem" },
  { id: "md", label: "Default", height: "h-10", px: "px-4", textSize: "0.875rem" },
  { id: "lg", label: "Large", height: "h-12", px: "px-5", textSize: "1rem" },
];

const VARIANTS: Array<{
  id: string;
  label: string;
  bg: string;
  fg: string;
  border?: string;
}> = [
  {
    id: "primary",
    label: "Primary",
    bg: "var(--preview-primary)",
    fg: "var(--preview-primary-fg)",
  },
  {
    id: "secondary",
    label: "Secondary",
    bg: "var(--preview-secondary)",
    fg: "var(--preview-secondary-fg)",
  },
  {
    id: "accent",
    label: "Accent",
    bg: "var(--preview-accent)",
    fg: "var(--preview-accent-fg)",
  },
  {
    id: "outline",
    label: "Outline",
    bg: "transparent",
    fg: "var(--preview-fg)",
    border: "var(--preview-border)",
  },
  {
    id: "ghost",
    label: "Ghost",
    bg: "var(--preview-surface-muted)",
    fg: "var(--preview-fg)",
  },
  {
    id: "destructive",
    label: "Destructive",
    bg: "var(--preview-destructive)",
    fg: "#ffffff",
  },
];

export function PreviewButtonShowcase() {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--preview-font-heading)",
          fontSize: "var(--preview-h4-size)",
          lineHeight: "var(--preview-h4-lh)",
          fontWeight: "var(--preview-h4-weight)",
          letterSpacing: "var(--preview-h4-ls)",
        }}
      >
        Buttons
      </h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <button
            key={variant.id}
            className="inline-flex h-10 items-center gap-2 rounded-lg px-4 transition-opacity hover:opacity-90"
            style={{
              background: variant.bg,
              color: variant.fg,
              border: variant.border
                ? `1px solid ${variant.border}`
                : undefined,
              fontFamily: "var(--preview-font-body)",
              fontSize: "var(--preview-button-size)",
              fontWeight: "var(--preview-button-weight)",
              letterSpacing: "var(--preview-button-ls)",
            }}
          >
            {variant.id === "destructive" ? (
              <Trash2 className="h-4 w-4" />
            ) : variant.id === "primary" ? (
              <Plus className="h-4 w-4" />
            ) : null}
            {variant.label}
            {variant.id === "secondary" && (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-end gap-3">
        {SIZES.map((size) => (
          <button
            key={size.id}
            className={`inline-flex items-center rounded-lg transition-opacity hover:opacity-90 ${size.height} ${size.px}`}
            style={{
              background: "var(--preview-primary)",
              color: "var(--preview-primary-fg)",
              fontFamily: "var(--preview-font-body)",
              fontSize: size.textSize,
              fontWeight: "var(--preview-button-weight)",
            }}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
