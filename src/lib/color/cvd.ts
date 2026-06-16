import type { RgbaColor } from "@/lib/types";
import { parseColor, rgbaToHex } from "./convert";

export type CvdType =
  | "none"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

export const CVD_TYPES: Array<{ id: CvdType; label: string; note: string }> = [
  { id: "none", label: "Normal", note: "No simulation" },
  { id: "protanopia", label: "Protanopia", note: "Red-blind (~1% of men)" },
  { id: "deuteranopia", label: "Deuteranopia", note: "Green-blind (~1% of men)" },
  { id: "tritanopia", label: "Tritanopia", note: "Blue-blind (rare)" },
  { id: "achromatopsia", label: "Achromatopsia", note: "Total color blindness" },
];

// Approximate sRGB simulation matrices (Brettel/Viénot-derived, severity 1.0).
const MATRICES: Record<Exclude<CvdType, "none" | "achromatopsia">, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0.0],
    [0.558, 0.442, 0.0],
    [0.0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0.0],
    [0.7, 0.3, 0.0],
    [0.0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0.0],
    [0.0, 0.433, 0.567],
    [0.0, 0.475, 0.525],
  ],
};

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

export function simulateRgba(c: RgbaColor, type: CvdType): RgbaColor {
  if (type === "none") return c;
  if (type === "achromatopsia") {
    const y = clamp255(0.299 * c.r + 0.587 * c.g + 0.114 * c.b);
    return { r: y, g: y, b: y, a: c.a };
  }
  const m = MATRICES[type];
  return {
    r: clamp255(m[0][0] * c.r + m[0][1] * c.g + m[0][2] * c.b),
    g: clamp255(m[1][0] * c.r + m[1][1] * c.g + m[1][2] * c.b),
    b: clamp255(m[2][0] * c.r + m[2][1] * c.g + m[2][2] * c.b),
    a: c.a,
  };
}

export function simulateHex(hex: string, type: CvdType): string {
  const rgba = parseColor(hex);
  if (!rgba) return hex;
  return rgbaToHex(simulateRgba(rgba, type));
}
