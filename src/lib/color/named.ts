import { parseColor, oklchValues } from "./convert";
import { oklchDeltaE } from "./cluster";

export interface NamedColor {
  name: string;
  hex: string;
}

/** Common CSS named colors (subset covering the perceptual space well). */
export const CSS_NAMED: NamedColor[] = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "gray", hex: "#808080" },
  { name: "silver", hex: "#c0c0c0" },
  { name: "slategray", hex: "#708090" },
  { name: "red", hex: "#ff0000" },
  { name: "crimson", hex: "#dc143c" },
  { name: "firebrick", hex: "#b22222" },
  { name: "tomato", hex: "#ff6347" },
  { name: "coral", hex: "#ff7f50" },
  { name: "orange", hex: "#ffa500" },
  { name: "darkorange", hex: "#ff8c00" },
  { name: "gold", hex: "#ffd700" },
  { name: "yellow", hex: "#ffff00" },
  { name: "khaki", hex: "#f0e68c" },
  { name: "olive", hex: "#808000" },
  { name: "greenyellow", hex: "#adff2f" },
  { name: "lime", hex: "#00ff00" },
  { name: "limegreen", hex: "#32cd32" },
  { name: "forestgreen", hex: "#228b22" },
  { name: "green", hex: "#008000" },
  { name: "seagreen", hex: "#2e8b57" },
  { name: "teal", hex: "#008080" },
  { name: "turquoise", hex: "#40e0d0" },
  { name: "cyan", hex: "#00ffff" },
  { name: "skyblue", hex: "#87ceeb" },
  { name: "deepskyblue", hex: "#00bfff" },
  { name: "dodgerblue", hex: "#1e90ff" },
  { name: "royalblue", hex: "#4169e1" },
  { name: "blue", hex: "#0000ff" },
  { name: "navy", hex: "#000080" },
  { name: "indigo", hex: "#4b0082" },
  { name: "slateblue", hex: "#6a5acd" },
  { name: "blueviolet", hex: "#8a2be2" },
  { name: "purple", hex: "#800080" },
  { name: "violet", hex: "#ee82ee" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "orchid", hex: "#da70d6" },
  { name: "hotpink", hex: "#ff69b4" },
  { name: "pink", hex: "#ffc0cb" },
  { name: "brown", hex: "#a52a2a" },
  { name: "sienna", hex: "#a0522d" },
  { name: "chocolate", hex: "#d2691e" },
  { name: "peru", hex: "#cd853f" },
  { name: "tan", hex: "#d2b48c" },
  { name: "beige", hex: "#f5f5dc" },
  { name: "ivory", hex: "#fffff0" },
  { name: "lavender", hex: "#e6e6fa" },
  { name: "salmon", hex: "#fa8072" },
  { name: "maroon", hex: "#800000" },
];

/** Tailwind v3 default palette at the 500 step for each hue (plus neutrals). */
export const TAILWIND_500: NamedColor[] = [
  { name: "slate-500", hex: "#64748b" },
  { name: "gray-500", hex: "#6b7280" },
  { name: "zinc-500", hex: "#71717a" },
  { name: "neutral-500", hex: "#737373" },
  { name: "stone-500", hex: "#78716c" },
  { name: "red-500", hex: "#ef4444" },
  { name: "orange-500", hex: "#f97316" },
  { name: "amber-500", hex: "#f59e0b" },
  { name: "yellow-500", hex: "#eab308" },
  { name: "lime-500", hex: "#84cc16" },
  { name: "green-500", hex: "#22c55e" },
  { name: "emerald-500", hex: "#10b981" },
  { name: "teal-500", hex: "#14b8a6" },
  { name: "cyan-500", hex: "#06b6d4" },
  { name: "sky-500", hex: "#0ea5e9" },
  { name: "blue-500", hex: "#3b82f6" },
  { name: "indigo-500", hex: "#6366f1" },
  { name: "violet-500", hex: "#8b5cf6" },
  { name: "purple-500", hex: "#a855f7" },
  { name: "fuchsia-500", hex: "#d946ef" },
  { name: "pink-500", hex: "#ec4899" },
  { name: "rose-500", hex: "#f43f5e" },
];

function nearest(hex: string, palette: NamedColor[]): NamedColor & { delta: number } {
  const rgba = parseColor(hex);
  const target = rgba ? oklchValues(rgba) : { l: 0, c: 0, h: 0 };
  let best = palette[0];
  let bestDelta = Infinity;
  for (const candidate of palette) {
    const crgba = parseColor(candidate.hex);
    if (!crgba) continue;
    const d = oklchDeltaE(target, oklchValues(crgba));
    if (d < bestDelta) {
      bestDelta = d;
      best = candidate;
    }
  }
  return { ...best, delta: Math.round(bestDelta * 10) / 10 };
}

export function nearestNamedColor(hex: string) {
  return nearest(hex, CSS_NAMED);
}

export function nearestTailwindColor(hex: string) {
  return nearest(hex, TAILWIND_500);
}
