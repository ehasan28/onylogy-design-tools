"use client";

import { useEffect } from "react";
import type { FontPair } from "@/lib/types";

/**
 * Dynamically injects a Google Fonts <link> for the given pair. Cached by
 * href so duplicate inserts are no-ops.
 */
const ATTACHED: Set<string> = new Set();

export function GoogleFontsLoader({ pair }: { pair: FontPair }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const families = new Map<string, Set<number>>();
    for (const def of [pair.heading, pair.body]) {
      if (def.source !== "google") continue;
      const ws = families.get(def.family) ?? new Set<number>();
      for (const w of def.weights) ws.add(w);
      families.set(def.family, ws);
    }
    if (families.size === 0) return;
    const familyParams = Array.from(families.entries()).map(([family, weights]) => {
      const wList = Array.from(weights).sort((a, b) => a - b).join(";");
      return `family=${encodeURIComponent(family)}:wght@${wList}`;
    });
    const href = `https://fonts.googleapis.com/css2?${familyParams.join("&")}&display=swap`;
    if (ATTACHED.has(href)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-onylogy-fonts", "true");
    document.head.appendChild(link);
    ATTACHED.add(href);
  }, [pair]);

  return null;
}
