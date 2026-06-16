import { round } from "./parse";

export interface SpacingStep {
  name: string;
  px: number;
  rem: string;
}

/**
 * Build a spacing scale on a base grid (default 4px / 0.25rem). Names follow
 * the common Tailwind-ish t-shirt + numeric convention.
 */
export function buildSpacingScale(baseGrid = 4): SpacingStep[] {
  const multipliers: Array<{ name: string; mult: number }> = [
    { name: "3xs", mult: 0.5 },
    { name: "2xs", mult: 1 },
    { name: "xs", mult: 2 },
    { name: "sm", mult: 3 },
    { name: "md", mult: 4 },
    { name: "lg", mult: 6 },
    { name: "xl", mult: 8 },
    { name: "2xl", mult: 12 },
    { name: "3xl", mult: 16 },
    { name: "4xl", mult: 24 },
  ];
  return multipliers.map(({ name, mult }) => {
    const px = round(baseGrid * mult, 2);
    return { name, px, rem: `${round(px / 16, 4)}rem` };
  });
}

export function exportSpacingCss(steps: SpacingStep[]): string {
  const lines = [":root {"];
  for (const s of steps) lines.push(`  --space-${s.name}: ${s.rem};`);
  lines.push("}");
  return lines.join("\n");
}
