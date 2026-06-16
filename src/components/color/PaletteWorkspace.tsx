"use client";

import { useState } from "react";
import { CompactPresetPicker } from "./CompactPresetPicker";
import { CompactPaletteRow } from "./CompactPaletteRow";
import { PaletteTools } from "./PaletteTools";
import { CvdFilters, CvdToggle, cvdFilter } from "./CvdSim";
import { ContrastReport } from "./ContrastReport";
import { ColorExportDrawer } from "./ExportDrawer";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewNavbar,
  PreviewHero,
  PreviewPricingCard,
  PreviewButtonShowcase,
  PreviewBlogCard,
  PreviewEcommerceCard,
  PreviewFormShowcase,
  PreviewAlertsBadges,
  PreviewTableShowcase,
  PreviewModalShowcase,
  PreviewDashboardWidget,
} from "@/components/preview";
import type { CvdType } from "@/lib/color/cvd";
import { usePreviewTheme } from "@/stores/theme-store";
import { ToolShell } from "@/components/layout/tool-shell";

/**
 * Full palette workspace with sticky top controls and a full-width canvas.
 */
export function PaletteWorkspace() {
  const theme = usePreviewTheme();
  const [cvd, setCvd] = useState<CvdType>("none");

  return (
    <>
      <CvdFilters />
      <ToolShell
        actions={<CompactPresetPicker />}
        controls={
          <div className="space-y-3">
            <CompactPaletteRow />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PaletteTools />
              <CvdToggle value={cvd} onChange={setCvd} />
            </div>
          </div>
        }
        canvas={
          <div
            className="space-y-6"
            style={{ filter: cvdFilter(cvd) }}
          >
            <PreviewProvider
              theme={theme}
              framed={false}
              className="grid gap-4 md:grid-cols-2"
            >
              <PreviewFrame
                title="Navigation"
                description="Sticky top nav with brand, links, and CTA."
              >
                <PreviewNavbar />
              </PreviewFrame>
              <PreviewFrame
                title="Buttons"
                description="Primary, secondary, accent, outline, ghost, destructive."
              >
                <PreviewButtonShowcase />
              </PreviewFrame>
              <PreviewFrame
                title="Marketing hero"
                description="Hero with primary and secondary CTAs."
                className="md:col-span-2"
              >
                <PreviewHero />
              </PreviewFrame>
              <PreviewFrame
                title="Pricing tiers"
                description="Three-tier pricing layout."
                className="md:col-span-2"
              >
                <PreviewPricingCard />
              </PreviewFrame>
              <PreviewFrame title="Blog card">
                <PreviewBlogCard />
              </PreviewFrame>
              <PreviewFrame title="Ecommerce card">
                <PreviewEcommerceCard />
              </PreviewFrame>
              <PreviewFrame title="Form">
                <PreviewFormShowcase />
              </PreviewFrame>
              <PreviewFrame title="Alerts & badges">
                <PreviewAlertsBadges />
              </PreviewFrame>
              <PreviewFrame
                title="Tables"
                description="Data table with semantic status."
                className="md:col-span-2"
              >
                <PreviewTableShowcase />
              </PreviewFrame>
              <PreviewFrame title="Modal">
                <PreviewModalShowcase />
              </PreviewFrame>
              <PreviewFrame title="Dashboard widget">
                <PreviewDashboardWidget />
              </PreviewFrame>
            </PreviewProvider>
          </div>
        }
        trailing={
          <div className="grid gap-6 lg:grid-cols-2">
            <ContrastReport />
            <ColorExportDrawer />
          </div>
        }
      />
    </>
  );
}
