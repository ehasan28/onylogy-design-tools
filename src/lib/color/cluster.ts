import type { RgbaColor } from "@/lib/types";
import { oklchValues } from "./convert";

export interface SwatchSample {
  rgba: RgbaColor;
  area: number;
  appearances: number;
}

export interface Cluster {
  rgba: RgbaColor;
  area: number;
  appearances: number;
  oklch: { l: number; c: number; h: number };
}

const DEFAULT_DELTA_E = 8;

export function clusterColors(
  samples: SwatchSample[],
  options: { deltaE?: number; max?: number } = {},
): Cluster[] {
  const deltaE = options.deltaE ?? DEFAULT_DELTA_E;
  const max = options.max ?? 12;

  const sorted = [...samples].sort((a, b) => b.area - a.area);
  const clusters: Cluster[] = [];

  for (const sample of sorted) {
    if (sample.rgba.a < 0.05) continue;
    const o = oklchValues(sample.rgba);
    let merged = false;
    for (const c of clusters) {
      if (oklchDeltaE(o, c.oklch) < deltaE) {
        const totalArea = c.area + sample.area;
        c.rgba = {
          r: Math.round(
            (c.rgba.r * c.area + sample.rgba.r * sample.area) / totalArea,
          ),
          g: Math.round(
            (c.rgba.g * c.area + sample.rgba.g * sample.area) / totalArea,
          ),
          b: Math.round(
            (c.rgba.b * c.area + sample.rgba.b * sample.area) / totalArea,
          ),
          a: 1,
        };
        c.area = totalArea;
        c.appearances += sample.appearances;
        c.oklch = oklchValues(c.rgba);
        merged = true;
        break;
      }
    }
    if (!merged) {
      clusters.push({
        rgba: { ...sample.rgba, a: 1 },
        area: sample.area,
        appearances: sample.appearances,
        oklch: o,
      });
    }
  }

  clusters.sort((a, b) => b.area - a.area);
  return clusters.slice(0, max);
}

export function oklchDeltaE(
  a: { l: number; c: number; h: number },
  b: { l: number; c: number; h: number },
): number {
  const dl = (a.l - b.l) * 100;
  const dc = (a.c - b.c) * 100;
  const ha = a.c < 1e-4 ? 0 : a.h;
  const hb = b.c < 1e-4 ? 0 : b.h;
  let dh = ((((ha ?? 0) - (hb ?? 0) + 540) % 360) - 180);
  dh = dh * (Math.PI / 180) * Math.sqrt(a.c * b.c) * 100;
  return Math.sqrt(dl * dl + dc * dc + dh * dh);
}
