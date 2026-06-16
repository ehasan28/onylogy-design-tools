export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorAllFormats {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  rgba: RgbaColor;
}

export type ColorRole =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "text"
  | "background"
  | "border";

export interface PaletteEntry {
  hex: string;
  rgba: RgbaColor;
  role: ColorRole;
  roleConfidence: "likely" | "detected";
  area: number;
  percentage: number;
  appearances: number;
}

export type SemanticRole =
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "background"
  | "surface"
  | "foreground"
  | "border"
  | "success"
  | "warning"
  | "destructive";

export type SemanticPalette = Record<SemanticRole, string>;

export type PalettePreset =
  | "saas"
  | "dark"
  | "minimal"
  | "pastel"
  | "accessible";

export interface Swatch {
  hex: string;
  locked?: boolean;
  role?: SemanticRole;
}

export interface Palette {
  swatches: Swatch[];
  preset: PalettePreset;
  semantic: SemanticPalette;
}

export type ColorExportFormat =
  | "css-vars"
  | "tailwind"
  | "tailwind-v4"
  | "shadcn"
  | "scss"
  | "json"
  | "kadence";

export type TypographyExportFormat =
  | "css-vars"
  | "tailwind"
  | "tailwind-v4"
  | "scss"
  | "json"
  | "kadence"
  | "clamp";

export type SizeUnit = "px" | "rem" | "em";

export interface ParsedFontFamily {
  raw: string;
  primary: string;
  stack: string[];
  generic: string | null;
}

export type HierarchyRole =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "button"
  | "link"
  | "blockquote";

export interface TypographyEntry {
  role: HierarchyRole;
  selectorSample: string;
  sampleText: string;
  family: ParsedFontFamily;
  fontSizePx: number;
  fontSizeRange: [number, number];
  lineHeightPx: number | null;
  lineHeightRatio: number | null;
  letterSpacingEm: number;
  fontWeight: number;
  textTransform: string;
  textAlign: string;
  occurrences: number;
  color: string | null;
  effectiveBg: string | null;
}

export interface ScaleAnalysis {
  ratio: number | null;
  ratioName: string | null;
  base: number;
  confidence: "high" | "medium" | "low";
  observed: number[];
}

export interface FontUsage {
  family: string;
  count: number;
  roles: HierarchyRole[];
}

export type FontSource =
  | "google"
  | "adobe"
  | "self-hosted"
  | "system"
  | "unknown";

export interface FontAxis {
  tag: string;
  min: number;
  max: number;
  default: number;
}

export interface FontSourceInfo {
  family: string;
  source: FontSource;
  urls: string[];
  loaded: boolean;
  variable: boolean;
  axes: FontAxis[];
  weights: number[];
  fallbackStack: string[];
}

export interface HierarchyReport {
  entries: TypographyEntry[];
  scale: ScaleAnalysis;
  fontUsage: FontUsage[];
  fontSources: FontSourceInfo[];
  scanned: number;
  elapsedMs: number;
}

export type FontPairCategory =
  | "saas"
  | "blog"
  | "ecommerce"
  | "editorial"
  | "minimal";

export interface FontPair {
  id: string;
  category: FontPairCategory;
  name: string;
  heading: FontDef;
  body: FontDef;
  description: string;
}

export interface FontDef {
  family: string;
  fallback: string;
  weights: number[];
  source: "google" | "system";
}

export interface ScaleStep {
  role: HierarchyRole;
  fontSizePx: number;
  fontSizeRem: string;
  lineHeight: number;
  fontWeight: number;
  letterSpacingEm: number;
}

export interface TypographyTheme {
  heading: FontDef;
  body: FontDef;
  basePx: number;
  ratio: number;
  ratioName: string | null;
  steps: ScaleStep[];
}
