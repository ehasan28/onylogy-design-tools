"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useTypographyStore } from "@/stores/typography-store";
import { KNOWN_RATIOS } from "@/lib/typography/scale";
import { cn } from "@/lib/utils/cn";

export function ScaleControls() {
  const basePx = useTypographyStore((s) => s.basePx);
  const setBasePx = useTypographyStore((s) => s.setBasePx);
  const ratio = useTypographyStore((s) => s.ratio);
  const setRatio = useTypographyStore((s) => s.setRatio);

  return (
    <section className="space-y-5 rounded-xl border border-line bg-bg-elev/40 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Base size</Label>
          <span className="font-mono text-xs tabular text-fg">
            {basePx}px / {(basePx / 16).toFixed(3)}rem
          </span>
        </div>
        <Slider
          value={[basePx]}
          min={12}
          max={22}
          step={1}
          onValueChange={(v) => setBasePx(v[0] ?? 16)}
        />
      </div>
      <div className="space-y-2">
        <Label>Ratio</Label>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {KNOWN_RATIOS.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setRatio(r.value, r.name)}
              className={cn(
                "rounded-md border px-2 py-1.5 text-xs transition-colors",
                Math.abs(ratio - r.value) < 0.005
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-bg text-fg-muted hover:bg-bg-elev hover:text-fg",
              )}
            >
              <span className="block font-mono tabular">{r.value}</span>
              <span className="block text-[10px] uppercase tracking-wider">
                {r.name.replace("-", " ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
