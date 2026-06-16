import { describe, it, expect } from "vitest";
import { buildScale, detectScale } from "./scale";
import { analyzeReadingEase, countSyllables } from "./flesch";
import { buildSpacingScale } from "./spacing";
import { evaluateReadability } from "./readability";

describe("scale", () => {
  it("builds a scale with body at the base size", () => {
    const steps = buildScale({ basePx: 16, ratio: 1.25 });
    const body = steps.find((s) => s.role === "body")!;
    expect(body.fontSizePx).toBeCloseTo(16, 1);
  });
  it("h1 is larger than body", () => {
    const steps = buildScale({ basePx: 16, ratio: 1.25 });
    const h1 = steps.find((s) => s.role === "h1")!;
    const body = steps.find((s) => s.role === "body")!;
    expect(h1.fontSizePx).toBeGreaterThan(body.fontSizePx);
  });
  it("detects a major-third ratio from sizes", () => {
    const sizes = [16, 20, 25, 31.25, 39].map((n) => n);
    const a = detectScale(sizes, 16);
    expect(a.ratioName).toBe("major-third");
  });
});

describe("flesch", () => {
  it("counts syllables heuristically", () => {
    expect(countSyllables("cat")).toBe(1);
    expect(countSyllables("typography")).toBeGreaterThanOrEqual(3);
  });
  it("scores simple text as easier than complex text", () => {
    const simple = analyzeReadingEase("The cat sat on the mat. It was a good day.");
    const complex = analyzeReadingEase(
      "Phenomenological interpretation necessitates substantial epistemological reconsideration.",
    );
    expect(simple.ease).toBeGreaterThan(complex.ease);
  });
});

describe("spacing", () => {
  it("builds a spacing scale on a 4px grid", () => {
    const steps = buildSpacingScale(4);
    expect(steps.length).toBeGreaterThan(5);
    const md = steps.find((s) => s.name === "md")!;
    expect(md.px).toBe(16);
  });
});

describe("readability", () => {
  it("flags body text below 16px", () => {
    const issues = evaluateReadability({
      bodyPx: 13,
      captionPx: 12,
      bodyLineHeight: 1.5,
    });
    expect(issues.some((i) => i.id === "body-too-small")).toBe(true);
  });
});
