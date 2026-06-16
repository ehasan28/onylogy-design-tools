export function PreviewFormShowcase() {
  return (
    <form
      className="rounded-2xl border p-6"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
      }}
      onSubmit={(e) => e.preventDefault()}
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
        Create your account
      </h3>
      <p
        className="mt-1"
        style={{
          fontSize: "var(--preview-caption-size)",
          color: "var(--preview-muted)",
          fontFamily: "var(--preview-font-body)",
        }}
      >
        Free forever — no credit card required.
      </p>
      <div className="mt-5 grid gap-3">
        <Field label="Full name" placeholder="Aria Hart" />
        <Field label="Work email" placeholder="aria@studio.com" type="email" />
        <Field label="Password" placeholder="••••••••" type="password" />
      </div>
      <button
        type="submit"
        className="mt-5 h-10 w-full rounded-lg transition-opacity hover:opacity-90"
        style={{
          background: "var(--preview-primary)",
          color: "var(--preview-primary-fg)",
          fontFamily: "var(--preview-font-body)",
          fontWeight: "var(--preview-button-weight)",
          fontSize: "var(--preview-button-size)",
        }}
      >
        Create account
      </button>
      <p
        className="mt-3 text-center"
        style={{
          fontSize: "var(--preview-caption-size)",
          color: "var(--preview-muted)",
          fontFamily: "var(--preview-font-body)",
        }}
      >
        Already have an account?{" "}
        <a
          href="#"
          style={{
            color: "var(--preview-accent)",
            fontWeight: 500,
          }}
        >
          Sign in
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span
        className="text-xs"
        style={{
          color: "var(--preview-muted)",
          fontFamily: "var(--preview-font-body)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-lg border px-3 outline-none transition-colors"
        style={{
          background: "var(--preview-bg)",
          borderColor: "var(--preview-border)",
          color: "var(--preview-fg)",
          fontFamily: "var(--preview-font-body)",
          fontSize: "var(--preview-body-size)",
        }}
      />
    </label>
  );
}
