import type { SemanticPalette } from "@/lib/types";
import { bestForeground } from "./contrast";

const ORDER: Array<keyof SemanticPalette> = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "destructive",
  "surface",
  "background",
  "foreground",
  "muted",
  "border",
];

/**
 * Render the semantic palette to a shareable PNG and trigger a download.
 */
export function downloadPalettePng(
  semantic: SemanticPalette,
  filename = "onylogy-palette.png",
): void {
  const cols = semantic ? ORDER.filter((r) => semantic[r]) : [];
  const swatchW = 200;
  const swatchH = 240;
  const pad = 0;
  const canvas = document.createElement("canvas");
  canvas.width = cols.length * swatchW + pad * 2;
  canvas.height = swatchH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  cols.forEach((role, i) => {
    const hex = semantic[role];
    const x = pad + i * swatchW;
    ctx.fillStyle = hex;
    ctx.fillRect(x, 0, swatchW, swatchH);

    const fg = bestForeground(hex);
    ctx.fillStyle = fg;
    ctx.font = "600 16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(role, x + 16, swatchH - 44);
    ctx.font = "400 14px ui-monospace, monospace";
    ctx.fillText(hex.toUpperCase(), x + 16, swatchH - 22);
  });

  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
