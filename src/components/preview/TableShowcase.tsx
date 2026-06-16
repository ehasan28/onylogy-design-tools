const ROWS = [
  {
    name: "Aria Hart",
    email: "aria@studio.com",
    plan: "Studio",
    status: "Active",
    color: "var(--preview-success)",
  },
  {
    name: "Marcus Lee",
    email: "marcus@agency.io",
    plan: "Agency",
    status: "Trial",
    color: "var(--preview-warning)",
  },
  {
    name: "Sofia Reyes",
    email: "sofia@studio.com",
    plan: "Starter",
    status: "Active",
    color: "var(--preview-success)",
  },
  {
    name: "Theo Hall",
    email: "theo@archive.dev",
    plan: "Studio",
    status: "Past due",
    color: "var(--preview-destructive)",
  },
];

export function PreviewTableShowcase() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
        fontFamily: "var(--preview-font-body)",
      }}
    >
      <div className="flex items-center justify-between p-5">
        <div>
          <h3
            style={{
              fontFamily: "var(--preview-font-heading)",
              fontSize: "var(--preview-h4-size)",
              fontWeight: "var(--preview-h4-weight)",
            }}
          >
            Members
          </h3>
          <p
            style={{
              fontSize: "var(--preview-caption-size)",
              color: "var(--preview-muted)",
            }}
          >
            Workspace seats and billing status.
          </p>
        </div>
        <button
          className="h-9 rounded-lg px-4 transition-opacity hover:opacity-90"
          style={{
            background: "var(--preview-primary)",
            color: "var(--preview-primary-fg)",
            fontWeight: "var(--preview-button-weight)",
            fontSize: "var(--preview-button-size)",
          }}
        >
          Invite
        </button>
      </div>
      <table className="w-full text-sm">
        <thead
          className="text-left"
          style={{
            background: "var(--preview-surface-muted)",
            color: "var(--preview-muted)",
          }}
        >
          <tr>
            <Th>Name</Th>
            <Th>Plan</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, idx) => (
            <tr
              key={row.email}
              style={{
                borderTop: `1px solid var(--preview-border)`,
                background:
                  idx % 2 === 0 ? "transparent" : "var(--preview-surface-muted)",
              }}
            >
              <td className="px-5 py-3">
                <div style={{ fontWeight: 500 }}>{row.name}</div>
                <div
                  className="text-xs"
                  style={{ color: "var(--preview-muted)" }}
                >
                  {row.email}
                </div>
              </td>
              <td className="px-5 py-3">{row.plan}</td>
              <td className="px-5 py-3">
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ color: row.color }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: row.color }}
                  />
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-5 py-2 text-[10px] font-semibold uppercase tracking-wider"
      style={{ fontFamily: "var(--preview-font-body)" }}
    >
      {children}
    </th>
  );
}
