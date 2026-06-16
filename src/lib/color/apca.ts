import type { RgbaColor } from "@/lib/types";
import { parseColor } from "./convert";

/**
 * APCA (Accessible Perceptual Contrast Algorithm) — WCAG 3 draft contrast.
 * Implements the public APCA-W3 0.1.9 "4g" constants.
 * Returns Lc (lightness contrast), typically -108..106. Report |Lc|.
 *
 * Reference: https://github.com/Myndex/apca-w3 (W3 licensed).
 */

const MAIN_TRC = 2.4;
const Rco = 0.2126729;
const Gco = 0.7151522;
const Bco = 0.072175;

const normBG = 0.56;
const normTXT = 0.57;
const revTXT = 0.62;
const revBG = 0.65;

const blkThrs = 0.022;
const blkClmp = 1.414;
const scaleBoW = 1.14;
const scaleWoB = 1.14;
const loBoWoffset = 0.027;
const loWoBoffset = 0.027;
const deltaYmin = 0.0005;
const loClip = 0.1;

function sRgbToY(c: RgbaColor): number {
  const r = (c.r / 255) ** MAIN_TRC;
  const g = (c.g / 255) ** MAIN_TRC;
  const b = (c.b / 255) ** MAIN_TRC;
  return Rco * r + Gco * g + Bco * b;
}

/** Signed Lc contrast for text-on-background. */
export function apcaLc(textHex: string, bgHex: string): number {
  const text = parseColor(textHex);
  const bg = parseColor(bgHex);
  if (!text || !bg) return 0;

  let txtY = sRgbToY(text);
  let bgY = sRgbToY(bg);

  txtY = txtY > blkThrs ? txtY : txtY + (blkThrs - txtY) ** blkClmp;
  bgY = bgY > blkThrs ? bgY : bgY + (blkThrs - bgY) ** blkClmp;

  if (Math.abs(bgY - txtY) < deltaYmin) return 0;

  let outputContrast: number;
  if (bgY > txtY) {
    const sapc = (bgY ** normBG - txtY ** normTXT) * scaleBoW;
    outputContrast = sapc < loClip ? 0 : sapc - loBoWoffset;
  } else {
    const sapc = (bgY ** revBG - txtY ** revTXT) * scaleWoB;
    outputContrast = sapc > -loClip ? 0 : sapc + loWoBoffset;
  }
  return outputContrast * 100;
}

/** Absolute Lc, rounded to one decimal. */
export function apcaContrast(textHex: string, bgHex: string): number {
  return Math.round(Math.abs(apcaLc(textHex, bgHex)) * 10) / 10;
}

/**
 * Plain-language guidance for an Lc value, following the APCA bronze/font
 * lookup tiers (approximate, for general body/UI guidance).
 */
export function apcaLevel(lc: number): {
  label: string;
  use: string;
} {
  const v = Math.abs(lc);
  if (v >= 90) return { label: "Lc 90+", use: "Body text, any size" };
  if (v >= 75) return { label: "Lc 75+", use: "Body text ≥ 18px / 14px bold" };
  if (v >= 60) return { label: "Lc 60+", use: "Large text ≥ 24px / 16px bold" };
  if (v >= 45) return { label: "Lc 45+", use: "Headlines & large UI ≥ 36px" };
  if (v >= 30) return { label: "Lc 30+", use: "Non-text / placeholder only" };
  return { label: `Lc ${Math.round(v)}`, use: "Insufficient for text" };
}
