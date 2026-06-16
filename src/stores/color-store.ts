"use client";

import { create } from "zustand";
import type {
  Palette,
  PalettePreset,
  SemanticPalette,
  SemanticRole,
  Swatch,
} from "@/lib/types";
import {
  PRESET_SPECS,
  deriveSemanticFromSwatches,
  generatePalette,
} from "@/lib/color/palette-presets";
import { harmonyColors, type HarmonyMode } from "@/lib/color/harmony";
import { oklchValues, oklchToRgba, rgbaToHex, parseColor } from "@/lib/color/convert";

const STORAGE_KEY = "onylogy:palette-history";
const MAX_HISTORY = 10;
const MAX_UNDO = 50;

interface ColorStore extends Palette {
  history: Palette[];
  past: Palette[];
  future: Palette[];
  generate: (preset: PalettePreset, seedHue?: number) => void;
  randomize: () => void;
  setSwatchColor: (index: number, hex: string) => void;
  toggleLock: (index: number) => void;
  setSwatchRole: (index: number, role: SemanticRole) => void;
  setSemantic: (role: SemanticRole, hex: string) => void;
  applyHarmony: (mode: HarmonyMode) => void;
  adjustAll: (delta: { h?: number; s?: number; l?: number }) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  loadFromHistory: (snapshot: Palette) => void;
  loadPalette: (palette: Palette) => void;
}

const initial = generatePalette("saas", 220);

function persistHistory(history: Palette[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    /* swallow quota errors */
  }
}

function readHistory(): Palette[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.slice(0, MAX_HISTORY);
    return [];
  } catch {
    return [];
  }
}

function snapshot(s: ColorStore): Palette {
  return {
    swatches: s.swatches.map((sw) => ({ ...sw })),
    semantic: { ...s.semantic },
    preset: s.preset,
  };
}

/** Shift a single hex in OKLCH space. */
function shiftHex(
  hex: string,
  delta: { h?: number; s?: number; l?: number },
): string {
  const rgba = parseColor(hex);
  if (!rgba) return hex;
  const { l, c, h } = oklchValues(rgba);
  const nl = clamp01(l + (delta.l ?? 0));
  const nc = Math.max(0, c * (1 + (delta.s ?? 0)));
  const nh = ((h + (delta.h ?? 0)) % 360 + 360) % 360;
  return rgbaToHex(oklchToRgba(nl, nc, nh, rgba.a));
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

export const useColorStore = create<ColorStore>((set, get) => ({
  ...initial,
  history: [],
  past: [],
  future: [],
  generate: (preset, seedHue) => {
    const fresh = generatePalette(preset, seedHue);
    const history = [
      snapshot(get()),
      ...get().history.filter(
        (h) =>
          h.preset !== preset || h.semantic.primary !== get().semantic.primary,
      ),
    ].slice(0, MAX_HISTORY);
    persistHistory(history);
    set({
      ...fresh,
      history,
      past: [...get().past, snapshot(get())].slice(-MAX_UNDO),
      future: [],
    });
  },
  randomize: () => {
    const preset = get().preset;
    get().generate(preset, Math.floor(Math.random() * 360));
  },
  setSwatchColor: (index, hex) => {
    const prev = snapshot(get());
    const swatches = get().swatches.map((s, i) =>
      i === index ? { ...s, hex } : s,
    );
    const semantic = deriveSemanticFromSwatches(swatches, get().semantic);
    set({ swatches, semantic, past: pushUndo(get(), prev), future: [] });
  },
  toggleLock: (index) => {
    const swatches = get().swatches.map((s, i) =>
      i === index ? { ...s, locked: !s.locked } : s,
    );
    set({ swatches });
  },
  setSwatchRole: (index, role) => {
    const prev = snapshot(get());
    const swatches: Swatch[] = get().swatches.map((s, i) =>
      i === index ? { ...s, role } : s,
    );
    const semantic = deriveSemanticFromSwatches(swatches, get().semantic);
    set({ swatches, semantic, past: pushUndo(get(), prev), future: [] });
  },
  setSemantic: (role, hex) => {
    const prev = snapshot(get());
    const semantic: SemanticPalette = { ...get().semantic, [role]: hex };
    const swatches = get().swatches.map((s) =>
      s.role === role ? { ...s, hex } : s,
    );
    set({ semantic, swatches, past: pushUndo(get(), prev), future: [] });
  },
  applyHarmony: (mode) => {
    const prev = snapshot(get());
    const colors = harmonyColors(get().semantic.primary, mode);
    const roleOrder: SemanticRole[] = ["primary", "secondary", "accent"];
    const semantic = { ...get().semantic };
    roleOrder.forEach((role, i) => {
      if (colors[i]) semantic[role] = colors[i];
    });
    const swatches = get().swatches.map((s) =>
      s.role && roleOrder.includes(s.role) && semantic[s.role]
        ? { ...s, hex: semantic[s.role] }
        : s,
    );
    set({ semantic, swatches, past: pushUndo(get(), prev), future: [] });
  },
  adjustAll: (delta) => {
    const prev = snapshot(get());
    const swatches = get().swatches.map((s) =>
      s.locked ? s : { ...s, hex: shiftHex(s.hex, delta) },
    );
    const semantic = { ...get().semantic } as SemanticPalette;
    (Object.keys(semantic) as SemanticRole[]).forEach((role) => {
      semantic[role] = shiftHex(semantic[role], delta);
    });
    set({ swatches, semantic, past: pushUndo(get(), prev), future: [] });
  },
  undo: () => {
    const past = get().past;
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    set({
      ...prev,
      past: past.slice(0, -1),
      future: [snapshot(get()), ...get().future].slice(0, MAX_UNDO),
    });
  },
  redo: () => {
    const future = get().future;
    if (future.length === 0) return;
    const next = future[0];
    set({
      ...next,
      future: future.slice(1),
      past: [...get().past, snapshot(get())].slice(-MAX_UNDO),
    });
  },
  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
  loadFromHistory: (snap) => {
    set({
      swatches: snap.swatches,
      semantic: snap.semantic,
      preset: snap.preset,
      past: pushUndo(get(), snapshot(get())),
      future: [],
    });
  },
  loadPalette: (palette) => {
    set({
      swatches: palette.swatches,
      semantic: palette.semantic,
      preset: palette.preset,
      past: pushUndo(get(), snapshot(get())),
      future: [],
    });
  },
}));

function pushUndo(s: ColorStore, prev: Palette): Palette[] {
  return [...s.past, prev].slice(-MAX_UNDO);
}

export function hydrateColorHistory() {
  if (typeof window === "undefined") return;
  const history = readHistory();
  if (history.length === 0) return;
  useColorStore.setState({ history });
}

export const PRESETS = Object.values(PRESET_SPECS);
