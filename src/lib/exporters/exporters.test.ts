import { describe, it, expect } from "vitest";
import { exportColorPalette } from "./color";
import type { SemanticPalette } from "@/lib/types";

const SEMANTIC: SemanticPalette = {
  primary: "#3b82f6",
  secondary: "#6366f1",
  accent: "#22c55e",
  muted: "#9ca3af",
  background: "#ffffff",
  surface: "#f8fafc",
  foreground: "#0a0a0a",
  border: "#e5e7eb",
  success: "#22c55e",
  warning: "#f59e0b",
  destructive: "#ef4444",
};

describe("color exporters", () => {
  it("tailwind v3 includes a numbered ramp", () => {
    const out = exportColorPalette("tailwind", SEMANTIC);
    expect(out).toContain("primary:");
    expect(out).toMatch(/50:/);
    expect(out).toMatch(/950:/);
  });
  it("tailwind v4 emits an @theme block", () => {
    const out = exportColorPalette("tailwind-v4", SEMANTIC);
    expect(out).toContain("@theme");
    expect(out).toContain("--color-primary-500");
  });
  it("shadcn emits channel-form tokens", () => {
    const out = exportColorPalette("shadcn", SEMANTIC);
    expect(out).toContain("--background:");
    expect(out).toContain("--primary-foreground:");
  });
  it("css-vars emits :root", () => {
    expect(exportColorPalette("css-vars", SEMANTIC)).toContain(":root");
  });
  it("json is valid JSON", () => {
    expect(() => JSON.parse(exportColorPalette("json", SEMANTIC))).not.toThrow();
  });
});
