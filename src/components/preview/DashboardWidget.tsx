import { TrendingUp, Users, Eye } from "lucide-react";

const METRICS = [
  {
    id: "revenue",
    label: "Revenue",
    value: "$24,318",
    delta: "+18%",
    Icon: TrendingUp,
    deltaColor: "var(--preview-success)",
  },
  {
    id: "members",
    label: "New members",
    value: "1,284",
    delta: "+6.2%",
    Icon: Users,
    deltaColor: "var(--preview-success)",
  },
  {
    id: "views",
    label: "Page views",
    value: "318k",
    delta: "-3.4%",
    Icon: Eye,
    deltaColor: "var(--preview-destructive)",
  },
];

export function PreviewDashboardWidget() {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
        fontFamily: "var(--preview-font-body)",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            style={{
              fontFamily: "var(--preview-font-heading)",
              fontSize: "var(--preview-h4-size)",
              fontWeight: "var(--preview-h4-weight)",
            }}
          >
            This week
          </h3>
          <p
            style={{
              fontSize: "var(--preview-caption-size)",
              color: "var(--preview-muted)",
            }}
          >
            Compared to the previous 7 days.
          </p>
        </div>
        <button
          className="h-8 rounded-md border px-3 text-xs font-medium transition-opacity hover:opacity-80"
          style={{
            background: "var(--preview-surface-muted)",
            borderColor: "var(--preview-border)",
            color: "var(--preview-fg)",
          }}
        >
          Last 7 days
        </button>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {METRICS.map((m) => {
          const Icon = m.Icon;
          return (
            <div
              key={m.id}
              className="rounded-xl border p-4"
              style={{
                background: "var(--preview-bg)",
                borderColor: "var(--preview-border)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--preview-muted)" }}
                >
                  {m.label}
                </span>
                <Icon
                  className="h-4 w-4"
                  style={{ color: "var(--preview-muted)" }}
                />
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "var(--preview-font-heading)",
                  fontSize: "var(--preview-h3-size)",
                  fontWeight: "var(--preview-h3-weight)",
                  letterSpacing: "var(--preview-h3-ls)",
                }}
              >
                {m.value}
              </div>
              <span
                className="mt-2 inline-flex items-center gap-1 text-xs"
                style={{ color: m.deltaColor, fontWeight: 500 }}
              >
                {m.delta}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
