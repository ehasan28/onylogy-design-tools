import type {
  Palette,
  PalettePreset,
  SemanticPalette,
  Swatch,
} from "@/lib/types";
import { oklchToRgba, rgbaToHex, parseColor, oklchValues } from "./convert";
import { contrastRatioHex, bestForeground } from "./contrast";

interface PresetSpec {
  id: PalettePreset;
  label: string;
  description: string;
  baseHueRange: [number, number];
  chromaRange: [number, number];
  lightnessRange: [number, number];
  accentHueOffset: number;
  background: number;
  surface: number;
  foreground: number;
  muted: number;
}

export const PRESET_SPECS: Record<PalettePreset, PresetSpec> = {
  saas: {
    id: "saas",
    label: "Modern SaaS",
    description: "Vibrant, confident palette tuned for product UI.",
    baseHueRange: [220, 260],
    chromaRange: [0.14, 0.2],
    lightnessRange: [0.55, 0.65],
    accentHueOffset: 140,
    background: 0.985,
    surface: 0.97,
    foreground: 0.16,
    muted: 0.55,
  },
  dark: {
    id: "dark",
    label: "Dark Mode",
    description: "Deep neutral surfaces with luminous primaries.",
    baseHueRange: [200, 260],
    chromaRange: [0.16, 0.22],
    lightnessRange: [0.7, 0.78],
    accentHueOffset: 120,
    background: 0.13,
    surface: 0.18,
    foreground: 0.96,
    muted: 0.65,
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    description: "Restrained neutrals with a single tonal accent.",
    baseHueRange: [220, 260],
    chromaRange: [0.05, 0.09],
    lightnessRange: [0.4, 0.55],
    accentHueOffset: 40,
    background: 0.99,
    surface: 0.96,
    foreground: 0.18,
    muted: 0.58,
  },
  pastel: {
    id: "pastel",
    label: "Pastel",
    description: "Soft, airy tones with high lightness and low chroma.",
    baseHueRange: [200, 340],
    chromaRange: [0.08, 0.12],
    lightnessRange: [0.78, 0.88],
    accentHueOffset: 60,
    background: 0.985,
    surface: 0.965,
    foreground: 0.25,
    muted: 0.62,
  },
  accessible: {
    id: "accessible",
    label: "Accessible",
    description: "WCAG AA-tuned contrast across primary, foreground, surface.",
    baseHueRange: [210, 235],
    chromaRange: [0.16, 0.2],
    lightnessRange: [0.42, 0.5],
    accentHueOffset: 150,
    background: 1,
    surface: 0.96,
    foreground: 0.14,
    muted: 0.48,
  },
};

function pickInRange(range: [number, number], seed: number): number {
  const t = (seed % 1000) / 1000;
  return range[0] + (range[1] - range[0]) * t;
}

function makeSwatch(hex: string): Swatch {
  return { hex };
}

export function generatePalette(
  preset: PalettePreset,
  seedHue?: number,
): Palette {
  const spec = PRESET_SPECS[preset];
  const seed = seedHue ?? Math.floor(Math.random() * 360);
  const baseHue =
    seedHue != null
      ? seedHue
      : pickInRange(spec.baseHueRange, seed * 9.7);
  const chroma = pickInRange(spec.chromaRange, seed * 3.3);
  const lightness = pickInRange(spec.lightnessRange, seed * 5.1);

  const primary = rgbaToHex(oklchToRgba(lightness, chroma, baseHue));
  const secondary = rgbaToHex(
    oklchToRgba(lightness * 0.95, chroma * 0.75, (baseHue + 30) % 360),
  );
  const accent = rgbaToHex(
    oklchToRgba(
      Math.min(0.78, lightness + 0.1),
      chroma + 0.04,
      (baseHue + spec.accentHueOffset) % 360,
    ),
  );

  const background = rgbaToHex(oklchToRgba(spec.background, 0.005, baseHue));
  const surface = rgbaToHex(oklchToRgba(spec.surface, 0.008, baseHue));
  const foreground = rgbaToHex(oklchToRgba(spec.foreground, 0.01, baseHue));
  const muted = rgbaToHex(oklchToRgba(spec.muted, 0.02, baseHue));
  const border = rgbaToHex(
    oklchToRgba(
      preset === "dark" ? 0.28 : 0.88,
      0.01,
      baseHue,
    ),
  );

  const success = rgbaToHex(oklchToRgba(0.62, 0.16, 145));
  const warning = rgbaToHex(oklchToRgba(0.78, 0.16, 80));
  const destructive = rgbaToHex(oklchToRgba(0.58, 0.2, 25));

  const semantic: SemanticPalette = {
    primary,
    secondary,
    accent,
    muted,
    background,
    surface,
    foreground,
    border,
    success,
    warning,
    destructive,
  };

  const swatches: Swatch[] = [
    { ...makeSwatch(primary), role: "primary" },
    { ...makeSwatch(secondary), role: "secondary" },
    { ...makeSwatch(accent), role: "accent" },
    { ...makeSwatch(success), role: "success" },
    { ...makeSwatch(warning), role: "warning" },
    { ...makeSwatch(destructive), role: "destructive" },
    { ...makeSwatch(surface), role: "surface" },
    { ...makeSwatch(background), role: "background" },
    { ...makeSwatch(foreground), role: "foreground" },
    { ...makeSwatch(muted), role: "muted" },
    { ...makeSwatch(border), role: "border" },
  ];

  return {
    swatches,
    preset,
    semantic,
  };
}

export function deriveSemanticFromSwatches(
  swatches: Swatch[],
  fallback: SemanticPalette,
): SemanticPalette {
  const out: SemanticPalette = { ...fallback };
  for (const swatch of swatches) {
    if (swatch.role && swatch.hex) {
      out[swatch.role] = swatch.hex;
    }
  }
  return out;
}

export function shiftSwatchHue(hex: string, hueDelta: number): string {
  const rgba = parseColor(hex);
  if (!rgba) return hex;
  const o = oklchValues(rgba);
  const h = ((o.h ?? 0) + hueDelta + 360) % 360;
  return rgbaToHex(oklchToRgba(o.l, o.c, h, rgba.a));
}

export function paletteWcagReport(semantic: SemanticPalette) {
  const fgOnBg = contrastRatioHex(semantic.foreground, semantic.background);
  const fgOnSurface = contrastRatioHex(semantic.foreground, semantic.surface);
  const fgOnPrimary = contrastRatioHex(
    bestForeground(semantic.primary),
    semantic.primary,
  );
  const fgOnAccent = contrastRatioHex(
    bestForeground(semantic.accent),
    semantic.accent,
  );
  const mutedOnBg = contrastRatioHex(semantic.muted, semantic.background);
  return {
    fgOnBg,
    fgOnSurface,
    fgOnPrimary,
    fgOnAccent,
    mutedOnBg,
  };
}
