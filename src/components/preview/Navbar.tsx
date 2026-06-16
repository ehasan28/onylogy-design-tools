import { Sparkles, Search } from "lucide-react";

export function PreviewNavbar() {
  return (
    <nav
      className="flex items-center justify-between gap-4 rounded-xl border px-5 py-3"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
          }}
        >
          <Sparkles className="h-4 w-4" />
        </span>
        <span
          style={{
            fontFamily: "var(--preview-font-heading)",
            fontWeight: "var(--preview-h5-weight)",
            letterSpacing: "var(--preview-h5-ls)",
          }}
        >
          Acme Studio
        </span>
      </div>
      <div className="hidden items-center gap-5 text-sm sm:flex">
        {["Product", "Pricing", "Docs", "Blog"].map((label) => (
          <a
            key={label}
            href="#"
            style={{
              color: "var(--preview-muted)",
              fontWeight: 500,
              fontFamily: "var(--preview-font-body)",
            }}
            className="hover:underline"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="hidden h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 sm:inline-flex"
          style={{
            background: "var(--preview-surface-muted)",
            color: "var(--preview-muted)",
          }}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          className="h-8 rounded-lg px-3 text-sm transition-opacity hover:opacity-90"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
            fontWeight: "var(--preview-button-weight)",
            fontFamily: "var(--preview-font-body)",
            fontSize: "var(--preview-button-size)",
          }}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}
