import type { Palette, SemanticPalette } from "@/lib/types";
import { clusterColors, type Cluster, type SwatchSample } from "./cluster";
import { oklchValues, rgbaToHex } from "./convert";

/**
 * Quantise ImageData into representative color clusters using the existing
 * perceptual (OKLCH ΔE) clustering engine.
 */
export function extractClusters(
  data: ImageData,
  max = 8,
): Cluster[] {
  const buckets = new Map<number, SwatchSample>();
  const px = data.data;
  // Sample at most ~40k pixels for performance.
  const total = px.length / 4;
  const stride = Math.max(1, Math.floor(total / 40000));

  for (let i = 0; i < total; i += stride) {
    const o = i * 4;
    const a = px[o + 3];
    if (a < 16) continue;
    const r = px[o];
    const g = px[o + 1];
    const b = px[o + 2];
    // Quantise to 5 bits per channel for bucketing.
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const existing = buckets.get(key);
    if (existing) {
      existing.area += 1;
      existing.appearances += 1;
    } else {
      buckets.set(key, {
        rgba: { r, g, b, a: 1 },
        area: 1,
        appearances: 1,
      });
    }
  }

  return clusterColors([...buckets.values()], { max, deltaE: 10 });
}

/**
 * Heuristically map extracted clusters onto a semantic palette:
 * lightest → background, darkest → foreground, most chromatic → primary/accent.
 */
export function clustersToPalette(
  clusters: Cluster[],
  fallback: SemanticPalette,
): Palette {
  const withMeta = clusters.map((c) => ({
    hex: rgbaToHex(c.rgba),
    okl: oklchValues(c.rgba),
    area: c.area,
  }));
  if (withMeta.length === 0) {
    return { swatches: [], preset: "saas", semantic: fallback };
  }

  const byLight = [...withMeta].sort((a, b) => b.okl.l - a.okl.l);
  const byChroma = [...withMeta].sort((a, b) => b.okl.c - a.okl.c);

  const background = byLight[0].hex;
  const foreground = byLight[byLight.length - 1].hex;
  const primary = byChroma[0]?.hex ?? withMeta[0].hex;
  const accent = byChroma[1]?.hex ?? primary;
  const secondary = byChroma[2]?.hex ?? accent;

  const semantic: SemanticPalette = {
    ...fallback,
    background,
    foreground,
    surface: byLight[1]?.hex ?? background,
    primary,
    secondary,
    accent,
  };

  const swatches = withMeta.map((m) => ({ hex: m.hex }));
  return { swatches, preset: "saas", semantic };
}
