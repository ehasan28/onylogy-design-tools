import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    description: "For solo creators just getting going.",
    features: ["1 project", "Community support", "Public exports"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Studio",
    price: "$19",
    description: "For freelancers shipping client work.",
    features: [
      "Unlimited projects",
      "Custom palette presets",
      "Kadence + Tailwind export",
      "Email support",
    ],
    cta: "Start trial",
    featured: true,
  },
  {
    name: "Agency",
    price: "$49",
    description: "Teams shipping at scale.",
    features: [
      "Multi-seat workspace",
      "Brand templates",
      "Audit history",
      "Priority support",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export function PreviewPricingCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className="flex flex-col rounded-2xl border p-6"
          style={{
            background: plan.featured
              ? "var(--preview-primary)"
              : "var(--preview-surface)",
            color: plan.featured
              ? "var(--preview-primary-fg)"
              : "var(--preview-fg)",
            borderColor: plan.featured
              ? "transparent"
              : "var(--preview-border)",
          }}
        >
          <div
            className="text-xs uppercase tracking-wider"
            style={{
              opacity: 0.7,
              fontFamily: "var(--preview-font-body)",
            }}
          >
            {plan.name}
          </div>
          <div
            className="mt-3 flex items-baseline gap-1"
            style={{
              fontFamily: "var(--preview-font-heading)",
            }}
          >
            <span
              style={{
                fontSize: "var(--preview-h2-size)",
                lineHeight: "var(--preview-h2-lh)",
                fontWeight: "var(--preview-h2-weight)",
                letterSpacing: "var(--preview-h2-ls)",
              }}
            >
              {plan.price}
            </span>
            <span style={{ opacity: 0.7, fontSize: "0.95rem" }}>/mo</span>
          </div>
          <p
            className="mt-2"
            style={{
              fontSize: "var(--preview-caption-size)",
              lineHeight: "var(--preview-caption-lh)",
              opacity: 0.85,
              fontFamily: "var(--preview-font-body)",
            }}
          >
            {plan.description}
          </p>
          <ul
            className="mt-6 space-y-2.5"
            style={{
              fontSize: "var(--preview-body-size)",
              fontFamily: "var(--preview-font-body)",
            }}
          >
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2"
                style={{
                  opacity: 0.9,
                }}
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{
                    color: plan.featured
                      ? "var(--preview-primary-fg)"
                      : "var(--preview-primary)",
                  }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className="mt-8 h-10 rounded-lg transition-opacity hover:opacity-90"
            style={{
              background: plan.featured
                ? "var(--preview-primary-fg)"
                : "var(--preview-primary)",
              color: plan.featured
                ? "var(--preview-primary)"
                : "var(--preview-primary-fg)",
              fontWeight: "var(--preview-button-weight)",
              fontFamily: "var(--preview-font-body)",
              fontSize: "var(--preview-button-size)",
            }}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
