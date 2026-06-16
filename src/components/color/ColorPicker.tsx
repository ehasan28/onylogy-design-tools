"use client";

import { useEffect, useState } from "react";
import { Pipette } from "lucide-react";
import {
  allFormats,
  parseColor,
  rgbaToHex,
  oklchValues,
  oklchToRgba,
} from "@/lib/color/convert";
import { nearestNamedColor, nearestTailwindColor } from "@/lib/color/named";
import { getRecentColors, addRecentColor } from "@/lib/color/recents";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CopyButton } from "@/components/shared/CopyButton";
import { cn } from "@/lib/utils/cn";

// EyeDropper is not yet in the TS DOM lib in all versions.
interface EyeDropperResult {
  sRGBHex: string;
}
interface EyeDropperCtor {
  new (): { open: () => Promise<EyeDropperResult> };
}

export interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);
  const [lastExternal, setLastExternal] = useState(value);
  const [alpha, setAlpha] = useState(1);
  const [recents, setRecents] = useState<string[]>([]);
  if (value !== lastExternal) {
    setLastExternal(value);
    setHexInput(value);
  }

  useEffect(() => {
    setRecents(getRecentColors());
  }, []);

  const rgba = parseColor(value);
  const okl = rgba ? oklchValues(rgba) : null;
  const formats = rgba ? allFormats({ ...rgba, a: alpha }) : null;

  const commit = (raw: string) => {
    const parsed = parseColor(raw);
    if (!parsed) return;
    const next = rgbaToHex(parsed);
    onChange(next);
    setRecents(addRecentColor(next));
  };

  const setOkl = (patch: { l?: number; c?: number; h?: number }) => {
    if (!okl) return;
    const next = rgbaToHex(
      oklchToRgba(patch.l ?? okl.l, patch.c ?? okl.c, patch.h ?? okl.h),
    );
    onChange(next);
  };

  const pickWithEyedropper = async () => {
    const Ctor = (window as unknown as { EyeDropper?: EyeDropperCtor })
      .EyeDropper;
    if (!Ctor) return;
    try {
      const res = await new Ctor().open();
      commit(res.sRGBHex);
    } catch {
      /* user cancelled */
    }
  };

  const hasEyeDropper =
    typeof window !== "undefined" && "EyeDropper" in window;

  const named = parseColor(value) ? nearestNamedColor(value) : null;
  const tw = parseColor(value) ? nearestTailwindColor(value) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div
          className="h-16 w-full shrink-0 rounded-lg border border-line sm:w-32"
          style={{ background: alpha < 1 && formats ? formats.rgb : value }}
        />
        <div className="flex flex-1 items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Pick color"
            className="h-9 w-9 cursor-pointer rounded border border-line bg-bg p-0"
          />
          {hasEyeDropper && (
            <button
              type="button"
              onClick={pickWithEyedropper}
              aria-label="Pick color from screen"
              title="Pick from screen"
              className="flex h-9 w-9 items-center justify-center rounded border border-line bg-bg text-fg-muted transition-colors hover:bg-bg-elev hover:text-fg"
            >
              <Pipette className="h-4 w-4" />
            </button>
          )}
          <Input
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onBlur={() => commit(hexInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit(hexInput);
            }}
            placeholder="#000000"
            className="font-mono tabular"
            aria-label="Hex value"
          />
        </div>
      </div>

      {okl && (
        <div className="space-y-2.5">
          <OklSlider
            label="L"
            value={okl.l}
            min={0}
            max={1}
            step={0.005}
            onChange={(l) => setOkl({ l })}
          />
          <OklSlider
            label="C"
            value={okl.c}
            min={0}
            max={0.37}
            step={0.005}
            onChange={(c) => setOkl({ c })}
          />
          <OklSlider
            label="H"
            value={okl.h}
            min={0}
            max={360}
            step={1}
            onChange={(h) => setOkl({ h })}
          />
          <OklSlider
            label="A"
            value={alpha}
            min={0}
            max={1}
            step={0.01}
            onChange={setAlpha}
          />
        </div>
      )}

      {formats && (
        <div className="grid gap-2 sm:grid-cols-2">
          <FormatRow label="HEX" value={formats.hex} />
          <FormatRow label="RGB" value={formats.rgb} />
          <FormatRow label="HSL" value={formats.hsl} />
          <FormatRow label="OKLCH" value={formats.oklch} />
        </div>
      )}

      {(named || tw) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-fg-dim">Nearest:</span>
          {named && (
            <button
              type="button"
              onClick={() => commit(named.hex)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-fg-muted hover:bg-bg-elev hover:text-fg"
            >
              <span
                className="h-3 w-3 rounded-full border border-line"
                style={{ background: named.hex }}
              />
              {named.name}
            </button>
          )}
          {tw && (
            <button
              type="button"
              onClick={() => commit(tw.hex)}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 font-mono text-fg-muted hover:bg-bg-elev hover:text-fg"
            >
              <span
                className="h-3 w-3 rounded-full border border-line"
                style={{ background: tw.hex }}
              />
              {tw.name}
            </button>
          )}
        </div>
      )}

      {recents.length > 0 && (
        <div>
          <Label className="mb-1.5 block">Recent</Label>
          <div className="flex flex-wrap gap-1.5">
            {recents.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChange(c)}
                title={c.toUpperCase()}
                aria-label={`Use ${c}`}
                className={cn(
                  "h-6 w-6 rounded border border-line transition-transform hover:-translate-y-0.5",
                )}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OklSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-3 shrink-0 font-mono text-xs text-fg-dim">{label}</span>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
      <span className="w-10 shrink-0 text-right font-mono text-[11px] text-fg-muted tabular">
        {label === "H" ? Math.round(value) : value.toFixed(2)}
      </span>
    </div>
  );
}

function FormatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <span className="flex-1 truncate rounded-md border border-line bg-bg px-2.5 py-1.5 font-mono text-xs text-fg tabular">
          {value}
        </span>
        <CopyButton value={value} size="sm" />
      </div>
    </div>
  );
}
