import type { SemanticPalette } from "@/lib/types";
import { buildColorScale, SCALE_STEPS } from "@/lib/color/scales";

/** Brand roles that get a full 50–950 numbered ramp. */
export const BRAND_ROLES = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "destructive",
] as const;

/** Neutral/structural roles kept as single tokens. */
export const NEUTRAL_ROLES = [
  "background",
  "surface",
  "foreground",
  "border",
  "muted",
] as const;

export interface ScaledPalette {
  brand: Record<string, { base: string; steps: Record<number, string> }>;
  neutral: Record<string, string>;
}

export function buildScaledPalette(semantic: SemanticPalette): ScaledPalette {
  const brand: ScaledPalette["brand"] = {};
  for (const role of BRAND_ROLES) {
    const hex = semantic[role];
    if (!hex) continue;
    brand[role] = buildColorScale(hex);
  }
  const neutral: Record<string, string> = {};
  for (const role of NEUTRAL_ROLES) {
    if (semantic[role]) neutral[role] = semantic[role];
  }
  return { brand, neutral };
}

export { SCALE_STEPS };
