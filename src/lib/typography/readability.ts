export const MIN_BODY_PX = 16;
export const MIN_CAPTION_PX = 12;

export const MIN_BODY_LINE_HEIGHT = 1.4;
export const IDEAL_BODY_LINE_HEIGHT = 1.5;

export const MIN_LINE_LENGTH = 45;
export const MAX_LINE_LENGTH = 75;
export const HARD_MAX_LINE_LENGTH = 90;

export const MIN_UPPERCASE_LETTER_SPACING_EM = 0.05;

export function avgGlyphWidthFactor(family: string): number {
  const lower = family.toLowerCase();
  if (
    lower.includes("mono") ||
    lower.includes("courier") ||
    lower.includes("consolas") ||
    lower.includes("menlo") ||
    lower.includes("code")
  )
    return 0.6;
  if (
    lower.includes("serif") ||
    lower.includes("georgia") ||
    lower.includes("times") ||
    lower.includes("garamond") ||
    lower.includes("cambria")
  )
    return 0.48;
  return 0.5;
}

export function charsPerLine(
  containerWidthPx: number,
  fontSizePx: number,
  family: string,
): number {
  if (containerWidthPx <= 0 || fontSizePx <= 0) return 0;
  const avg = avgGlyphWidthFactor(family) * fontSizePx;
  if (avg <= 0) return 0;
  return Math.round(containerWidthPx / avg);
}

export interface MeasureCheck {
  chars: number;
  status: "short" | "ideal" | "long" | "too-long";
}

export function checkMeasure(chars: number): MeasureCheck {
  if (chars < MIN_LINE_LENGTH) return { chars, status: "short" };
  if (chars > HARD_MAX_LINE_LENGTH) return { chars, status: "too-long" };
  if (chars > MAX_LINE_LENGTH) return { chars, status: "long" };
  return { chars, status: "ideal" };
}

export interface ReadabilityIssue {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  suggestion: string;
  role?: string;
}

export function evaluateReadability(opts: {
  bodyPx: number;
  captionPx: number;
  bodyLineHeight: number;
  containerWidthPx?: number;
  bodyFamily?: string;
}): ReadabilityIssue[] {
  const issues: ReadabilityIssue[] = [];
  if (opts.bodyPx < MIN_BODY_PX) {
    issues.push({
      id: "body-too-small",
      severity: "warning",
      message: `Body text is ${opts.bodyPx}px — below the 16px minimum recommended for sustained reading.`,
      suggestion: "Increase the body size to 16px or larger.",
      role: "body",
    });
  }
  if (opts.captionPx < MIN_CAPTION_PX) {
    issues.push({
      id: "caption-too-small",
      severity: "warning",
      message: `Caption is ${opts.captionPx}px — below the 12px floor.`,
      suggestion: "Increase caption text to at least 12px.",
      role: "caption",
    });
  }
  if (opts.bodyLineHeight < MIN_BODY_LINE_HEIGHT) {
    issues.push({
      id: "line-height-too-tight",
      severity: "warning",
      message: `Body line-height is ${opts.bodyLineHeight} — tighter than 1.4 may strain readers.`,
      suggestion: "Target a body line-height of 1.5 or higher.",
      role: "body",
    });
  }
  if (opts.containerWidthPx && opts.bodyFamily) {
    const chars = charsPerLine(
      opts.containerWidthPx,
      opts.bodyPx,
      opts.bodyFamily,
    );
    const m = checkMeasure(chars);
    if (m.status === "too-long" || m.status === "long") {
      issues.push({
        id: "line-length-too-long",
        severity: m.status === "too-long" ? "warning" : "info",
        message: `Estimated ${chars} characters per line — exceeds the ideal 45–75 range.`,
        suggestion: "Constrain content width or increase font size.",
        role: "body",
      });
    } else if (m.status === "short") {
      issues.push({
        id: "line-length-too-short",
        severity: "info",
        message: `Estimated ${chars} characters per line — shorter than the 45 minimum.`,
        suggestion: "Widen the content column or reduce font size.",
        role: "body",
      });
    }
  }
  return issues;
}
