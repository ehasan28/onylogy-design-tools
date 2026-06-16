import type { SemanticPalette } from "@/lib/types";

export function exportKadence(semantic: SemanticPalette): string {
  const order = [
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "destructive",
    "surface",
    "background",
    "foreground",
  ] as const;
  const palette = order
    .map((role, i) => ({
      color: semantic[role],
      slug: `palette${i + 1}`,
      name: titleCase(`${role} ${i + 1}`),
    }))
    .filter((entry) => Boolean(entry.color));
  return JSON.stringify(
    {
      _note:
        "Drop into Kadence Theme → Customize → Global Palette. Slug order must remain stable to preserve cross-references.",
      palette,
      second: [],
      third: [],
    },
    null,
    2,
  );
}

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
