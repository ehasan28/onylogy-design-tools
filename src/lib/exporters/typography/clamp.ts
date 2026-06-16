import type { TypographyTheme } from "@/lib/types";
import { round } from "@/lib/typography/parse";

const VIEWPORT_MIN = 320;
const VIEWPORT_MAX = 1440;
const BASE_REM = 16;

export interface ClampOptions {
  viewportMin?: number;
  viewportMax?: number;
  scaleAtMin?: number;
}

export function exportClamp(
  theme: TypographyTheme,
  opts: ClampOptions = {},
): string {
  const vMin = opts.viewportMin ?? VIEWPORT_MIN;
  const vMax = opts.viewportMax ?? VIEWPORT_MAX;
  const scaleAtMin = opts.scaleAtMin ?? 0.78;

  const lines: string[] = [":root {"];

  for (const step of theme.steps) {
    const maxPx = step.fontSizePx;
    const minPx = Math.max(12, Math.round(step.fontSizePx * scaleAtMin));
    const clamp = clampLine(minPx, maxPx, vMin, vMax);
    lines.push(`  --font-${step.role}-size: ${clamp};`);
  }

  lines.push("}");
  lines.push("");
  lines.push(
    `/* Interpolates each role between ${vMin}px and ${vMax}px viewport widths. */`,
  );
  return lines.join("\n");
}

export function clampLine(
  minPx: number,
  maxPx: number,
  viewportMinPx: number,
  viewportMaxPx: number,
): string {
  const slope = (maxPx - minPx) / (viewportMaxPx - viewportMinPx);
  const yAxisPx = minPx - slope * viewportMinPx;
  const yAxisRem = yAxisPx / BASE_REM;
  const vw = slope * 100;
  const minRem = round(minPx / BASE_REM, 3);
  const maxRem = round(maxPx / BASE_REM, 3);
  return `clamp(${minRem}rem, ${round(yAxisRem, 3)}rem + ${round(vw, 3)}vw, ${maxRem}rem)`;
}
