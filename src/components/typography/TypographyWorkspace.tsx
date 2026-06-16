"use client";

import { CompactPairPicker } from "./CompactPairPicker";
import { CompactScaleControls } from "./CompactScaleControls";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { ReadabilityReport } from "./ReadabilityReport";
import { TypographyExportDrawer } from "./ExportDrawer";
import { GoogleFontsLoader } from "./GoogleFontsLoader";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewHero,
  PreviewPricingCard,
  PreviewButtonShowcase,
  PreviewBlogCard,
  PreviewFormShowcase,
  PreviewDashboardWidget,
} from "@/components/preview";
import { usePreviewTheme } from "@/stores/theme-store";
import { useTypographyStore } from "@/stores/typography-store";
import { ToolShell } from "@/components/layout/tool-shell";

export function TypographyWorkspace() {
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
          <PreviewProvider
            theme={theme}
            framed={false}
            className="grid gap-4 md:grid-cols-2"
          >
            <PreviewFrame title="Hero typography" className="md:col-span-2">
              <PreviewHero />
            </PreviewFrame>
            <PreviewFrame title="Pricing tiers" className="md:col-span-2">
              <PreviewPricingCard />
            </PreviewFrame>
            <PreviewFrame title="Buttons">
              <PreviewButtonShowcase />
            </PreviewFrame>
            <PreviewFrame title="Form typography">
              <PreviewFormShowcase />
            </PreviewFrame>
            <PreviewFrame title="Blog card">
              <PreviewBlogCard />
            </PreviewFrame>
            <PreviewFrame title="Dashboard">
              <PreviewDashboardWidget />
            </PreviewFrame>
          </PreviewProvider>
        </div>
      }
      trailing={
        <div className="grid gap-6 lg:grid-cols-2">
          <ReadabilityReport />
          <TypographyExportDrawer />
        </div>
      }
    />
  );
}
