import type { SemanticPalette } from "@/lib/types";
import { hslString, parseColor } from "@/lib/color/convert";
import { bestForeground } from "@/lib/color/contrast";

/** Convert "hsl(239, 84%, 67%)" → shadcn channel form "239 84% 67%". */
function channels(hex: string): string {
  const rgba = parseColor(hex);
  if (!rgba) return "0 0% 0%";
  const s = hslString({ ...rgba, a: 1 });
  const m = s.match(/hsl\(([^)]+)\)/);
  if (!m) return "0 0% 0%";
  return m[1].replace(/,\s*/g, " ");
}

/**
 * shadcn/ui globals.css token block. Emits the `:root` (light-shaped) variables
 * shadcn components expect, mapped from the semantic palette.
 */
export function exportShadcn(semantic: SemanticPalette): string {
  const fg = (bg: string) => channels(bestForeground(bg));
  const rows: Array<[string, string]> = [
    ["--background", channels(semantic.background)],
    ["--foreground", channels(semantic.foreground)],
    ["--card", channels(semantic.surface)],
    ["--card-foreground", channels(semantic.foreground)],
    ["--popover", channels(semantic.surface)],
    ["--popover-foreground", channels(semantic.foreground)],
    ["--primary", channels(semantic.primary)],
    ["--primary-foreground", fg(semantic.primary)],
    ["--secondary", channels(semantic.secondary)],
    ["--secondary-foreground", fg(semantic.secondary)],
    ["--muted", channels(semantic.muted)],
    ["--muted-foreground", channels(semantic.foreground)],
    ["--accent", channels(semantic.accent)],
    ["--accent-foreground", fg(semantic.accent)],
    ["--destructive", channels(semantic.destructive)],
    ["--destructive-foreground", fg(semantic.destructive)],
    ["--border", channels(semantic.border)],
    ["--input", channels(semantic.border)],
    ["--ring", channels(semantic.primary)],
  ];
  const lines = [
    "/* shadcn/ui tokens — paste into your globals.css @layer base { :root { … } } */",
    "@layer base {",
    "  :root {",
    ...rows.map(([k, v]) => `    ${k}: ${v};`),
    "    --radius: 0.5rem;",
    "  }",
    "}",
  ];
  return lines.join("\n");
}
