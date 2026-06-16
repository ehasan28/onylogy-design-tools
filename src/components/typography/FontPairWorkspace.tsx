"use client";

import { CompactPairPicker } from "./CompactPairPicker";
import { FontPairPicker } from "./FontPairPicker";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { TypographyExportDrawer } from "./ExportDrawer";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewHero,
  PreviewBlogCard,
} from "@/components/preview";
import { usePreviewTheme } from "@/stores/theme-store";
import { useTypographyStore } from "@/stores/typography-store";
import { GoogleFontsLoader } from "./GoogleFontsLoader";
import { ToolShell } from "@/components/layout/tool-shell";

export function FontPairWorkspace() {
  const theme = usePreviewTheme();
  const pair = useTypographyStore((s) => s.pair);
  return (
    <ToolShell
      actions={<CompactPairPicker />}
      canvas={
        <div className="space-y-6">
          <GoogleFontsLoader pair={pair} />
          <PreviewProvider theme={theme} framed={false} className="space-y-4">
            <PreviewFrame
              title="Hero showcase"
              description="See your pairing on a marketing hero."
            >
              <PreviewHero />
            </PreviewFrame>
            <PreviewFrame title="Editorial blog card">
              <PreviewBlogCard />
            </PreviewFrame>
          </PreviewProvider>
          <ScaleVisualizer />
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg-dim">
              Browse all pairings
            </h2>
            <FontPairPicker />
          </section>
        </div>
      }
      trailing={<TypographyExportDrawer />}
    />
  );
}
