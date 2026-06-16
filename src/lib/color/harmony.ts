import { oklchValues, oklchToRgba, rgbaToHex, parseColor } from "./convert";

export type HarmonyMode =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic"
  | "monochromatic";

export const HARMONY_MODES: Array<{ id: HarmonyMode; label: string }> = [
  { id: "complementary", label: "Complementary" },
  { id: "analogous", label: "Analogous" },
  { id: "triadic", label: "Triadic" },
  { id: "split-complementary", label: "Split Complementary" },
  { id: "tetradic", label: "Tetradic" },
  { id: "monochromatic", label: "Monochromatic" },
];

/** Hue offsets (degrees) applied to the base color for each harmony mode. */
const HUE_OFFSETS: Record<HarmonyMode, number[]> = {
  complementary: [0, 180],
  analogous: [-30, 0, 30],
  triadic: [0, 120, 240],
  "split-complementary": [0, 150, 210],
  tetradic: [0, 90, 180, 270],
  monochromatic: [0, 0, 0, 0],
};

/**
 * Generate a set of harmonious colors from a base hex.
 * Monochromatic varies lightness instead of hue.
 */
export function harmonyColors(baseHex: string, mode: HarmonyMode): string[] {
  const rgba = parseColor(baseHex);
  if (!rgba) return [baseHex];
  const { l, c, h } = oklchValues(rgba);

  if (mode === "monochromatic") {
    const lightnesses = [
      Math.min(0.92, l + 0.24),
      Math.min(0.82, l + 0.12),
      l,
      Math.max(0.22, l - 0.14),
    ];
    return lightnesses.map((ll) => rgbaToHex(oklchToRgba(ll, c, h)));
  }

  return HUE_OFFSETS[mode].map((offset) => {
    const nh = ((h + offset) % 360 + 360) % 360;
    return rgbaToHex(oklchToRgba(l, c, nh));
  });
}
