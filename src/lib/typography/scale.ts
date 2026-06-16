import type {
  HierarchyRole,
  ScaleAnalysis,
  ScaleStep,
} from "@/lib/types";
import { round } from "./parse";

export const KNOWN_RATIOS: Array<{ value: number; name: string }> = [
  { value: 1.067, name: "minor-second" },
  { value: 1.125, name: "major-second" },
  { value: 1.2, name: "minor-third" },
  { value: 1.25, name: "major-third" },
  { value: 1.333, name: "perfect-fourth" },
  { value: 1.414, name: "augmented-fourth" },
  { value: 1.5, name: "perfect-fifth" },
  { value: 1.618, name: "golden-ratio" },
];

const TOLERANCE = 0.04;

export function detectScale(sizesPx: number[], base = 16): ScaleAnalysis {
  const observed = Array.from(new Set(sizesPx.map((n) => round2(n))))
    .filter((n) => n >= 12)
    .sort((a, b) => a - b);

  if (observed.length < 2) {
    return {
      ratio: null,
      ratioName: null,
      base,
      confidence: "low",
      observed,
    };
  }

  const ratios: number[] = [];
  for (let i = 1; i < observed.length; i++) {
    ratios.push(observed[i] / observed[i - 1]);
  }

  const median = medianOf(ratios);
  const named = closestNamed(median);
  const adjacentMatches = ratios.filter(
    (r) => Math.abs(r - median) <= 0.03,
  ).length;

  let confidence: ScaleAnalysis["confidence"] = "low";
  if (adjacentMatches >= 3) confidence = "high";
  else if (adjacentMatches >= 2) confidence = "medium";

  if (!named) confidence = "low";

  return {
    ratio: round2(median, 3),
    ratioName: named?.name ?? null,
    base,
    confidence,
    observed,
  };
}

function closestNamed(ratio: number): { value: number; name: string } | null {
  let best: { value: number; name: string } | null = null;
  let bestDelta = Infinity;
  for (const r of KNOWN_RATIOS) {
    const d = Math.abs(r.value - ratio);
    if (d < bestDelta) {
      bestDelta = d;
      best = r;
    }
  }
  if (best && bestDelta <= TOLERANCE) return best;
  return null;
}

function medianOf(nums: number[]): number {
  if (nums.length === 0) return 0;
  const sorted = nums.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function round2(n: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

const ROLE_STEPS: Array<{ role: HierarchyRole; step: number }> = [
  { role: "h1", step: 5 },
  { role: "h2", step: 4 },
  { role: "h3", step: 3 },
  { role: "h4", step: 2 },
  { role: "h5", step: 1 },
  { role: "h6", step: 0.5 },
  { role: "body", step: 0 },
  { role: "caption", step: -1 },
];

interface BuildScaleOptions {
  basePx?: number;
  ratio?: number;
  ratioName?: string | null;
}

export function buildScale(opts: BuildScaleOptions = {}): ScaleStep[] {
  const basePx = opts.basePx ?? 16;
  const ratio = opts.ratio ?? 1.25;
  return ROLE_STEPS.map(({ role, step }) => {
    const fontSizePx = round(basePx * Math.pow(ratio, step), 2);
    const fontSizeRem = `${round(fontSizePx / 16, 4)}rem`;
    return {
      role,
      fontSizePx,
      fontSizeRem,
      lineHeight: defaultLineHeight(role),
      fontWeight: defaultWeight(role),
      letterSpacingEm: defaultLetterSpacing(role),
    };
  });
}

function defaultLineHeight(role: HierarchyRole): number {
  if (role === "h1") return 1.1;
  if (role === "h2") return 1.15;
  if (role === "h3" || role === "h4") return 1.2;
  if (role === "h5" || role === "h6") return 1.3;
  if (role === "caption") return 1.4;
  return 1.6;
}

function defaultWeight(role: HierarchyRole): number {
  if (role === "h1" || role === "h2") return 700;
  if (role === "h3" || role === "h4") return 600;
  if (role === "h5" || role === "h6" || role === "button") return 600;
  return 400;
}

function defaultLetterSpacing(role: HierarchyRole): number {
  if (role === "h1") return -0.02;
  if (role === "h2") return -0.015;
  if (role === "h3" || role === "h4") return -0.01;
  if (role === "caption") return 0.02;
  return 0;
}

export function findClosestRatioName(ratio: number): string | null {
  for (const r of KNOWN_RATIOS) {
    if (Math.abs(r.value - ratio) <= TOLERANCE) return r.name;
  }
  return null;
}
