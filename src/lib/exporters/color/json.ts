import type { SemanticPalette } from "@/lib/types";
import {
  hslString,
  oklchString,
  parseColor,
  rgbaString,
} from "@/lib/color/convert";

export function exportJson(semantic: SemanticPalette): string {
  const entries: Record<string, unknown> = {};
  for (const [name, hex] of Object.entries(semantic)) {
    const rgba = parseColor(hex);
    if (!rgba) continue;
    entries[name] = {
      hex,
      rgb: rgbaString({ ...rgba, a: 1 }),
      hsl: hslString({ ...rgba, a: 1 }),
      oklch: oklchString({ ...rgba, a: 1 }),
    };
  }
  return JSON.stringify({ palette: entries }, null, 2);
}
