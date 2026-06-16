"use client";

import { type CSSProperties, type ReactNode, useMemo } from "react";
import {
  type PreviewTheme,
  DEFAULT_THEME,
} from "@/lib/preview/default-theme";
import { cn } from "@/lib/utils/cn";

export interface PreviewProviderProps {
  theme?: Partial<PreviewTheme>;
  className?: string;
  children: ReactNode;
  /** Apply a soft frame/background to make the preview visually distinct. */
  framed?: boolean;
}

/**
 * Wraps preview components with a scoped set of CSS variables generated from
 * a PreviewTheme. Every preview component reads tokens (--preview-bg,
 * --preview-h1-size, etc.) from this scope so swapping a color or font
 * instantly restyles all previews below.
 */
export function PreviewProvider({
  theme,
  className,
  children,
  framed = true,
}: PreviewProviderProps) {
  const style = useMemo(
    () => themeToCssVars({ ...DEFAULT_THEME, ...theme } as PreviewTheme),
    [theme],
  );

  if (!framed) {
    return (
      <div
        style={
          {
            ...(style as CSSProperties),
            fontFamily: "var(--preview-font-body)",
          } as CSSProperties
        }
        className={cn("preview-scope", className)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={style as CSSProperties}
      className={cn(
        "rounded-2xl border border-line bg-bg-elev/40 p-1",
        className,
      )}
    >
      <div
        className="preview-scope rounded-[14px] bg-[var(--preview-bg)] p-6 text-[var(--preview-fg)]"
        style={
          {
            fontFamily: "var(--preview-font-body)",
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

function themeToCssVars(theme: PreviewTheme): Record<string, string> {
  const { colors, typography } = theme;
  const out: Record<string, string> = {
    "--preview-bg": colors.background,
    "--preview-surface": colors.surface,
    "--preview-surface-muted": colors.surfaceMuted,
    "--preview-fg": colors.foreground,
    "--preview-muted": colors.muted,
    "--preview-primary": colors.primary,
    "--preview-primary-fg": colors.primaryForeground,
    "--preview-secondary": colors.secondary,
    "--preview-secondary-fg": colors.secondaryForeground,
    "--preview-accent": colors.accent,
    "--preview-accent-fg": colors.accentForeground,
    "--preview-success": colors.success,
    "--preview-warning": colors.warning,
    "--preview-destructive": colors.destructive,
    "--preview-border": colors.border,
    "--preview-font-heading": typography.fontHeading,
    "--preview-font-body": typography.fontBody,
    "--preview-font-mono":
      typography.fontMono ?? "ui-monospace, monospace",
  };

  for (const [role, size] of Object.entries(typography.sizes)) {
    out[`--preview-${role}-size`] = size;
  }
  for (const [role, lh] of Object.entries(typography.lineHeights)) {
    out[`--preview-${role}-lh`] = String(lh);
  }
  for (const [role, weight] of Object.entries(typography.weights)) {
    out[`--preview-${role}-weight`] = String(weight);
  }
  for (const [role, ls] of Object.entries(typography.letterSpacing)) {
    out[`--preview-${role}-ls`] = ls;
  }

  return out;
}
