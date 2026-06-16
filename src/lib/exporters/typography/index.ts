import type { TypographyExportFormat, TypographyTheme } from "@/lib/types";
import { exportCssVars } from "./css-vars";
import { exportTailwind, exportTailwindV4 } from "./tailwind";
import { exportScss } from "./scss";
import { exportJson } from "./json";
import { exportKadence } from "./kadence";
import { exportClamp } from "./clamp";

export function exportTypography(
  format: TypographyExportFormat,
  theme: TypographyTheme,
): string {
  switch (format) {
    case "css-vars":
      return exportCssVars(theme);
    case "tailwind":
      return exportTailwind(theme);
    case "tailwind-v4":
      return exportTailwindV4(theme);
    case "scss":
      return exportScss(theme);
    case "json":
      return exportJson(theme);
    case "kadence":
      return exportKadence(theme);
    case "clamp":
      return exportClamp(theme);
  }
}

export const TYPOGRAPHY_EXPORT_FORMATS: Array<{
  value: TypographyExportFormat;
  label: string;
  lang: string;
  extension: string;
}> = [
  { value: "css-vars", label: "CSS Variables", lang: "css", extension: "css" },
  { value: "tailwind", label: "Tailwind v3", lang: "js", extension: "js" },
  { value: "tailwind-v4", label: "Tailwind v4", lang: "css", extension: "css" },
  { value: "clamp", label: "clamp()", lang: "css", extension: "css" },
  { value: "scss", label: "SCSS", lang: "scss", extension: "scss" },
  { value: "json", label: "JSON", lang: "json", extension: "json" },
  { value: "kadence", label: "Kadence", lang: "json", extension: "json" },
];

export {
  exportCssVars,
  exportTailwind,
  exportTailwindV4,
  exportScss,
  exportJson,
  exportKadence,
  exportClamp,
};
