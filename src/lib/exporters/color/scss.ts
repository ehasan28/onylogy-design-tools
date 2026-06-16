import type { SemanticPalette } from "@/lib/types";

export function exportScss(semantic: SemanticPalette): string {
  return Object.entries(semantic)
    .map(([name, hex]) => `$color-${name}: ${hex};`)
    .join("\n");
}
