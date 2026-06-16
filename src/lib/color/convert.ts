import {
  converter,
  formatHex,
  formatRgb,
  formatHsl,
  formatCss,
  parse,
} from "culori";
import type { ColorAllFormats, RgbaColor } from "@/lib/types";

const toRgb = converter("rgb");
const toHsl = converter("hsl");
const toOklch = converter("oklch");

export function parseColor(input: string): RgbaColor | null {
  const c = parse(input);
  if (!c) return null;
  const rgb = toRgb(c);
  if (!rgb) return null;
  return {
    r: Math.round(clamp01(rgb.r) * 255),
    g: Math.round(clamp01(rgb.g) * 255),
    b: Math.round(clamp01(rgb.b) * 255),
    a: rgb.alpha ?? 1,
  };
}

export function rgbaToHex(rgba: RgbaColor): string {
  const hex = formatHex({
    mode: "rgb",
    r: rgba.r / 255,
    g: rgba.g / 255,
    b: rgba.b / 255,
  });
  return hex ?? "#000000";
}

export function rgbaString(rgba: RgbaColor): string {
  if (rgba.a < 1) {
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${round(rgba.a, 3)})`;
  }
  return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
}

export function hslString(rgba: RgbaColor): string {
  const hsl = toHsl({
    mode: "rgb",
    r: rgba.r / 255,
    g: rgba.g / 255,
    b: rgba.b / 255,
    alpha: rgba.a,
  });
  if (!hsl) return "hsl(0, 0%, 0%)";
  const h = Math.round(hsl.h ?? 0);
  const s = Math.round((hsl.s ?? 0) * 100);
  const l = Math.round((hsl.l ?? 0) * 100);
  if (rgba.a < 1) return `hsla(${h}, ${s}%, ${l}%, ${round(rgba.a, 3)})`;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function oklchString(rgba: RgbaColor): string {
  const oklch = toOklch({
    mode: "rgb",
    r: rgba.r / 255,
    g: rgba.g / 255,
    b: rgba.b / 255,
    alpha: rgba.a,
  });
  if (!oklch) return "oklch(0 0 0)";
  const l = round(oklch.l ?? 0, 4);
  const c = round(oklch.c ?? 0, 4);
  const h = round(oklch.h ?? 0, 2);
  if (rgba.a < 1) return `oklch(${l} ${c} ${h} / ${round(rgba.a, 3)})`;
  return `oklch(${l} ${c} ${h})`;
}

export function allFormats(rgba: RgbaColor): ColorAllFormats {
  return {
    rgba,
    hex: rgbaToHex(rgba),
    rgb: rgbaString(rgba),
    hsl: hslString(rgba),
    oklch: oklchString(rgba),
  };
}

export function oklchValues(rgba: RgbaColor): {
  l: number;
  c: number;
  h: number;
} {
  const o = toOklch({
    mode: "rgb",
    r: rgba.r / 255,
    g: rgba.g / 255,
    b: rgba.b / 255,
  });
  return { l: o?.l ?? 0, c: o?.c ?? 0, h: o?.h ?? 0 };
}

export function oklchToRgba(l: number, c: number, h: number, a = 1): RgbaColor {
  const rgb = toRgb({ mode: "oklch", l, c, h });
  if (!rgb) return { r: 0, g: 0, b: 0, a };
  return {
    r: Math.round(clamp01(rgb.r) * 255),
    g: Math.round(clamp01(rgb.g) * 255),
    b: Math.round(clamp01(rgb.b) * 255),
    a,
  };
}

export function isVisible(rgba: RgbaColor): boolean {
  return rgba.a > 0.02;
}

export function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function round(n: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

export { formatHex, formatRgb, formatHsl, formatCss };
