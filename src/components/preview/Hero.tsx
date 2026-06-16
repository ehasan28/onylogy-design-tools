import { ArrowRight } from "lucide-react";

export function PreviewHero() {
  return (
    <section
      className="rounded-2xl px-8 py-14 text-center"
      style={{
        background: "var(--preview-surface)",
        color: "var(--preview-fg)",
      }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-xs"
        style={{
          background: "var(--preview-surface-muted)",
          color: "var(--preview-muted)",
          fontFamily: "var(--preview-font-body)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        New · Live preview kit
      </span>
      <h1
        className="mx-auto mt-5 max-w-2xl text-balance"
        style={{
          fontFamily: "var(--preview-font-heading)",
          fontSize: "var(--preview-h1-size)",
          lineHeight: "var(--preview-h1-lh)",
          fontWeight: "var(--preview-h1-weight)",
          letterSpacing: "var(--preview-h1-ls)",
        }}
      >
        Design the system, ship the product.
      </h1>
      <p
        className="mx-auto mt-4 max-w-xl text-pretty"
        style={{
          fontFamily: "var(--preview-font-body)",
          fontSize: "var(--preview-body-size)",
          lineHeight: "var(--preview-body-lh)",
          color: "var(--preview-muted)",
        }}
      >
        Build palettes, font systems, and exportable design tokens with
        realistic UI previews. Free for WordPress, Kadence, Gutenberg, and
        Tailwind creators.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          className="inline-flex h-11 items-center gap-2 rounded-lg px-5 transition-opacity hover:opacity-90"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
            fontWeight: "var(--preview-button-weight)",
            fontFamily: "var(--preview-font-body)",
            fontSize: "var(--preview-button-size)",
          }}
        >
          Get started <ArrowRight className="h-4 w-4" />
        </button>
        <button
          className="inline-flex h-11 items-center gap-2 rounded-lg border px-5 transition-opacity hover:opacity-80"
          style={{
            borderColor: "var(--preview-border)",
            background: "transparent",
            color: "var(--preview-fg)",
            fontWeight: "var(--preview-button-weight)",
            fontFamily: "var(--preview-font-body)",
            fontSize: "var(--preview-button-size)",
          }}
        >
          See pricing
        </button>
      </div>
    </section>
  );
}
