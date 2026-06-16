export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolMeta {
  slug: string;
  category: "color" | "font";
  title: string;
  shortLabel: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: ToolFaq[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "image-palette",
    category: "color",
    title: "Image Color Extractor",
    shortLabel: "Image → Palette",
    description:
      "Upload any image and extract its dominant colors into an editable palette. Perceptual OKLCH clustering groups similar tones and auto-assigns roles.",
    metaTitle: "Extract a Color Palette from an Image",
    metaDescription:
      "Upload a photo, screenshot, or logo and pull out its dominant colors as an editable, exportable palette. Perceptual clustering with role assignment.",
    keywords: [
      "extract color from image",
      "image color palette",
      "color picker from image",
      "photo palette generator",
    ],
    faqs: [
      {
        question: "How are the colors extracted?",
        answer:
          "We sample the image on a canvas, then cluster similar pixels in OKLCH space (perceptual ΔE) so near-duplicate tones merge into one representative swatch, ordered by how much area they cover.",
      },
      {
        question: "Does my image get uploaded anywhere?",
        answer:
          "No — extraction runs entirely in your browser. The image never leaves your device.",
      },
    ],
  },
  {
    slug: "palette-generator",
    category: "color",
    title: "Color Palette Generator",
    shortLabel: "Palette Generator",
    description:
      "Generate modern palettes for SaaS, dark mode, pastel, minimal, and accessibility-friendly designs. Edit, lock, and export every swatch.",
    metaTitle: "Free Color Palette Generator with Live Previews",
    metaDescription:
      "Generate beautiful palettes for SaaS, dark mode, pastel, and accessible designs. Live UI previews. Export to CSS, Tailwind, SCSS, JSON, and Kadence.",
    keywords: [
      "color palette generator",
      "saas color palette",
      "dark mode palette",
      "pastel palette",
      "tailwind color generator",
      "wordpress palette",
    ],
    faqs: [
      {
        question: "What color formats does this palette generator support?",
        answer:
          "HEX, RGB, HSL, and OKLCH — including alpha. Internally we use OKLCH to keep clusters perceptually consistent and the exports include each format.",
      },
      {
        question: "Can I export the palette to Tailwind or Kadence?",
        answer:
          "Yes. The Export drawer covers CSS variables, Tailwind config, SCSS variables, JSON tokens, and a Kadence-compatible global palette JSON.",
      },
      {
        question: "Is the palette accessible?",
        answer:
          "Every palette is scored against WCAG AA/AAA contrast on common pairs (foreground on background, foreground on primary, accent on background). Switch to the Accessible preset for AA-tuned defaults.",
      },
    ],
  },
  {
    slug: "color-picker",
    category: "color",
    title: "Color Picker",
    shortLabel: "Color Picker",
    description:
      "Pick a color in HEX, RGB, HSL, or OKLCH. Preview the value on real UI components, copy any format, and check WCAG contrast in one click.",
    metaTitle: "Free Online Color Picker (HEX, RGB, HSL, OKLCH)",
    metaDescription:
      "Pick a color in HEX, RGB, HSL, or OKLCH. Real-time preview on buttons, cards, and forms. Built for WordPress and Tailwind workflows.",
    keywords: [
      "color picker",
      "hex color picker",
      "oklch picker",
      "tailwind color",
    ],
    faqs: [
      {
        question: "Does the picker support OKLCH?",
        answer:
          "Yes — every conversion (HEX/RGB/HSL/OKLCH) is computed live so you can copy whichever format your stack prefers.",
      },
      {
        question: "Can I share the picked color with a teammate?",
        answer:
          "Yes. The current color is encoded in the URL — copy the URL bar and the receiver lands on the same state.",
      },
    ],
  },
  {
    slug: "semantic-color-system",
    category: "color",
    title: "Semantic Color System Generator",
    shortLabel: "Semantic Color System",
    description:
      "Build a complete semantic token set — primary, secondary, accent, muted, surface, background, success, warning, destructive — wired into a live UI preview.",
    metaTitle: "Semantic Color System Generator for Design Tokens",
    metaDescription:
      "Generate a semantic design-token system (primary, accent, success, warning, surface, …) with live previews and Tailwind/CSS/SCSS/JSON/Kadence exports.",
    keywords: [
      "semantic color tokens",
      "design tokens generator",
      "shadcn color system",
      "design system colors",
    ],
    faqs: [
      {
        question: "What roles are in the semantic system?",
        answer:
          "Primary, secondary, accent, muted, background, surface, foreground, border, success, warning, destructive — the same shape shadcn/ui and most modern stacks expect.",
      },
      {
        question: "Are the tokens wired into the preview?",
        answer:
          "Yes — every preview component reads from a single PreviewTheme, so editing the primary instantly re-themes buttons, hero, pricing, navbar, and dashboards.",
      },
    ],
  },
  {
    slug: "accessibility-checker",
    category: "color",
    title: "Accessibility Contrast Checker",
    shortLabel: "Accessibility Checker",
    description:
      "Check foreground/background pairs against WCAG AA and AAA — for normal text, large text, and UI elements. See pass/fail per pair, plus suggested improvements.",
    metaTitle: "WCAG AA / AAA Contrast Checker",
    metaDescription:
      "Check color contrast against WCAG AA and AAA. Visual pass/fail per pair, with suggestions and live preview for body text, large text, and UI components.",
    keywords: [
      "wcag contrast checker",
      "accessibility color",
      "aa aaa contrast",
      "wordpress accessibility",
    ],
    faqs: [
      {
        question: "What WCAG levels does this tool check?",
        answer:
          "Both AA (4.5:1 for body, 3:1 for large text) and AAA (7:1 for body, 4.5:1 for large text) — each pair is scored against all four thresholds.",
      },
      {
        question: "What about non-text elements?",
        answer:
          "We also surface the 3:1 threshold so you can check icon-on-background and focus-ring contrast.",
      },
    ],
  },
  {
    slug: "tailwind-color-generator",
    category: "color",
    title: "Tailwind Color Generator",
    shortLabel: "Tailwind Color Generator",
    description:
      "Generate a Tailwind-ready color configuration with semantic tokens — primary, accent, success, warning, destructive — and copy the exact module.exports block.",
    metaTitle: "Tailwind Color Generator for Semantic Design Tokens",
    metaDescription:
      "Generate a Tailwind theme.extend.colors block with semantic tokens for primary, accent, success, warning, and more. One-click copy.",
    keywords: [
      "tailwind colors",
      "tailwind config generator",
      "tailwind palette",
      "semantic colors tailwind",
    ],
    faqs: [
      {
        question: "Does it work with Tailwind v3 and v4?",
        answer:
          "The generated config uses module.exports + theme.extend.colors which works in both. For v4 you can paste the same hex values into a @theme CSS block.",
      },
    ],
  },
  {
    slug: "font-pair-generator",
    category: "font",
    title: "Font Pair Generator",
    shortLabel: "Font Pair Generator",
    description:
      "Curated heading/body font pairings for SaaS, blog, ecommerce, editorial, and minimal websites. Live previews, scale customisation, and exports.",
    metaTitle: "Font Pair Generator for SaaS, Blogs, Editorial, Ecommerce",
    metaDescription:
      "Curated heading + body font pairings, instantly previewed on real UI components. Built for WordPress, Kadence, Gutenberg, and Tailwind workflows.",
    keywords: [
      "font pair generator",
      "google fonts pairing",
      "saas font pairing",
      "blog font pairings",
    ],
    faqs: [
      {
        question: "Where do these fonts come from?",
        answer:
          "All pairings use Google Fonts. The generator emits the correct <link> tag and a CSS variable system so you can drop the pair into any stack.",
      },
      {
        question: "Can I save my favourite pairings?",
        answer:
          "Yes — favourites are stored in localStorage and the current pairing is encoded in the URL for sharing.",
      },
    ],
  },
  {
    slug: "typography-scale-generator",
    category: "font",
    title: "Typography Scale Generator",
    shortLabel: "Type Scale Generator",
    description:
      "Generate a modular typography scale (H1–H6 + body + caption) using minor-second, major-third, perfect-fourth, golden-ratio, and other classic ratios.",
    metaTitle: "Modular Typography Scale Generator",
    metaDescription:
      "Build an H1–H6 + body + caption typography scale using classic modular ratios. Real-time previews and exports to CSS, Tailwind, clamp, SCSS, and Kadence.",
    keywords: [
      "typography scale generator",
      "modular scale",
      "type ratio",
      "h1 h2 h3 sizes",
    ],
    faqs: [
      {
        question: "What ratios are supported?",
        answer:
          "Minor-second (1.067), major-second (1.125), minor-third (1.2), major-third (1.25), perfect-fourth (1.333), augmented-fourth (1.414), perfect-fifth (1.5), and the golden ratio (1.618).",
      },
    ],
  },
  {
    slug: "clamp-generator",
    category: "font",
    title: "Clamp() Generator",
    shortLabel: "Clamp Generator",
    description:
      "Generate fluid responsive typography with CSS clamp(). Tune min/max viewports, min/max sizes, and ship one declaration that scales everywhere.",
    metaTitle: "CSS Clamp() Generator for Fluid Typography",
    metaDescription:
      "Generate CSS clamp() declarations for fluid responsive typography. Configurable viewports, live preview, and exports for CSS, Tailwind, SCSS, and JSON.",
    keywords: [
      "clamp generator",
      "fluid typography",
      "css clamp",
      "responsive typography",
    ],
    faqs: [
      {
        question: "How does the math work?",
        answer:
          "We interpolate linearly between (min size at min viewport) and (max size at max viewport), then translate it into a `clamp(minRem, REMrem + VWvw, maxRem)` declaration.",
      },
    ],
  },
  {
    slug: "tailwind-typography-generator",
    category: "font",
    title: "Tailwind Typography Generator",
    shortLabel: "Tailwind Typography",
    description:
      "Generate a Tailwind fontFamily + fontSize configuration tuned for your modular scale, complete with line-height and letter-spacing metadata.",
    metaTitle: "Tailwind Typography Config Generator",
    metaDescription:
      "Generate a Tailwind theme.extend.fontFamily + fontSize config from a modular scale. Includes line-height, font-weight, and letter-spacing per role.",
    keywords: [
      "tailwind typography",
      "tailwind fontSize tuple",
      "tailwind config typography",
    ],
    faqs: [
      {
        question: "Does this export the tuple shorthand?",
        answer:
          "Yes — each fontSize entry uses the tuple form ['1.25rem', { lineHeight: '1.6', fontWeight: '500' }] so your hierarchy stays consistent.",
      },
    ],
  },
  {
    slug: "readability-checker",
    category: "font",
    title: "Typography Readability Checker",
    shortLabel: "Readability Checker",
    description:
      "Evaluate body size, line-height, line length, and contrast for readable, accessible long-form content. Backed by WCAG 2.1 and Bringhurst thresholds.",
    metaTitle: "Typography Readability and Accessibility Checker",
    metaDescription:
      "Check body size, line-height, line length, and contrast against WCAG and typographic baselines. Suggestions for accessible long-form content.",
    keywords: [
      "readability checker",
      "wcag typography",
      "line length",
      "line height calculator",
    ],
    faqs: [
      {
        question: "What thresholds does the checker use?",
        answer:
          "16px minimum body, 1.4+ line-height, 45–75 characters per line, with information cues outside those ranges. Each rule has a citation in the source code.",
      },
    ],
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(
  slug: string,
  limit = 3,
): ToolMeta[] {
  const current = getTool(slug);
  if (!current) return TOOLS.slice(0, limit);
  const sameCat = TOOLS.filter(
    (t) => t.category === current.category && t.slug !== slug,
  );
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const rest = TOOLS.filter(
    (t) => t.category !== current.category && t.slug !== slug,
  );
  return [...sameCat, ...rest].slice(0, limit);
}
