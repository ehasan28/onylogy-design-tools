"use client";

import { useMemo } from "react";
import { Download } from "lucide-react";
import { CompactPairPicker } from "./CompactPairPicker";
import { CompactScaleControls } from "./CompactScaleControls";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { useTypographyStore } from "@/stores/typography-store";
import { exportTypography } from "@/lib/exporters/typography";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { downloadText } from "@/lib/utils/download";
import type { TypographyTheme } from "@/lib/types";
import { findClosestRatioName } from "@/lib/typography/scale";
import { ToolShell } from "@/components/layout/tool-shell";

export function TailwindTypographyWorkspace() {
  const pair = useTypographyStore((s) => s.pair);
  const basePx = useTypographyStore((s) => s.basePx);
  const ratio = useTypographyStore((s) => s.ratio);
  const ratioName = useTypographyStore((s) => s.ratioName);
  const steps = useTypographyStore((s) => s.steps);

  const theme: TypographyTheme = useMemo(
    () => ({
      heading: pair.heading,
      body: pair.body,
      basePx,
      ratio,
      ratioName: ratioName ?? findClosestRatioName(ratio),
      steps,
    }),
    [pair, basePx, ratio, ratioName, steps],
  );

  const generated = useMemo(
    () => exportTypography("tailwind", theme),
    [theme],
  );

  return (
    <ToolShell
      actions={<CompactPairPicker />}
      controls={<CompactScaleControls />}
      canvas={
        <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          <ScaleVisualizer />
          <div className="rounded-2xl border border-line bg-bg-elev/40">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-fg">
                  tailwind.config — theme.extend
                </h3>
                <p className="text-xs text-fg-muted">
                  Each fontSize uses the tuple shorthand.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton value={generated} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    downloadText(
                      generated,
                      "tailwind.typography.js",
                      "text/javascript",
                    )
                  }
                  className="gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
            <pre className="max-h-[640px] overflow-auto rounded-b-2xl bg-bg p-4 font-mono text-xs leading-relaxed text-fg tabular scrollbar-thin">
              <code>{generated}</code>
            </pre>
          </div>
        </div>
      }
    />
  );
}
