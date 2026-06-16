import type { FontPair, FontPairCategory } from "@/lib/types";

export const FONT_PAIRS: FontPair[] = [
  {
    id: "saas-inter-inter",
    category: "saas",
    name: "Inter / Inter",
    description: "Workhorse pairing used across modern product UI.",
    heading: {
      family: "Inter",
      fallback: "system-ui, -apple-system, sans-serif",
      weights: [400, 500, 600, 700, 800],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, -apple-system, sans-serif",
      weights: [400, 500, 600],
      source: "google",
    },
  },
  {
    id: "saas-space-grotesk-inter",
    category: "saas",
    name: "Space Grotesk / Inter",
    description: "Geometric headlines with a neutral, legible body.",
    heading: {
      family: "Space Grotesk",
      fallback: "ui-sans-serif, system-ui, sans-serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "saas-manrope-inter",
    category: "saas",
    name: "Manrope / Inter",
    description: "Friendly humanist headlines balanced by Inter.",
    heading: {
      family: "Manrope",
      fallback: "ui-sans-serif, system-ui, sans-serif",
      weights: [600, 700, 800],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "blog-fraunces-inter",
    category: "blog",
    name: "Fraunces / Inter",
    description: "Editorial serif headlines with a clean sans body.",
    heading: {
      family: "Fraunces",
      fallback: "Georgia, serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "blog-playfair-source-sans",
    category: "blog",
    name: "Playfair Display / Source Sans 3",
    description: "Classic publishing pair with strong hierarchy.",
    heading: {
      family: "Playfair Display",
      fallback: "Georgia, serif",
      weights: [500, 700, 800],
      source: "google",
    },
    body: {
      family: "Source Sans 3",
      fallback: "system-ui, sans-serif",
      weights: [400, 600],
      source: "google",
    },
  },
  {
    id: "ecommerce-poppins-inter",
    category: "ecommerce",
    name: "Poppins / Inter",
    description: "Approachable geometric headlines for retail.",
    heading: {
      family: "Poppins",
      fallback: "ui-sans-serif, system-ui, sans-serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "ecommerce-archivo-archivo",
    category: "ecommerce",
    name: "Archivo / Archivo",
    description: "Dense, confident pairing for product-led storefronts.",
    heading: {
      family: "Archivo",
      fallback: "ui-sans-serif, sans-serif",
      weights: [600, 700, 800],
      source: "google",
    },
    body: {
      family: "Archivo",
      fallback: "ui-sans-serif, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "editorial-cormorant-inter",
    category: "editorial",
    name: "Cormorant Garamond / Inter",
    description: "Long-form magazine feel with crisp body text.",
    heading: {
      family: "Cormorant Garamond",
      fallback: "Garamond, Georgia, serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "Inter",
      fallback: "system-ui, sans-serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "editorial-libre-lora",
    category: "editorial",
    name: "Libre Caslon Text / Lora",
    description: "Bookish, dignified pairing for essays.",
    heading: {
      family: "Libre Caslon Text",
      fallback: "Georgia, serif",
      weights: [400, 700],
      source: "google",
    },
    body: {
      family: "Lora",
      fallback: "Georgia, serif",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "minimal-ibm-plex-sans-mono",
    category: "minimal",
    name: "IBM Plex Sans / IBM Plex Mono",
    description: "Technical, restrained pair — strong for design systems.",
    heading: {
      family: "IBM Plex Sans",
      fallback: "ui-sans-serif, system-ui, sans-serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "IBM Plex Mono",
      fallback: "ui-monospace, monospace",
      weights: [400, 500],
      source: "google",
    },
  },
  {
    id: "minimal-geist-geist",
    category: "minimal",
    name: "Geist / Geist Mono",
    description: "Bauhaus-leaning monoline UI pair.",
    heading: {
      family: "Geist",
      fallback: "ui-sans-serif, system-ui, sans-serif",
      weights: [500, 600, 700],
      source: "google",
    },
    body: {
      family: "Geist Mono",
      fallback: "ui-monospace, monospace",
      weights: [400, 500],
      source: "google",
    },
  },
];

export function pairsByCategory(category: FontPairCategory): FontPair[] {
  return FONT_PAIRS.filter((p) => p.category === category);
}

export function pairById(id: string): FontPair | undefined {
  return FONT_PAIRS.find((p) => p.id === id);
}

export const DEFAULT_PAIR = FONT_PAIRS[0];

export function googleFontsHref(pairs: FontPair[]): string {
  const families = new Map<string, Set<number>>();
  for (const pair of pairs) {
    for (const def of [pair.heading, pair.body]) {
      if (def.source !== "google") continue;
      const existing = families.get(def.family) ?? new Set<number>();
      for (const w of def.weights) existing.add(w);
      families.set(def.family, existing);
    }
  }
  if (families.size === 0) return "";
  const familyParams = Array.from(families.entries()).map(([family, weights]) => {
    const wList = Array.from(weights).sort((a, b) => a - b).join(";");
    return `family=${encodeURIComponent(family)}:wght@${wList}`;
  });
  return `https://fonts.googleapis.com/css2?${familyParams.join("&")}&display=swap`;
}
