import type { ParsedFontFamily } from "@/lib/types";

export function parseLengthPx(
  value: string | undefined,
  el: Element | null,
  fallback = 0,
): number {
  if (!value) return fallback;
  const v = value.trim().toLowerCase();
  if (!v || v === "normal" || v === "auto") return fallback;

  const num = parseFloat(v);
  if (Number.isNaN(num)) return fallback;
  if (/^-?[\d.]+$/.test(v)) return num;

  if (v.endsWith("px")) return num;
  if (v.endsWith("rem")) {
    const rootSize = getRootFontSize();
    return num * rootSize;
  }
  if (v.endsWith("em")) {
    const parent =
      el?.parentElement ??
      (typeof document !== "undefined" ? document.documentElement : null);
    const parentSize = getOwnFontSize(parent);
    return num * parentSize;
  }
  if (v.endsWith("%")) {
    const parent =
      el?.parentElement ??
      (typeof document !== "undefined" ? document.documentElement : null);
    const parentSize = getOwnFontSize(parent);
    return (num / 100) * parentSize;
  }
  if (v.endsWith("pt")) return num * (96 / 72);
  return num;
}

export function parseLineHeight(
  value: string | undefined,
  fontSizePx: number,
): { px: number | null; ratio: number | null } {
  if (!value) return { px: null, ratio: null };
  const v = value.trim().toLowerCase();
  if (v === "normal" || !v) return { px: null, ratio: null };

  const num = parseFloat(v);
  if (Number.isNaN(num) || fontSizePx <= 0) return { px: null, ratio: null };

  if (/^-?[\d.]+$/.test(v)) {
    return { px: num * fontSizePx, ratio: num };
  }
  if (v.endsWith("px")) return { px: num, ratio: num / fontSizePx };
  if (v.endsWith("%")) {
    const px = (num / 100) * fontSizePx;
    return { px, ratio: num / 100 };
  }
  const px = parseLengthPx(value, null, num * fontSizePx);
  return { px, ratio: px / fontSizePx };
}

export function parseLetterSpacing(
  value: string | undefined,
  fontSizePx: number,
): { px: number; em: number } {
  if (!value || value === "normal" || fontSizePx <= 0)
    return { px: 0, em: 0 };
  const px = parseLengthPx(value, null, 0);
  return { px, em: px / fontSizePx };
}

export function parseFontFamily(raw: string): ParsedFontFamily {
  const cleaned = (raw ?? "").trim();
  if (!cleaned) {
    return { raw: "", primary: "", stack: [], generic: null };
  }

  const families = splitTopLevelCommas(cleaned)
    .map((s) => s.trim())
    .map(stripQuotes)
    .filter(Boolean);

  let generic: string | null = null;
  const last = families[families.length - 1];
  if (last && GENERIC_KEYWORDS.has(last.toLowerCase())) {
    generic = last.toLowerCase();
  }
  const stack = generic ? families.slice(0, -1) : families.slice();
  const primary = stack[0] ?? generic ?? "";

  return { raw: cleaned, primary, stack, generic };
}

const GENERIC_KEYWORDS = new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "emoji",
  "math",
  "fangsong",
  "inherit",
  "initial",
]);

export function splitTopLevelCommas(input: string): string[] {
  const out: string[] = [];
  let buf = "";
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    if (ch === "," && !inSingle && !inDouble) {
      out.push(buf);
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf) out.push(buf);
  return out;
}

function stripQuotes(s: string): string {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

export function pxToRem(px: number, base = 16): string {
  return `${round(px / base, 4)}rem`;
}

export function pxToEm(px: number, parentPx: number): string {
  if (parentPx <= 0) return "0em";
  return `${round(px / parentPx, 4)}em`;
}

export function round(n: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}

function getRootFontSize(): number {
  if (typeof document === "undefined") return 16;
  try {
    const v = window.getComputedStyle(document.documentElement).fontSize;
    return parseFloat(v) || 16;
  } catch {
    return 16;
  }
}

function getOwnFontSize(el: Element | null): number {
  if (!el || typeof window === "undefined") return 16;
  try {
    const v = window.getComputedStyle(el).fontSize;
    return parseFloat(v) || 16;
  } catch {
    return 16;
  }
}
