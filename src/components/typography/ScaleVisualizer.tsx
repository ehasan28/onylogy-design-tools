"use client";

import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useTypographyStore } from "@/stores/typography-store";
import type { ScaleStep } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function ScaleVisualizer() {
  const steps = useTypographyStore((s) => s.steps);
  const pair = useTypographyStore((s) => s.pair);
  const overrides = useTypographyStore((s) => s.overrides);
  const resetAllOverrides = useTypographyStore((s) => s.resetAllOverrides);
  const hasOverrides = Object.keys(overrides).length > 0;

  return (
    <section className="rounded-2xl border border-line bg-bg-elev/40 p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg">Modular scale</h3>
        <div className="flex items-center gap-3">
          {hasOverrides && (
            <button
              type="button"
              onClick={resetAllOverrides}
              className="inline-flex items-center gap-1 text-xs text-fg-muted hover:text-fg"
            >
              <RotateCcw className="h-3 w-3" /> Reset overrides
            </button>
          )}
          <span className="text-xs text-fg-muted">
            {steps.length} steps · base{" "}
            {Math.round(steps.find((s) => s.role === "body")?.fontSizePx ?? 16)}px
          </span>
        </div>
      </div>
      <ul className="mt-3 divide-y divide-line">
        {steps.map((step) => {
          const isHeading =
            step.role.startsWith("h") || step.role === "blockquote";
          const family = isHeading
            ? `'${pair.heading.family}', ${pair.heading.fallback}`
            : `'${pair.body.family}', ${pair.body.fallback}`;
          const edited = Boolean(overrides[step.role]);
          return (
            <li
              key={step.role}
              className="flex flex-wrap items-baseline justify-between gap-3 py-3"
            >
              <span
                className="min-w-0 flex-1 truncate text-fg"
                style={{
                  fontFamily: family,
                  fontSize: step.fontSizeRem,
                  lineHeight: step.lineHeight,
                  fontWeight: step.fontWeight,
                  letterSpacing:
                    step.letterSpacingEm === 0
                      ? "0"
                      : `${step.letterSpacingEm}em`,
                }}
              >
                {labelFor(step.role)}
              </span>
              <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tabular text-fg-muted">
                {edited && (
                  <span className="rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent">
                    edited
                  </span>
                )}
                {step.role.toUpperCase()} · {step.fontSizePx.toFixed(2)}px
                <StepEditor step={step} />
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StepEditor({ step }: { step: ScaleStep }) {
  const setOverride = useTypographyStore((s) => s.setOverride);
  const resetOverride = useTypographyStore((s) => s.resetOverride);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Edit ${step.role}`}
          className="rounded p-1 text-fg-dim transition-colors hover:bg-bg-elev hover:text-fg"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-3 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-fg-dim">
          {step.role} override
        </div>
        <Row label={`Size ${step.fontSizePx.toFixed(1)}px`}>
          <Slider
            value={[step.fontSizePx]}
            min={8}
            max={120}
            step={0.5}
            onValueChange={(v) => setOverride(step.role, { fontSizePx: v[0] })}
          />
        </Row>
        <Row label={`Line height ${step.lineHeight.toFixed(2)}`}>
          <Slider
            value={[step.lineHeight]}
            min={0.9}
            max={2}
            step={0.01}
            onValueChange={(v) => setOverride(step.role, { lineHeight: v[0] })}
          />
        </Row>
        <Row label={`Weight ${step.fontWeight}`}>
          <Slider
            value={[step.fontWeight]}
            min={100}
            max={900}
            step={100}
            onValueChange={(v) => setOverride(step.role, { fontWeight: v[0] })}
          />
        </Row>
        <Row label={`Letter spacing ${step.letterSpacingEm.toFixed(3)}em`}>
          <Slider
            value={[step.letterSpacingEm]}
            min={-0.05}
            max={0.1}
            step={0.005}
            onValueChange={(v) =>
              setOverride(step.role, { letterSpacingEm: v[0] })
            }
          />
        </Row>
        <Button
          variant="ghost"
          size="sm"
          className="w-full gap-1.5"
          onClick={() => resetOverride(step.role)}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset this step
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-[11px] text-fg-muted">{label}</div>
      {children}
    </div>
  );
}

function labelFor(role: string): string {
  if (role.startsWith("h")) return `${role.toUpperCase()} — Display heading`;
  if (role === "body") return "Body — the quick brown fox jumps over";
  if (role === "caption") return "Caption — supporting text";
  if (role === "button") return "Button — Get started";
  if (role === "link") return "Link — Read more";
  if (role === "blockquote") return "“ A pull quote, set in italic. ”";
  return role;
}
