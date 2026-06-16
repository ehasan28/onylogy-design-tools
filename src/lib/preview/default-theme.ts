import type { HierarchyRole } from "@/lib/types";

export interface PreviewColors {
  background: string;
  surface: string;
  surfaceMuted: string;
  foreground: string;
  muted: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  success: string;
  warning: string;
  destructive: string;
  border: string;
}

export interface PreviewTypography {
  fontHeading: string;
  fontBody: string;
  fontMono?: string;
  sizes: Record<HierarchyRole, string>;
  lineHeights: Record<HierarchyRole, number>;
  weights: Record<HierarchyRole, number>;
  letterSpacing: Record<HierarchyRole, string>;
}

export interface PreviewTheme {
  colors: PreviewColors;
  typography: PreviewTypography;
}

export const DEFAULT_COLORS: PreviewColors = {
  background: "#ffffff",
  surface: "#f7f8fa",
  surfaceMuted: "#eef0f3",
  foreground: "#0a0b0d",
  muted: "#5b5f66",
  primary: "#6366f1",
  primaryForeground: "#ffffff",
  secondary: "#0ea5e9",
  secondaryForeground: "#ffffff",
  accent: "#ec4899",
  accentForeground: "#ffffff",
  success: "#16a34a",
  warning: "#d97706",
  destructive: "#dc2626",
  border: "#e6e7eb",
};

export const DEFAULT_TYPOGRAPHY: PreviewTypography = {
  fontHeading: "Inter, system-ui, sans-serif",
  fontBody: "Inter, system-ui, sans-serif",
  fontMono: "ui-monospace, monospace",
  sizes: {
    h1: "2.75rem",
    h2: "2.125rem",
    h3: "1.625rem",
    h4: "1.25rem",
    h5: "1.05rem",
    h6: "0.95rem",
    body: "1rem",
    caption: "0.8125rem",
    button: "0.875rem",
    link: "1rem",
    blockquote: "1.125rem",
  },
  lineHeights: {
    h1: 1.1,
    h2: 1.15,
    h3: 1.2,
    h4: 1.25,
    h5: 1.3,
    h6: 1.35,
    body: 1.6,
    caption: 1.4,
    button: 1.2,
    link: 1.6,
    blockquote: 1.5,
  },
  weights: {
    h1: 700,
    h2: 700,
    h3: 600,
    h4: 600,
    h5: 600,
    h6: 600,
    body: 400,
    caption: 400,
    button: 600,
    link: 500,
    blockquote: 400,
  },
  letterSpacing: {
    h1: "-0.02em",
    h2: "-0.015em",
    h3: "-0.01em",
    h4: "-0.01em",
    h5: "0",
    h6: "0",
    body: "0",
    caption: "0.02em",
    button: "0",
    link: "0",
    blockquote: "0",
  },
};

export const DEFAULT_THEME: PreviewTheme = {
  colors: DEFAULT_COLORS,
  typography: DEFAULT_TYPOGRAPHY,
};

export function mergePreviewTheme(
  partial?: Partial<{
    colors: Partial<PreviewColors>;
    typography: Partial<PreviewTypography>;
  }>,
): PreviewTheme {
  return {
    colors: { ...DEFAULT_COLORS, ...partial?.colors },
    typography: { ...DEFAULT_TYPOGRAPHY, ...partial?.typography },
  };
}
