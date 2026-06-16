"use client";

import { useState } from "react";
import { Shuffle, Lock, Unlock } from "lucide-react";
import { useColorStore } from "@/stores/color-store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from "./ColorPicker";
import { bestForeground } from "@/lib/color/contrast";
import { cn } from "@/lib/utils/cn";

/**
 * Horizontally laid-out palette swatches for the top control bar. Each swatch
 * is a small square that opens the color picker on click.
 */
export function CompactPaletteRow() {
  const swatches = useColorStore((s) => s.swatches);
  const toggleLock = useColorStore((s) => s.toggleLock);
  const setSwatchColor = useColorStore((s) => s.setSwatchColor);
  const randomize = useColorStore((s) => s.randomize);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Palette
      </span>
      <div className="flex flex-1 flex-wrap items-center gap-1.5">
        {swatches.map((swatch, index) => {
          const fg = bestForeground(swatch.hex);
          return (
            <Popover
              key={`${swatch.role ?? index}-${index}`}
              open={openIndex === index}
              onOpenChange={(o) => setOpenIndex(o ? index : null)}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring sm:h-10 sm:w-10",
                    "hover:-translate-y-0.5 hover:shadow-pop",
                  )}
                  style={{ background: swatch.hex, color: fg }}
                  aria-label={`${swatch.role ?? "swatch"} ${swatch.hex}`}
                  title={`${swatch.role ?? ""} · ${swatch.hex.toUpperCase()}`}
                >
                  {swatch.locked && (
                    <Lock className="h-3 w-3 opacity-80" />
                  )}
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLock(index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLock(index);
                      }
                    }}
                    className="absolute -right-1 -top-1 hidden h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-line bg-bg text-fg opacity-0 transition-opacity group-hover:flex group-hover:opacity-100"
                    aria-label={swatch.locked ? "Unlock" : "Lock"}
                  >
                    {swatch.locked ? (
                      <Lock className="h-2.5 w-2.5" />
                    ) : (
                      <Unlock className="h-2.5 w-2.5" />
                    )}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ColorPicker
                  value={swatch.hex}
                  onChange={(hex) => setSwatchColor(index, hex)}
                />
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => randomize()}
        className="ml-auto gap-1.5"
      >
        <Shuffle className="h-3.5 w-3.5" />
        Randomise
      </Button>
    </div>
  );
}
