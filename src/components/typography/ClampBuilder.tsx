"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { clampLine } from "@/lib/exporters/typography/clamp";
import { CopyButton } from "@/components/shared/CopyButton";

interface ClampState {
  minPx: number;
  maxPx: number;
  vMin: number;
  vMax: number;
}

export function ClampBuilder({
  defaults = { minPx: 18, maxPx: 32, vMin: 320, vMax: 1440 },
}: {
  defaults?: ClampState;
}) {
  const [state, setState] = useState<ClampState>(defaults);
  const clamp = useMemo(
    () => clampLine(state.minPx, state.maxPx, state.vMin, state.vMax),
    [state],
  );
  const declaration = `font-size: ${clamp};`;

  return (
    <section className="space-y-5 rounded-2xl border border-line bg-bg-elev/40 p-5">
      <div>
        <h3 className="text-sm font-semibold text-fg">Clamp builder</h3>
        <p className="text-xs text-fg-muted">
          Configure min/max size and viewport — get a one-line clamp() value.
        </p>
      </div>
      <ControlRow
        label="Min size"
        value={`${state.minPx}px`}
        slider={
          <Slider
            value={[state.minPx]}
            min={10}
            max={48}
            step={1}
            onValueChange={(v) =>
              setState((s) => ({ ...s, minPx: v[0] ?? s.minPx }))
            }
          />
        }
      />
      <ControlRow
        label="Max size"
        value={`${state.maxPx}px`}
        slider={
          <Slider
            value={[state.maxPx]}
            min={20}
            max={120}
            step={1}
            onValueChange={(v) =>
              setState((s) => ({ ...s, maxPx: v[0] ?? s.maxPx }))
            }
          />
        }
      />
      <ControlRow
        label="Min viewport"
        value={`${state.vMin}px`}
        slider={
          <Slider
            value={[state.vMin]}
            min={280}
            max={640}
            step={10}
            onValueChange={(v) =>
              setState((s) => ({ ...s, vMin: v[0] ?? s.vMin }))
            }
          />
        }
      />
      <ControlRow
        label="Max viewport"
        value={`${state.vMax}px`}
        slider={
          <Slider
            value={[state.vMax]}
            min={900}
            max={1920}
            step={20}
            onValueChange={(v) =>
              setState((s) => ({ ...s, vMax: v[0] ?? s.vMax }))
            }
          />
        }
      />
      <div className="space-y-2">
        <Label>Output</Label>
        <div className="flex items-center gap-2">
          <code className="flex-1 truncate rounded-md border border-line bg-bg p-2 font-mono text-xs text-fg tabular">
            {declaration}
          </code>
          <CopyButton value={declaration} size="sm" />
        </div>
      </div>
      <div
        className="rounded-xl border border-line p-6 text-fg"
        style={{ fontSize: clamp, lineHeight: 1.25 }}
      >
        Fluid heading scales smoothly between the viewports above.
      </div>
    </section>
  );
}

function ControlRow({
  label,
  value,
  slider,
}: {
  label: string;
  value: string;
  slider: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs tabular text-fg">{value}</span>
      </div>
      {slider}
    </div>
  );
}
