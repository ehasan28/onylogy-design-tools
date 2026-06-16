import type { RgbaColor } from "@/lib/types";
import { oklchValues, oklchToRgba, rgbaToHex, parseColor } from "./convert";

/** Standard Tailwind-style numeric scale steps. */
export const SCALE_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type ScaleStepKey = (typeof SCALE_STEPS)[number];

/**
 * Target OKLCH lightness for each step. 500 sits near the source color's own
 * lightness; lighter steps trend toward white, darker steps toward black.
 * Values chosen to feel perceptually even across the ramp.
 */
const TARGET_L: Record<ScaleStepKey, number> = {
  50: 0.971,
  100: 0.936,
  200: 0.885,
  300: 0.808,
  400: 0.704,
  500: 0.602,
  600: 0.519,
  700: 0.45,
  800: 0.382,
  900: 0.321,
  950: 0.21,
};

export interface ColorScale {
  base: string;
  steps: Record<ScaleStepKey, string>;
}

/**
 * Build a 50–950 tint/shade ramp from a single color by holding hue, gently
 * tapering chroma at the extremes, and walking lightness through TARGET_L.
 */
export function buildColorScale(hex: string): ColorScale {
  const rgba = parseColor(hex);
  const { c, h } = rgba ? oklchValues(rgba) : { c: 0.1, h: 0 };

  const steps = {} as Record<ScaleStepKey, string>;
  for (const step of SCALE_STEPS) {
    const l = TARGET_L[step];
    // Reduce chroma as we approach white/black so the ramp stays natural.
    const taper = 1 - Math.abs(l - 0.62) * 0.9;
    const chroma = Math.max(0, c * Math.max(0.25, taper));
    const out: RgbaColor = oklchToRgba(l, chroma, h);
    steps[step] = rgbaToHex(out);
  }
  return { base: hex, steps };
}

/** The step whose target lightness is closest to the color's own lightness. */
export function closestStep(hex: string): ScaleStepKey {
  const rgba = parseColor(hex);
  const l = rgba ? oklchValues(rgba).l : 0.6;
  let best: ScaleStepKey = 500;
  let bestDelta = Infinity;
  for (const step of SCALE_STEPS) {
    const d = Math.abs(TARGET_L[step] - l);
    if (d < bestDelta) {
      bestDelta = d;
      best = step;
    }
  }
  return best;
}
