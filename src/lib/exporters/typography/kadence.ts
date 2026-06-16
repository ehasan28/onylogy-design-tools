import type { HierarchyRole, TypographyTheme } from "@/lib/types";
import { round } from "@/lib/typography/parse";
import { rem } from "./css-vars";

const KADENCE_KEY: Partial<Record<HierarchyRole, string>> = {
  h1: "heading_1",
  h2: "heading_2",
  h3: "heading_3",
  h4: "heading_4",
  h5: "heading_5",
  h6: "heading_6",
  body: "text",
  button: "buttons",
  link: "link",
  caption: "caption",
  blockquote: "blockquote",
};

export function exportKadence(theme: TypographyTheme): string {
  const typography: Record<string, Record<string, unknown>> = {};
  for (const step of theme.steps) {
    const key = KADENCE_KEY[step.role] ?? step.role;
    const family =
      step.role.startsWith("h") || step.role === "blockquote"
        ? theme.heading.family
        : theme.body.family;
    typography[key] = {
      family,
      googleFont: true,
      weight: String(step.fontWeight),
      style: "normal",
      transform: "",
      size: { desktop: rem(step.fontSizePx), tablet: "", mobile: "" },
      sizeType: "rem",
      lineHeight: {
        desktop: round(step.lineHeight, 3),
        tablet: "",
        mobile: "",
      },
      letterSpacing:
        step.letterSpacingEm !== 0
          ? {
              desktop: round(step.letterSpacingEm, 3),
              tablet: "",
              mobile: "",
            }
          : null,
      letterSpacingType: "em",
    };
  }

  return JSON.stringify(
    {
      kadence_typography_options: {
        fontFamily: {
          heading: {
            family: theme.heading.family,
            fallback: theme.heading.fallback,
            google: theme.heading.source === "google",
          },
          body: {
            family: theme.body.family,
            fallback: theme.body.fallback,
            google: theme.body.source === "google",
          },
        },
        typography,
      },
      _notes:
        "Drop into Kadence Theme → Customize → Typography. Verify against your Kadence version.",
    },
    null,
    2,
  );
}
