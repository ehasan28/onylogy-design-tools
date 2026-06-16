"use client";

import { Sparkles, Moon, Minus, Heart, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PalettePreset } from "@/lib/types";
import { useColorStore } from "@/stores/color-store";

const PRESET_META: Array<{
  id: PalettePreset;
  label: string;
  description: string;
  Icon: typeof Sparkles;
}> = [
  {
    id: "saas",
    label: "SaaS",
    description: "Vibrant, modern product UI palette.",
    Icon: Sparkles,
  },
  {
    id: "dark",
    label: "Dark",
    description: "Deep surfaces with luminous accents.",
    Icon: Moon,
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Restrained neutrals + tonal accent.",
    Icon: Minus,
  },
  {
    id: "pastel",
    label: "Pastel",
    description: "Soft, airy tones with low chroma.",
    Icon: Heart,
  },
  {
    id: "accessible",
    label: "Accessible",
    description: "WCAG AA-tuned defaults.",
    Icon: Accessibility,
  },
];

export function PalettePresetPicker() {
  const preset = useColorStore((s) => s.preset);
  const generate = useColorStore((s) => s.generate);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {PRESET_META.map(({ id, label, description, Icon }) => {
        const active = preset === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => generate(id, Math.floor(Math.random() * 360))}
            className={cn(
              "group flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors",
              active
                ? "border-accent bg-accent-soft text-fg"
                : "border-line bg-bg-elev/60 hover:bg-bg-elev",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                active ? "text-accent" : "text-fg-muted",
              )}
            />
            <span className="text-sm font-medium text-fg">{label}</span>
            <span className="text-xs leading-snug text-fg-muted">
              {description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
