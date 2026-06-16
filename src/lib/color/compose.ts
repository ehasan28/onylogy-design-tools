import type { RgbaColor } from "@/lib/types";

export function compose(top: RgbaColor, bottom: RgbaColor): RgbaColor {
  const a = top.a + bottom.a * (1 - top.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  return {
    r: Math.round((top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / a),
    g: Math.round((top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / a),
    b: Math.round((top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / a),
    a,
  };
}

export function flattenStack(
  layers: RgbaColor[],
  base: RgbaColor = WHITE,
): RgbaColor {
  let out = base;
  for (let i = layers.length - 1; i >= 0; i--) {
    out = compose(layers[i], out);
  }
  return out;
}

export const WHITE: RgbaColor = { r: 255, g: 255, b: 255, a: 1 };
export const BLACK: RgbaColor = { r: 0, g: 0, b: 0, a: 1 };
export const TRANSPARENT: RgbaColor = { r: 0, g: 0, b: 0, a: 0 };
