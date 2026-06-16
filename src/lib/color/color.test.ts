import { describe, it, expect } from "vitest";
import { contrastRatioHex, wcagBadges } from "./contrast";
import { parseColor, rgbaToHex, oklchValues, oklchToRgba } from "./convert";
import { apcaContrast } from "./apca";
import { harmonyColors } from "./harmony";
import { buildColorScale, SCALE_STEPS } from "./scales";
import { suggestForegroundFix } from "./suggest";
import { nearestTailwindColor, nearestNamedColor } from "./named";
import { simulateHex } from "./cvd";

describe("contrast", () => {
  it("black on white is 21:1", () => {
    expect(Math.round(contrastRatioHex("#000000", "#ffffff"))).toBe(21);
  });
  it("identical colors are 1:1", () => {
    expect(contrastRatioHex("#336699", "#336699")).toBeCloseTo(1, 5);
  });
  it("wcag badges flag AA/AAA thresholds", () => {
    // #6c6c6c on white ≈ 5.25:1 — passes AA, fails AAA.
    const b = wcagBadges(contrastRatioHex("#6c6c6c", "#ffffff"));
    expect(b.aaNormal).toBe(true);
    expect(b.aaaNormal).toBe(false);
  });
});

describe("convert", () => {
  it("parses hex to rgba", () => {
    expect(parseColor("#ff0000")).toMatchObject({ r: 255, g: 0, b: 0 });
  });
  it("oklch round-trips within tolerance", () => {
    const rgba = parseColor("#3b82f6")!;
    const { l, c, h } = oklchValues(rgba);
    const back = rgbaToHex(oklchToRgba(l, c, h));
    expect(back.toLowerCase()).toBe("#3b82f6");
  });
});

describe("apca", () => {
  it("white text on black yields high Lc", () => {
    expect(apcaContrast("#ffffff", "#000000")).toBeGreaterThan(100);
  });
  it("returns near zero for identical colors", () => {
    expect(apcaContrast("#777777", "#777777")).toBe(0);
  });
});

describe("harmony", () => {
  it("complementary returns two colors roughly opposite in hue", () => {
    const out = harmonyColors("#3b82f6", "complementary");
    expect(out).toHaveLength(2);
    const h1 = oklchValues(parseColor(out[0])!).h;
    const h2 = oklchValues(parseColor(out[1])!).h;
    // Smallest angular separation between the two hues, in [0, 180].
    const separation = 180 - Math.abs(Math.abs(h1 - h2) - 180);
    // After gamut mapping a true 180° complement lands ~165–180° apart.
    expect(separation).toBeGreaterThan(150);
  });
  it("triadic returns three colors", () => {
    expect(harmonyColors("#3b82f6", "triadic")).toHaveLength(3);
  });
});

describe("scales", () => {
  it("builds an 11-step ramp", () => {
    const scale = buildColorScale("#3b82f6");
    expect(Object.keys(scale.steps)).toHaveLength(SCALE_STEPS.length);
    expect(scale.base).toBe("#3b82f6");
  });
  it("50 is lighter than 950", () => {
    const scale = buildColorScale("#3b82f6");
    const l50 = oklchValues(parseColor(scale.steps[50])!).l;
    const l950 = oklchValues(parseColor(scale.steps[950])!).l;
    expect(l50).toBeGreaterThan(l950);
  });
});

describe("suggest", () => {
  it("improves a failing pair to >= 4.5:1", () => {
    const s = suggestForegroundFix("#999999", "#ffffff", 4.5);
    expect(s).not.toBeNull();
    expect(s!.ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe("named", () => {
  it("maps tailwind blue-500 to itself", () => {
    expect(nearestTailwindColor("#3b82f6").name).toBe("blue-500");
  });
  it("maps pure red near red", () => {
    expect(nearestNamedColor("#ff0000").name).toBe("red");
  });
});

describe("cvd", () => {
  it("achromatopsia produces a gray", () => {
    const out = parseColor(simulateHex("#3b82f6", "achromatopsia"))!;
    expect(out.r).toBe(out.g);
    expect(out.g).toBe(out.b);
  });
});
