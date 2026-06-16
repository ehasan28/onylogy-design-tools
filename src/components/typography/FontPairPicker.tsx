"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useTypographyStore } from "@/stores/typography-store";
import { FONT_PAIRS } from "@/lib/typography/pair-presets";
import { cn } from "@/lib/utils/cn";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import type { FontPairCategory } from "@/lib/types";
import { GoogleFontsLoader } from "./GoogleFontsLoader";

type Filter = FontPairCategory | "favorites";

const CATEGORIES: Array<{ id: Filter; label: string }> = [
  { id: "favorites", label: "♥ Favorites" },
  { id: "saas", label: "SaaS" },
  { id: "blog", label: "Blog" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "editorial", label: "Editorial" },
  { id: "minimal", label: "Minimal" },
];

export function FontPairPicker() {
  const pair = useTypographyStore((s) => s.pair);
  const setPair = useTypographyStore((s) => s.setPair);
  const favorites = useTypographyStore((s) => s.favorites);
  const toggleFavorite = useTypographyStore((s) => s.toggleFavorite);
  const [filter, setFilter] = useState<Filter>(pair.category);

  const filtered =
    filter === "favorites"
      ? FONT_PAIRS.filter((p) => favorites.includes(p.id))
      : FONT_PAIRS.filter((p) => p.category === filter);

  return (
    <div className="space-y-4">
      <GoogleFontsLoader pair={pair} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg">Pairings</h3>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v as Filter)}
          layoutGroupId="pair-cat"
        >
          {CATEGORIES.map((c) => (
            <ToggleGroupItem key={c.id} value={c.id}>
              {c.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line bg-bg-elev/30 p-6 text-center text-sm text-fg-muted">
          No favourites yet — tap the heart on any pairing to save it here.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {filtered.map((p) => {
            const active = pair.id === p.id;
            const fav = favorites.includes(p.id);
            return (
              <li key={p.id} className="relative">
                <button
                  type="button"
                  onClick={() => setPair(p.id)}
                  className={cn(
                    "w-full rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-bg-elev/40 hover:bg-bg-elev",
                  )}
                >
                  <div className="text-xs uppercase tracking-wider text-fg-dim">
                    {p.name}
                  </div>
                  <div
                    className="mt-2 text-2xl font-semibold tracking-tight text-fg"
                    style={{
                      fontFamily: `'${p.heading.family}', ${p.heading.fallback}`,
                    }}
                  >
                    Headings shine here
                  </div>
                  <p
                    className="mt-2 text-sm text-fg-muted"
                    style={{
                      fontFamily: `'${p.body.family}', ${p.body.fallback}`,
                    }}
                  >
                    {p.description}
                  </p>
                  <GoogleFontsLoader pair={p} />
                </button>
                <button
                  type="button"
                  aria-label={fav ? "Remove favourite" : "Add favourite"}
                  aria-pressed={fav}
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute right-3 top-3 rounded-full p-1.5 text-fg-dim transition-colors hover:bg-bg-elev-2 hover:text-fg"
                >
                  <Heart
                    className={cn("h-4 w-4", fav && "fill-accent text-accent")}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
