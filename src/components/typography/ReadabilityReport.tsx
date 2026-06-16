"use client";

import { useMemo } from "react";
import { Check, AlertTriangle, Info } from "lucide-react";
import { useTypographyStore } from "@/stores/typography-store";
import { evaluateReadability } from "@/lib/typography/readability";
import { Badge } from "@/components/ui/badge";

export function ReadabilityReport({ containerWidthPx = 720 }: { containerWidthPx?: number }) {
  const steps = useTypographyStore((s) => s.steps);
  const pair = useTypographyStore((s) => s.pair);

  const issues = useMemo(() => {
    const body = steps.find((s) => s.role === "body");
    const caption = steps.find((s) => s.role === "caption");
    if (!body) return [];
    return evaluateReadability({
      bodyPx: body.fontSizePx,
      captionPx: caption?.fontSizePx ?? 12,
      bodyLineHeight: body.lineHeight,
      containerWidthPx,
      bodyFamily: pair.body.family,
    });
  }, [steps, pair, containerWidthPx]);

  return (
    <section className="rounded-2xl border border-line bg-bg-elev/40 p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold text-fg">Readability</h3>
          <p className="text-xs text-fg-muted">
            Backed by WCAG 2.1 and Bringhurst typographic thresholds.
          </p>
        </div>
        {issues.length === 0 ? (
          <Badge variant="ok">
            <Check className="h-3 w-3" /> All clear
          </Badge>
        ) : (
          <Badge variant="warn">
            <AlertTriangle className="h-3 w-3" /> {issues.length} suggestion{issues.length === 1 ? "" : "s"}
          </Badge>
        )}
      </div>
      {issues.length === 0 ? (
        <p className="mt-4 text-sm text-fg-muted">
          No issues detected. Body, caption, and line metrics fall within the
          recommended thresholds.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="flex gap-3 rounded-xl border border-line bg-bg p-3"
            >
              <span className="mt-0.5 shrink-0">
                {issue.severity === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-warn" />
                ) : (
                  <Info className="h-4 w-4 text-fg-muted" />
                )}
              </span>
              <div>
                <div className="text-sm font-medium text-fg">
                  {issue.message}
                </div>
                <div className="mt-1 text-xs text-fg-muted">
                  {issue.suggestion}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
