import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const ALERTS = [
  {
    id: "info",
    title: "New feature available",
    body: "Clamp() generator now supports custom viewport ranges.",
    bg: "var(--preview-accent)",
    fg: "var(--preview-accent-fg)",
    icon: Info,
  },
  {
    id: "success",
    title: "Palette saved",
    body: "Your design tokens are ready to export.",
    bg: "var(--preview-success)",
    fg: "#ffffff",
    icon: CheckCircle2,
  },
  {
    id: "warning",
    title: "Low contrast",
    body: "AA contrast falls below 4.5:1 for body text on this surface.",
    bg: "var(--preview-warning)",
    fg: "#ffffff",
    icon: AlertTriangle,
  },
  {
    id: "error",
    title: "Export failed",
    body: "The palette format could not be generated. Try again.",
    bg: "var(--preview-destructive)",
    fg: "#ffffff",
    icon: XCircle,
  },
];

const BADGES = [
  { label: "Primary", bg: "var(--preview-primary)", fg: "var(--preview-primary-fg)" },
  { label: "Accent", bg: "var(--preview-accent)", fg: "var(--preview-accent-fg)" },
  { label: "Success", bg: "var(--preview-success)", fg: "#ffffff" },
  { label: "Warning", bg: "var(--preview-warning)", fg: "#ffffff" },
  { label: "Error", bg: "var(--preview-destructive)", fg: "#ffffff" },
];

export function PreviewAlertsBadges() {
  return (
    <div
      className="space-y-5 rounded-2xl border p-6"
      style={{
        background: "var(--preview-surface)",
        borderColor: "var(--preview-border)",
        color: "var(--preview-fg)",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "var(--preview-font-heading)",
            fontSize: "var(--preview-h4-size)",
            lineHeight: "var(--preview-h4-lh)",
            fontWeight: "var(--preview-h4-weight)",
          }}
        >
          Alerts
        </h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {ALERTS.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className="flex gap-3 rounded-xl p-3"
                style={{ background: alert.bg, color: alert.fg }}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--preview-font-body)",
                      fontWeight: 600,
                    }}
                  >
                    {alert.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--preview-font-body)",
                      fontSize: "var(--preview-caption-size)",
                      lineHeight: "var(--preview-caption-lh)",
                      opacity: 0.9,
                    }}
                  >
                    {alert.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3
          style={{
            fontFamily: "var(--preview-font-heading)",
            fontSize: "var(--preview-h4-size)",
            fontWeight: "var(--preview-h4-weight)",
          }}
        >
          Badges
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs"
              style={{
                background: b.bg,
                color: b.fg,
                fontFamily: "var(--preview-font-body)",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
