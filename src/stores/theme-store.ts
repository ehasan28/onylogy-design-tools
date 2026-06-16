"use client";

import { useMemo } from "react";
import { useColorStore } from "./color-store";
import { useTypographyStore } from "./typography-store";
import { bestForeground } from "@/lib/color/contrast";
import {
  type PreviewTheme,
  DEFAULT_TYPOGRAPHY,
} from "@/lib/preview/default-theme";
import type { HierarchyRole, ScaleStep } from "@/lib/types";

/**
 * Computes a PreviewTheme by merging the live color store + typography store.
 * Used by every workspace and tool page that renders preview components.
 */
export function usePreviewTheme(): PreviewTheme {
  const semantic = useColorStore((s) => s.semantic);
  const pair = useTypographyStore((s) => s.pair);
  const steps = useTypographyStore((s) => s.steps);

  return useMemo<PreviewTheme>(() => {
    const sizes = withRoleDefaults(
      Object.fromEntries(
        steps.map((step) => [step.role, step.fontSizeRem]),
      ) as Partial<Record<HierarchyRole, string>>,
      DEFAULT_TYPOGRAPHY.sizes,
    );
    const lineHeights = withRoleDefaults(
      buildRoleMap(steps, (s) => s.lineHeight),
      DEFAULT_TYPOGRAPHY.lineHeights,
    );
    const weights = withRoleDefaults(
      buildRoleMap(steps, (s) => s.fontWeight),
      DEFAULT_TYPOGRAPHY.weights,
    );
    const letterSpacing = withRoleDefaults(
      buildRoleMap(steps, (s) =>
        s.letterSpacingEm === 0 ? "0" : `${s.letterSpacingEm}em`,
      ),
      DEFAULT_TYPOGRAPHY.letterSpacing,
    );

    return {
      colors: {
        background: semantic.background,
        surface: semantic.surface,
        surfaceMuted: semantic.muted,
        foreground: semantic.foreground,
        muted: semantic.muted,
        primary: semantic.primary,
        primaryForeground: bestForeground(semantic.primary),
        secondary: semantic.secondary,
        secondaryForeground: bestForeground(semantic.secondary),
        accent: semantic.accent,
        accentForeground: bestForeground(semantic.accent),
        success: semantic.success,
        warning: semantic.warning,
        destructive: semantic.destructive,
        border: semantic.border,
      },
      typography: {
        fontHeading: `'${pair.heading.family}', ${pair.heading.fallback}`,
        fontBody: `'${pair.body.family}', ${pair.body.fallback}`,
        fontMono: "ui-monospace, monospace",
        sizes,
        lineHeights,
        weights,
        letterSpacing,
      },
    };
  }, [semantic, pair, steps]);
}

function buildRoleMap<T>(
  steps: ScaleStep[],
  pick: (step: ScaleStep) => T,
): Partial<Record<HierarchyRole, T>> {
  return Object.fromEntries(steps.map((step) => [step.role, pick(step)])) as Partial<
    Record<HierarchyRole, T>
  >;
}

function withRoleDefaults<T>(
  partial: Partial<Record<HierarchyRole, T>>,
  defaults: Record<HierarchyRole, T>,
): Record<HierarchyRole, T> {
  return { ...defaults, ...partial };
}
