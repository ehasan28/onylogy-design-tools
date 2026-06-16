"use client";

import { useEffect } from "react";
import { hydrateColorHistory } from "@/stores/color-store";
import { hydrateFontFavorites } from "@/stores/typography-store";

/**
 * Rehydrates localStorage-backed store state on the client after mount.
 * Mounted once in the root layout.
 */
export function StoreHydrator() {
  useEffect(() => {
    hydrateColorHistory();
    hydrateFontFavorites();
  }, []);
  return null;
}
