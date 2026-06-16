"use client";

import { create } from "zustand";
import type { FontPair, HierarchyRole, ScaleStep } from "@/lib/types";
import { buildScale } from "@/lib/typography/scale";
import { DEFAULT_PAIR, pairById } from "@/lib/typography/pair-presets";

const FAVORITES_KEY = "onylogy:font-favorites";

export type StepOverride = Partial<
  Pick<ScaleStep, "fontSizePx" | "lineHeight" | "fontWeight" | "letterSpacingEm">
>;

interface TypographyStore {
  pair: FontPair;
  basePx: number;
  ratio: number;
  ratioName: string | null;
  steps: ScaleStep[];
  /** Per-role manual overrides applied on top of the generated scale. */
  overrides: Partial<Record<HierarchyRole, StepOverride>>;
  /** Favourite font-pair ids (persisted to localStorage). */
  favorites: string[];
  setPair: (id: string) => void;
  setBasePx: (px: number) => void;
  setRatio: (ratio: number, name?: string | null) => void;
  setOverride: (role: HierarchyRole, patch: StepOverride) => void;
  resetOverride: (role: HierarchyRole) => void;
  resetAllOverrides: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

function applyOverrides(
  steps: ScaleStep[],
  overrides: Partial<Record<HierarchyRole, StepOverride>>,
): ScaleStep[] {
  return steps.map((step) => {
    const o = overrides[step.role];
    if (!o) return step;
    const next = { ...step, ...o };
    if (o.fontSizePx != null) {
      next.fontSizeRem = `${Math.round((o.fontSizePx / 16) * 10000) / 10000}rem`;
    }
    return next;
  });
}

function rebuild(opts: {
  basePx: number;
  ratio: number;
  overrides: Partial<Record<HierarchyRole, StepOverride>>;
}): ScaleStep[] {
  return applyOverrides(buildScale(opts), opts.overrides);
}

function persistFavorites(favorites: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    /* ignore quota errors */
  }
}

export const useTypographyStore = create<TypographyStore>((set, get) => ({
  pair: DEFAULT_PAIR,
  basePx: 16,
  ratio: 1.25,
  ratioName: "major-third",
  steps: rebuild({ basePx: 16, ratio: 1.25, overrides: {} }),
  overrides: {},
  favorites: [],
  setPair: (id) => {
    const pair = pairById(id) ?? DEFAULT_PAIR;
    set({ pair });
  },
  setBasePx: (basePx) => {
    set({
      basePx,
      steps: rebuild({ basePx, ratio: get().ratio, overrides: get().overrides }),
    });
  },
  setRatio: (ratio, name) => {
    set({
      ratio,
      ratioName: name ?? get().ratioName,
      steps: rebuild({ basePx: get().basePx, ratio, overrides: get().overrides }),
    });
  },
  setOverride: (role, patch) => {
    const overrides = {
      ...get().overrides,
      [role]: { ...get().overrides[role], ...patch },
    };
    set({
      overrides,
      steps: rebuild({ basePx: get().basePx, ratio: get().ratio, overrides }),
    });
  },
  resetOverride: (role) => {
    const overrides = { ...get().overrides };
    delete overrides[role];
    set({
      overrides,
      steps: rebuild({ basePx: get().basePx, ratio: get().ratio, overrides }),
    });
  },
  resetAllOverrides: () => {
    set({
      overrides: {},
      steps: rebuild({ basePx: get().basePx, ratio: get().ratio, overrides: {} }),
    });
  },
  toggleFavorite: (id) => {
    const has = get().favorites.includes(id);
    const favorites = has
      ? get().favorites.filter((f) => f !== id)
      : [...get().favorites, id];
    persistFavorites(favorites);
    set({ favorites });
  },
  isFavorite: (id) => get().favorites.includes(id),
}));

export function hydrateFontFavorites() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      useTypographyStore.setState({ favorites: parsed.filter((x) => typeof x === "string") });
    }
  } catch {
    /* ignore */
  }
}
