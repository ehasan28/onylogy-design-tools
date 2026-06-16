import type { TypographyTheme } from "@/lib/types";
import { round } from "@/lib/typography/parse";
import { rem, quoteIfNeeded } from "./css-vars";

export function exportTailwind(theme: TypographyTheme): string {
  const heading = [theme.heading.family, ...splitFallback(theme.heading.fallback)]
    .map(quoteIfNeeded)
    .map((s) => `'${s}'`)
    .join(", ");
  const body = [theme.body.family, ...splitFallback(theme.body.fallback)]
    .map(quoteIfNeeded)
    .map((s) => `'${s}'`)
    .join(", ");

  const sizeLines: string[] = [];
  for (const step of theme.steps) {
    const props: string[] = [];
    props.push(`lineHeight: '${round(step.lineHeight, 3)}'`);
    if (step.fontWeight !== 400) {
      props.push(`fontWeight: '${step.fontWeight}'`);
    }
    if (step.letterSpacingEm !== 0) {
      props.push(`letterSpacing: '${round(step.letterSpacingEm, 3)}em'`);
    }
    sizeLines.push(`        ${step.role}: ['${rem(step.fontSizePx)}', { ${props.join(", ")} }],`);
  }

  return [
    "/** @type {import('tailwindcss').Config} */",
    "module.exports = {",
    "  theme: {",
    "    extend: {",
    "      fontFamily: {",
    `        heading: [${heading}],`,
    `        body: [${body}],`,
    "      },",
    "      fontSize: {",
    ...sizeLines,
    "      },",
    "    },",
    "  },",
    "};",
  ].join("\n");
}

/** Tailwind v4 CSS-first `@theme` typography block. */
export function exportTailwindV4(theme: TypographyTheme): string {
  const headingStack = [
    theme.heading.family,
    ...splitFallback(theme.heading.fallback),
  ]
    .map(quoteIfNeeded)
    .join(", ");
  const bodyStack = [theme.body.family, ...splitFallback(theme.body.fallback)]
    .map(quoteIfNeeded)
    .join(", ");

  const lines = ['@import "tailwindcss";', "", "@theme {"];
  lines.push(`  --font-heading: ${headingStack};`);
  lines.push(`  --font-body: ${bodyStack};`);
  lines.push("");
  for (const step of theme.steps) {
    lines.push(`  --text-${step.role}: ${rem(step.fontSizePx)};`);
    lines.push(
      `  --text-${step.role}--line-height: ${round(step.lineHeight, 3)};`,
    );
    lines.push(`  --text-${step.role}--font-weight: ${step.fontWeight};`);
    if (step.letterSpacingEm !== 0) {
      lines.push(
        `  --text-${step.role}--letter-spacing: ${round(step.letterSpacingEm, 3)}em;`,
      );
    }
  }
  lines.push("}");
  return lines.join("\n");
}

function splitFallback(fallback: string): string[] {
  return fallback
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}
