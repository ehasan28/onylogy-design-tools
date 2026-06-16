"use client";

import { CompactPairPicker } from "./CompactPairPicker";
import { CompactScaleControls } from "./CompactScaleControls";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { TypographyExportDrawer } from "./ExportDrawer";
import { GoogleFontsLoader } from "./GoogleFontsLoader";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewHero,
  PreviewBlogCard,
} from "@/components/preview";
import { usePreviewTheme } from "@/stores/theme-store";
import { useTypographyStore } from "@/stores/typography-store";
import { ToolShell } from "@/components/layout/tool-shell";

export function ScaleWorkspace() {
  const theme = usePreviewTheme();
  const pair = useTypographyStore((s) => s.pair);
  return (
    <ToolShell
      actions={<CompactPairPicker />}
      controls={<CompactScaleControls />}
      canvas={
        <div className="space-y-6">
          <GoogleFontsLoader pair={pair} />
          <ScaleVisualizer />
          <PreviewProvider theme={theme} framed={false} className="space-y-4">
            <PreviewFrame title="Hero preview">
              <PreviewHero />
            </PreviewFrame>
            <PreviewFrame title="Long-form content">
              <PreviewBlogCard />
            </PreviewFrame>
          </PreviewProvider>
        </div>
      }
      trailing={<TypographyExportDrawer />}
    />
  );
}
