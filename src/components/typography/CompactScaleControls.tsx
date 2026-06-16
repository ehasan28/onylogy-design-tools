"use client";

import { useTypographyStore } from "@/stores/typography-store";
import { KNOWN_RATIOS } from "@/lib/typography/scale";
import { cn } from "@/lib/utils/cn";

/**
 * Compact scale controls for the top bar: base size stepper + ratio chips.
 */
export function CompactScaleControls() {
  const basePx = useTypographyStore((s) => s.basePx);
  const setBasePx = useTypographyStore((s) => s.setBasePx);
  const ratio = useTypographyStore((s) => s.ratio);
  const setRatio = useTypographyStore((s) => s.setRatio);

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
          Base
        </span>
        <div className="inline-flex h-8 items-center rounded-full border border-line bg-bg-elev">
          <button
            type="button"
            onClick={() => setBasePx(Math.max(12, basePx - 1))}
            aria-label="Decrease base size"
            className="flex h-7 w-7 items-center justify-center rounded-l-full text-fg-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
          >
            −
          </button>
          <span className="px-2 font-mono text-xs tabular text-fg">
            {basePx}px
          </span>
          <button
            type="button"
            onClick={() => setBasePx(Math.min(22, basePx + 1))}
            aria-label="Increase base size"
            className="flex h-7 w-7 items-center justify-center rounded-r-full text-fg-muted transition-colors hover:bg-bg-elev-2 hover:text-fg"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
          Ratio
        </span>
        <div className="flex shrink-0 items-center gap-1">
          {KNOWN_RATIOS.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setRatio(r.value, r.name)}
              title={r.name.replace("-", " ")}
              className={cn(
                "inline-flex h-8 shrink-0 items-center rounded-full px-3 font-mono text-xs tabular transition-colors",
                Math.abs(ratio - r.value) < 0.005
                  ? "bg-accent text-white"
                  : "bg-bg-elev text-fg-muted hover:bg-bg-elev-2 hover:text-fg",
              )}
            >
              {r.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
