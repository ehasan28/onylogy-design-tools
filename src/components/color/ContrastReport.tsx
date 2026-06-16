"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { useColorStore } from "@/stores/color-store";
import {
  contrastRatioHex,
  bestForeground,
  wcagBadges,
} from "@/lib/color/contrast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

interface Pair {
  label: string;
  description: string;
  fg: string;
  bg: string;
}

export function ContrastReport() {
  const semantic = useColorStore((s) => s.semantic);

  const pairs: Pair[] = useMemo(() => {
    return [
      {
        label: "Foreground on background",
        description: "Body text on page background",
        fg: semantic.foreground,
        bg: semantic.background,
      },
      {
        label: "Foreground on surface",
        description: "Body text on card surfaces",
        fg: semantic.foreground,
        bg: semantic.surface,
      },
      {
        label: "Muted on background",
        description: "Secondary text and captions",
        fg: semantic.muted,
        bg: semantic.background,
      },
      {
        label: "Button text on primary",
        description: "Primary CTA button label",
        fg: bestForeground(semantic.primary),
        bg: semantic.primary,
      },
      {
        label: "Button text on accent",
        description: "Accent button label",
        fg: bestForeground(semantic.accent),
        bg: semantic.accent,
      },
      {
        label: "Destructive on background",
        description: "Inline destructive text",
        fg: semantic.destructive,
        bg: semantic.background,
      },
    ];
  }, [semantic]);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-sm font-semibold text-fg">
            Accessibility report
          </h3>
          <p className="text-xs text-fg-muted">
            Each pair is scored against WCAG AA and AAA for normal and large
            text.
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {pairs.map((pair) => {
          const ratio = contrastRatioHex(pair.fg, pair.bg);
          const badges = wcagBadges(ratio);
          return (
            <li
              key={pair.label}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-bg-elev/40 p-3"
            >
              <div
                className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg text-sm font-medium"
                style={{ background: pair.bg, color: pair.fg }}
              >
                Aa
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-fg">
                  {pair.label}
                </div>
                <div className="text-xs text-fg-muted">{pair.description}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-base font-semibold text-fg tabular">
                  {badges.ratio.toFixed(2)}:1
                </span>
                <div className="flex flex-wrap gap-1">
                  <ResultBadge label="AA" passed={badges.aaNormal} />
                  <ResultBadge
                    label="AA Large"
                    passed={badges.aaLarge}
                    variant="muted"
                  />
                  <ResultBadge label="AAA" passed={badges.aaaNormal} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ResultBadge({
  label,
  passed,
  variant = "default",
}: {
  label: string;
  passed: boolean;
  variant?: "default" | "muted";
}) {
  return (
    <Badge
      variant={passed ? "ok" : "bad"}
      className={cn(variant === "muted" && "opacity-80")}
    >
      {passed ? (
        <Check className="h-2.5 w-2.5" />
      ) : (
        <X className="h-2.5 w-2.5" />
      )}
      {label}
    </Badge>
  );
}
