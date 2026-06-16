import type { SemanticPalette } from "@/lib/types";
import { buildScaledPalette, SCALE_STEPS } from "./scaled";

/** Tailwind v3 config with numbered (50–950) brand ramps + neutral tokens. */
export function exportTailwind(semantic: SemanticPalette): string {
  const { brand, neutral } = buildScaledPalette(semantic);
  const lines = [
    "/** @type {import('tailwindcss').Config} */",
    "module.exports = {",
    "  theme: {",
    "    extend: {",
    "      colors: {",
  ];
  for (const [name, scale] of Object.entries(brand)) {
    lines.push(`        ${name}: {`);
    for (const step of SCALE_STEPS) {
      lines.push(`          ${step}: '${scale.steps[step]}',`);
    }
    lines.push(`          DEFAULT: '${scale.base}',`);
    lines.push("        },");
  }
  for (const [name, hex] of Object.entries(neutral)) {
    lines.push(`        ${name}: '${hex}',`);
  }
  lines.push("      },");
  lines.push("    },");
  lines.push("  },");
  lines.push("};");
  return lines.join("\n");
}

/** Tailwind v4 CSS-first `@theme` block with numbered brand ramps. */
export function exportTailwindV4(semantic: SemanticPalette): string {
  const { brand, neutral } = buildScaledPalette(semantic);
  const lines = ["@import \"tailwindcss\";", "", "@theme {"];
  for (const [name, scale] of Object.entries(brand)) {
    for (const step of SCALE_STEPS) {
      lines.push(`  --color-${name}-${step}: ${scale.steps[step]};`);
    }
    lines.push(`  --color-${name}: ${scale.base};`);
    lines.push("");
  }
  for (const [name, hex] of Object.entries(neutral)) {
    lines.push(`  --color-${name}: ${hex};`);
  }
  lines.push("}");
  return lines.join("\n");
}
