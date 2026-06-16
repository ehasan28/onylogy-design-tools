"use client";

import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewButtonShowcase,
  PreviewPricingCard,
  PreviewHero,
} from "@/components/preview";
import { bestForeground } from "@/lib/color/contrast";
import { mergePreviewTheme } from "@/lib/preview/default-theme";
import { ToolShell } from "@/components/layout/tool-shell";

export function SingleColorWorkspace() {
  const [color, setColor] = useState("#6366f1");
  const fg = bestForeground(color);
  const theme = mergePreviewTheme({
    colors: {
      primary: color,
      primaryForeground: fg,
      accent: color,
      accentForeground: fg,
    },
  });

  return (
    <ToolShell
      controls={
        <div className="grid gap-4 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-start">
          <div>
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
              Pick a color
            </h3>
            <ColorPicker value={color} onChange={setColor} />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm text-fg-muted">
              Edit the color in any format. The previews below apply it as
              the primary and accent.
            </p>
          </div>
        </div>
      }
      canvas={
        <PreviewProvider
          theme={theme}
          framed={false}
          className="grid gap-4 md:grid-cols-2"
        >
          <PreviewFrame
            title="Hero with your color"
            description="Primary and accent set to the picked value."
            className="md:col-span-2"
          >
            <PreviewHero />
          </PreviewFrame>
          <PreviewFrame title="Button system" className="md:col-span-2">
            <PreviewButtonShowcase />
          </PreviewFrame>
          <PreviewFrame
            title="Pricing"
            description="Featured tier uses your color as its primary surface."
            className="md:col-span-2"
          >
            <PreviewPricingCard />
          </PreviewFrame>
        </PreviewProvider>
      }
    />
  );
}
