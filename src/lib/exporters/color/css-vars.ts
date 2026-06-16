import type { SemanticPalette } from "@/lib/types";
import { hslString, oklchString, parseColor, rgbaString } from "@/lib/color/convert";

export function exportCssVars(semantic: SemanticPalette): string {
  const lines: string[] = [":root {"];
  const entries = Object.entries(semantic) as Array<[string, string]>;

  for (const [name, hex] of entries) {
    const rgba = parseColor(hex);
    if (!rgba) continue;
    lines.push(`  --color-${name}: ${hex};`);
    lines.push(
      `  --color-${name}-rgb: ${rgbaString({ ...rgba, a: 1 })
        .replace(/^rgb\(|\)$/g, "")};`,
    );
    lines.push(`  --color-${name}-hsl: ${hslString({ ...rgba, a: 1 })};`);
  }

  lines.push("}");
  lines.push("");
  lines.push("@supports (color: oklch(0 0 0)) {");
  lines.push("  :root {");
  for (const [name, hex] of entries) {
    const rgba = parseColor(hex);
    if (!rgba) continue;
    lines.push(`    --color-${name}: ${oklchString({ ...rgba, a: 1 })};`);
  }
  lines.push("  }");
  lines.push("}");
  return lines.join("\n");
}
