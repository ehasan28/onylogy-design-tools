"use client";

import { Undo2, Redo2, Blend, ImageDown } from "lucide-react";
import { useColorStore } from "@/stores/color-store";
import { HARMONY_MODES, type HarmonyMode } from "@/lib/color/harmony";
import { downloadPalettePng } from "@/lib/color/share-image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

/**
 * Compact toolbar: undo/redo, color-harmony presets, and global
 * hue/saturation/lightness adjustment for the whole palette.
 */
export function PaletteTools() {
  const undo = useColorStore((s) => s.undo);
  const redo = useColorStore((s) => s.redo);
  const past = useColorStore((s) => s.past);
  const future = useColorStore((s) => s.future);
  const applyHarmony = useColorStore((s) => s.applyHarmony);
  const adjustAll = useColorStore((s) => s.adjustAll);
  const semantic = useColorStore((s) => s.semantic);

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Tools
      </span>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          onClick={undo}
          disabled={past.length === 0}
          className="gap-1.5"
        >
          <Undo2 className="h-3.5 w-3.5" />
          Undo
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={redo}
          disabled={future.length === 0}
          className="gap-1.5"
        >
          <Redo2 className="h-3.5 w-3.5" />
          Redo
        </Button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Blend className="h-3.5 w-3.5" />
            Harmony
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-2">
          <ul className="space-y-0.5">
            {HARMONY_MODES.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => applyHarmony(m.id as HarmonyMode)}
                  className="w-full rounded-md px-3 py-2 text-left text-sm text-fg-muted transition-colors hover:bg-bg-elev hover:text-fg"
                >
                  {m.label}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            Adjust all
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 space-y-4 p-4">
          <AdjustRow
            label="Hue"
            min={-30}
            max={30}
            step={2}
            onCommit={(v) => adjustAll({ h: v })}
          />
          <AdjustRow
            label="Saturation"
            min={-0.3}
            max={0.3}
            step={0.05}
            onCommit={(v) => adjustAll({ s: v })}
          />
          <AdjustRow
            label="Lightness"
            min={-0.1}
            max={0.1}
            step={0.02}
            onCommit={(v) => adjustAll({ l: v })}
          />
          <p className="text-[11px] text-fg-muted">
            Each nudge applies on top of the current palette. Locked swatches
            are skipped. Use Undo to step back.
          </p>
        </PopoverContent>
      </Popover>

      <Button
        variant="secondary"
        size="sm"
        className="gap-1.5"
        onClick={() => downloadPalettePng(semantic)}
      >
        <ImageDown className="h-3.5 w-3.5" />
        PNG
      </Button>
    </div>
  );
}

function AdjustRow({
  label,
  min,
  max,
  step,
  onCommit,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  onCommit: (delta: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-fg-muted">
        <span>{label}</span>
      </div>
      <Slider
        defaultValue={[0]}
        min={min}
        max={max}
        step={step}
        onValueCommit={(v) => {
          if (v[0] !== 0) onCommit(v[0]);
        }}
      />
    </div>
  );
}
