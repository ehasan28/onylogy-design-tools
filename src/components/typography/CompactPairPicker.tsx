"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTypographyStore } from "@/stores/typography-store";
import { FONT_PAIRS, pairsByCategory } from "@/lib/typography/pair-presets";
import { cn } from "@/lib/utils/cn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import type { FontPairCategory } from "@/lib/types";
import { GoogleFontsLoader } from "./GoogleFontsLoader";

const CATEGORIES: Array<{ id: FontPairCategory; label: string }> = [
  { id: "saas", label: "SaaS" },
  { id: "blog", label: "Blog" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "editorial", label: "Editorial" },
  { id: "minimal", label: "Minimal" },
];

/**
 * Top-bar pair picker — current pair shows as a button which opens a popover
 * with category chips and the list of pairs.
 */
export function CompactPairPicker() {
  const pair = useTypographyStore((s) => s.pair);
  const setPair = useTypographyStore((s) => s.setPair);
  const [category, setCategory] = useState<FontPairCategory>(pair.category);
  const [open, setOpen] = useState(false);
  const pairs = pairsByCategory(category);

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <GoogleFontsLoader pair={pair} />
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Pair
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex h-9 min-w-0 max-w-full items-center gap-3 rounded-full border border-line bg-bg-elev px-3 text-left text-sm transition-colors hover:bg-bg-elev-2"
          >
            <span className="truncate text-fg-muted">
              <span
                className="text-fg"
                style={{
                  fontFamily: `'${pair.heading.family}', ${pair.heading.fallback}`,
                  fontWeight: 600,
                }}
              >
                {pair.heading.family}
              </span>
              <span className="mx-1.5 opacity-50">/</span>
              <span
                className="text-fg"
                style={{
                  fontFamily: `'${pair.body.family}', ${pair.body.fallback}`,
                }}
              >
                {pair.body.family}
              </span>
            </span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-fg-dim" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[min(560px,calc(100vw-2rem))] p-3"
        >
          <ToggleGroup
            type="single"
            value={category}
            onValueChange={(v) => v && setCategory(v as FontPairCategory)}
            layoutGroupId="compact-pair-cat"
            className="w-full justify-start overflow-x-auto"
          >
            {CATEGORIES.map((c) => (
              <ToggleGroupItem key={c.id} value={c.id}>
                {c.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ul className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto scrollbar-thin">
            {pairs.map((p) => {
              const active = pair.id === p.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setPair(p.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left transition-colors",
                      active
                        ? "border-accent bg-accent-soft"
                        : "border-line bg-bg hover:bg-bg-elev",
                    )}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-fg-dim">
                      {p.name}
                    </div>
                    <div
                      className="mt-1 text-lg text-fg"
                      style={{
                        fontFamily: `'${p.heading.family}', ${p.heading.fallback}`,
                        fontWeight: 600,
                      }}
                    >
                      Headings shine here
                    </div>
                    <p
                      className="mt-0.5 text-xs text-fg-muted"
                      style={{
                        fontFamily: `'${p.body.family}', ${p.body.fallback}`,
                      }}
                    >
                      {p.description}
                    </p>
                    <GoogleFontsLoader pair={p} />
                  </button>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
      <span className="ml-auto hidden text-xs text-fg-muted sm:inline">
        {FONT_PAIRS.length} curated pairings
      </span>
    </div>
  );
}
