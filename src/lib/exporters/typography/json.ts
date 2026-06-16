import type { TypographyTheme } from "@/lib/types";
import { round } from "@/lib/typography/parse";
import { rem } from "./css-vars";

export function exportJson(theme: TypographyTheme): string {
  const typography: Record<string, Record<string, unknown>> = {};
  for (const step of theme.steps) {
    const entry: Record<string, unknown> = {
      fontSize: step.fontSizeRem,
      fontWeight: step.fontWeight,
      lineHeight: round(step.lineHeight, 3),
    };
    if (step.letterSpacingEm !== 0) {
      entry.letterSpacing = `${round(step.letterSpacingEm, 3)}em`;
    }
    typography[step.role] = entry;
  }

  return JSON.stringify(
    {
      fontFamily: {
        heading: [theme.heading.family, theme.heading.fallback],
        body: [theme.body.family, theme.body.fallback],
      },
      base: rem(theme.basePx),
      scale: {
        ratio: theme.ratio,
        name: theme.ratioName,
      },
      typography,
    },
    null,
    2,
  );
}
