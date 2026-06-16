import { oklchValues, oklchToRgba, rgbaToHex, parseColor } from "./convert";
import { contrastRatioHex } from "./contrast";

export interface ContrastSuggestion {
  /** A nearby hex (same hue/chroma, adjusted lightness) that meets the target. */
  hex: string;
  ratio: number;
  /** Which color was adjusted. */
  adjusted: "foreground" | "background";
}

/**
 * Find the smallest lightness adjustment to `fgHex` (holding hue & chroma) that
 * reaches `target` contrast against `bgHex`. Tries both darker and lighter and
 * returns whichever passes with the least perceptual change. Returns null if a
 * background sweep is needed instead.
 */
export function suggestForegroundFix(
  fgHex: string,
  bgHex: string,
  target = 4.5,
): ContrastSuggestion | null {
  const rgba = parseColor(fgHex);
  if (!rgba) return null;
  if (contrastRatioHex(fgHex, bgHex) >= target) {
    return { hex: fgHex, ratio: round2(contrastRatioHex(fgHex, bgHex)), adjusted: "foreground" };
  }
  const { c, h } = oklchValues(rgba);
  const start = oklchValues(rgba).l;

  let down: { hex: string; l: number } | null = null;
  let up: { hex: string; l: number } | null = null;

  for (let l = start; l >= 0; l -= 0.01) {
    const hex = rgbaToHex(oklchToRgba(l, c, h));
    if (contrastRatioHex(hex, bgHex) >= target) {
      down = { hex, l };
      break;
    }
  }
  for (let l = start; l <= 1; l += 0.01) {
    const hex = rgbaToHex(oklchToRgba(l, c, h));
    if (contrastRatioHex(hex, bgHex) >= target) {
      up = { hex, l };
      break;
    }
  }

  const best =
    down && up
      ? Math.abs(down.l - start) <= Math.abs(up.l - start)
        ? down
        : up
      : down ?? up;

  if (!best) return null;
  return {
    hex: best.hex,
    ratio: round2(contrastRatioHex(best.hex, bgHex)),
    adjusted: "foreground",
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
