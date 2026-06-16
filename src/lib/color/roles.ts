import type { Cluster } from "./cluster";
import type { ColorRole, PaletteEntry } from "@/lib/types";
import { rgbaToHex } from "./convert";

export interface RoleInput {
  cluster: Cluster;
  appearsOnInteractive?: boolean;
}

export function inferRoles(
  inputs: RoleInput[],
  totalArea: number,
): PaletteEntry[] {
  const taken = new Set<ColorRole>();
  const entries: Array<PaletteEntry & { _idx: number }> = [];

  const sorted = [...inputs].sort((a, b) => b.cluster.area - a.cluster.area);

  for (let i = 0; i < sorted.length; i++) {
    const { cluster, appearsOnInteractive } = sorted[i];
    const chroma = cluster.oklch.c;
    const lightness = cluster.oklch.l;
    const areaPct = totalArea > 0 ? cluster.area / totalArea : 0;
    const isNeutral = chroma < 0.04;
    const isHighChroma = chroma > 0.12;
    const isVeryDark = lightness < 0.18;
    const isVeryLight = lightness > 0.92;

    let role: ColorRole = "secondary";
    if (isNeutral) {
      role = isVeryLight || isVeryDark ? "background" : "neutral";
    } else if (appearsOnInteractive && !taken.has("primary")) {
      role = "primary";
    } else if (isHighChroma && areaPct < 0.05 && !taken.has("accent")) {
      role = "accent";
    } else if (!taken.has("secondary")) {
      role = "secondary";
    } else {
      role = "neutral";
    }
    taken.add(role);

    entries.push({
      _idx: i,
      hex: rgbaToHex(cluster.rgba),
      rgba: cluster.rgba,
      role,
      roleConfidence: "likely",
      area: cluster.area,
      percentage: Math.round(areaPct * 10000) / 100,
      appearances: cluster.appearances,
    });
  }

  return entries.map((entry) => {
    const { _idx, ...rest } = entry;
    void _idx;
    return rest;
  });
}
