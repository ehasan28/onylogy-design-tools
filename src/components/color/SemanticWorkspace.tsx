"use client";

import { CompactPresetPicker } from "./CompactPresetPicker";
import { CompactPaletteRow } from "./CompactPaletteRow";
import { SemanticRoleEditor } from "./SemanticRoleEditor";
import { ContrastReport } from "./ContrastReport";
import { ColorExportDrawer } from "./ExportDrawer";
import {
  PreviewProvider,
  PreviewFrame,
  PreviewNavbar,
  PreviewHero,
  PreviewPricingCard,
  PreviewButtonShowcase,
  PreviewFormShowcase,
  PreviewAlertsBadges,
} from "@/components/preview";
import { usePreviewTheme } from "@/stores/theme-store";
import { ToolShell } from "@/components/layout/tool-shell";

export function SemanticWorkspace() {
  const theme = usePreviewTheme();
  return (
    <ToolShell
      actions={<CompactPresetPicker />}
      controls={<CompactPaletteRow />}
      canvas={
        <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          <SemanticRoleEditor />
          <PreviewProvider
            theme={theme}
            framed={false}
            className="grid gap-4 md:grid-cols-2"
          >
            <PreviewFrame title="Navigation" className="md:col-span-2">
              <PreviewNavbar />
            </PreviewFrame>
            <PreviewFrame title="Hero" className="md:col-span-2">
              <PreviewHero />
            </PreviewFrame>
            <PreviewFrame title="Pricing" className="md:col-span-2">
              <PreviewPricingCard />
            </PreviewFrame>
            <PreviewFrame title="Buttons">
              <PreviewButtonShowcase />
            </PreviewFrame>
            <PreviewFrame title="Form">
              <PreviewFormShowcase />
            </PreviewFrame>
            <PreviewFrame title="Alerts & badges" className="md:col-span-2">
              <PreviewAlertsBadges />
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
  );
}
