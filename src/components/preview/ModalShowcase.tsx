import { X } from "lucide-react";

export function PreviewModalShowcase() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-6"
      style={{
        background: "var(--preview-surface-muted)",
        borderColor: "var(--preview-border)",
      }}
    >
      <div
        className="mx-auto max-w-md rounded-2xl border p-6 shadow-xl"
        style={{
          background: "var(--preview-bg)",
          borderColor: "var(--preview-border)",
          color: "var(--preview-fg)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            style={{
              fontFamily: "var(--preview-font-heading)",
              fontSize: "var(--preview-h4-size)",
              lineHeight: "var(--preview-h4-lh)",
              fontWeight: "var(--preview-h4-weight)",
            }}
          >
            Export this palette?
          </h3>
          <button
            className="-mt-1 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--preview-muted)" }}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p
          className="mt-2"
          style={{
            fontFamily: "var(--preview-font-body)",
            fontSize: "var(--preview-body-size)",
            lineHeight: "var(--preview-body-lh)",
            color: "var(--preview-muted)",
          }}
        >
          We&apos;ll generate a Kadence-compatible JSON file you can import
          into your theme&apos;s global palette settings.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            className="h-10 rounded-lg border px-4 transition-opacity hover:opacity-80"
            style={{
              background: "transparent",
              borderColor: "var(--preview-border)",
              color: "var(--preview-fg)",
              fontFamily: "var(--preview-font-body)",
              fontWeight: "var(--preview-button-weight)",
            }}
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-lg px-4 transition-opacity hover:opacity-90"
            style={{
              background: "var(--preview-primary)",
              color: "var(--preview-primary-fg)",
              fontFamily: "var(--preview-font-body)",
              fontWeight: "var(--preview-button-weight)",
            }}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
