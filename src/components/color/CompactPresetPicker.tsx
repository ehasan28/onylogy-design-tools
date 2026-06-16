"use client";

import { Sparkles, Moon, Minus, Heart, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PalettePreset } from "@/lib/types";
import { useColorStore } from "@/stores/color-store";

const PRESET_META: Array<{
  id: PalettePreset;
  label: string;
  Icon: typeof Sparkles;
}> = [
  { id: "saas", label: "SaaS", Icon: Sparkles },
  { id: "dark", label: "Dark", Icon: Moon },
  { id: "minimal", label: "Minimal", Icon: Minus },
  { id: "pastel", label: "Pastel", Icon: Heart },
  { id: "accessible", label: "Accessible", Icon: Accessibility },
];

/**
 * Horizontal preset chip row — fits in the sticky top bar.
 */
export function CompactPresetPicker() {
  const preset = useColorStore((s) => s.preset);
  const generate = useColorStore((s) => s.generate);

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Preset
      </span>
      <div className="flex shrink-0 items-center gap-1">
        {PRESET_META.map(({ id, label, Icon }) => {
          const active = preset === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => generate(id, Math.floor(Math.random() * 360))}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                active
                  ? "bg-accent text-white"
                  : "bg-bg-elev text-fg-muted hover:bg-bg-elev-2 hover:text-fg",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
