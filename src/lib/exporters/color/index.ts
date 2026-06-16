import type { ColorExportFormat, SemanticPalette } from "@/lib/types";
import { exportCssVars } from "./css-vars";
import { exportTailwind, exportTailwindV4 } from "./tailwind";
import { exportShadcn } from "./shadcn";
import { exportScss } from "./scss";
import { exportJson } from "./json";
import { exportKadence } from "./kadence";

export function exportColorPalette(
  format: ColorExportFormat,
  semantic: SemanticPalette,
): string {
  switch (format) {
    case "css-vars":
      return exportCssVars(semantic);
    case "tailwind":
      return exportTailwind(semantic);
    case "tailwind-v4":
      return exportTailwindV4(semantic);
    case "shadcn":
      return exportShadcn(semantic);
    case "scss":
      return exportScss(semantic);
    case "json":
      return exportJson(semantic);
    case "kadence":
      return exportKadence(semantic);
  }
}

export const COLOR_EXPORT_FORMATS: Array<{
  value: ColorExportFormat;
  label: string;
  lang: string;
  extension: string;
}> = [
  { value: "css-vars", label: "CSS Variables", lang: "css", extension: "css" },
  { value: "tailwind", label: "Tailwind v3", lang: "js", extension: "js" },
  { value: "tailwind-v4", label: "Tailwind v4", lang: "css", extension: "css" },
  { value: "shadcn", label: "shadcn/ui", lang: "css", extension: "css" },
  { value: "scss", label: "SCSS", lang: "scss", extension: "scss" },
  { value: "json", label: "JSON", lang: "json", extension: "json" },
  { value: "kadence", label: "Kadence", lang: "json", extension: "json" },
];

export {
  exportCssVars,
  exportTailwind,
  exportTailwindV4,
  exportShadcn,
  exportScss,
  exportJson,
  exportKadence,
};
