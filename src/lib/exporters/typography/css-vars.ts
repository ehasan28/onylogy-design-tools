import type { TypographyTheme } from "@/lib/types";
import { round } from "@/lib/typography/parse";

export function exportCssVars(theme: TypographyTheme): string {
  const lines: string[] = [":root {"];
  const headingStack = quoteStack(theme.heading.family, theme.heading.fallback);
  const bodyStack = quoteStack(theme.body.family, theme.body.fallback);
  lines.push(`  --font-family-heading: ${headingStack};`);
  lines.push(`  --font-family-body: ${bodyStack};`);
  lines.push(`  --font-base-size: ${rem(theme.basePx)};`);
  lines.push("");
  for (const step of theme.steps) {
    lines.push(`  --font-${step.role}-size: ${step.fontSizeRem};`);
    lines.push(
      `  --font-${step.role}-line-height: ${round(step.lineHeight, 3)};`,
    );
    lines.push(`  --font-${step.role}-weight: ${step.fontWeight};`);
    if (step.letterSpacingEm !== 0) {
      lines.push(
        `  --font-${step.role}-letter-spacing: ${round(step.letterSpacingEm, 3)}em;`,
      );
    }
  }
  lines.push("}");
  return lines.join("\n");
}

export function rem(px: number, base = 16): string {
  return `${round(px / base, 4)}rem`;
}

export function quoteIfNeeded(family: string): string {
  if (!family) return "";
  if (/^[a-z][a-z0-9-]*$/i.test(family)) return family;
  if (family.includes(" ") || family.includes(",")) return `'${family}'`;
  return family;
}

export function quoteStack(primary: string, fallback: string): string {
  return [quoteIfNeeded(primary), fallback].filter(Boolean).join(", ");
}
