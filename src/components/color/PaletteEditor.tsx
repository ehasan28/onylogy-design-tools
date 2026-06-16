"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import { useColorStore } from "@/stores/color-store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorSwatch } from "./ColorSwatch";
import { ColorPicker } from "./ColorPicker";

export function PaletteEditor() {
  const swatches = useColorStore((s) => s.swatches);
  const toggleLock = useColorStore((s) => s.toggleLock);
  const setSwatchColor = useColorStore((s) => s.setSwatchColor);
  const randomize = useColorStore((s) => s.randomize);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-fg">Palette</h3>
          <p className="text-xs text-fg-muted">
            Click a swatch to edit. Use lock to keep colors when randomising.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => randomize()}
          className="gap-1.5"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Randomise
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {swatches.map((swatch, index) => (
          <Popover
            key={`${swatch.role ?? index}-${index}`}
            open={openIndex === index}
            onOpenChange={(o) => setOpenIndex(o ? index : null)}
          >
            <PopoverTrigger asChild>
              <ColorSwatch
                swatch={swatch}
                onClick={() => setOpenIndex(index)}
                onToggleLock={() => toggleLock(index)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ColorPicker
                value={swatch.hex}
                onChange={(hex) => setSwatchColor(index, hex)}
              />
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
