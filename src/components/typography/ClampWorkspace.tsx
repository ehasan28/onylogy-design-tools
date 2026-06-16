"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { ClampBuilder } from "./ClampBuilder";
import { CompactScaleControls } from "./CompactScaleControls";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { useTypographyStore } from "@/stores/typography-store";
import { exportClamp } from "@/lib/exporters/typography/clamp";
import type { TypographyTheme } from "@/lib/types";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { downloadText } from "@/lib/utils/download";
import { findClosestRatioName } from "@/lib/typography/scale";
import { ToolShell } from "@/components/layout/tool-shell";
import { cn } from "@/lib/utils/cn";

export function ClampWorkspace() {
  const pair = useTypographyStore((s) => s.pair);
  const basePx = useTypographyStore((s) => s.basePx);
  const ratio = useTypographyStore((s) => s.ratio);
  const ratioName = useTypographyStore((s) => s.ratioName);
  const steps = useTypographyStore((s) => s.steps);
  const [scaleAtMin, setScaleAtMin] = useState(0.78);

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
    () => exportClamp(theme, { scaleAtMin }),
    [theme, scaleAtMin],
  );

  return (
    <ToolShell
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <CompactScaleControls />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
              Mobile size
            </span>
            <div className="flex items-center gap-1">
              {[0.65, 0.78, 0.9].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setScaleAtMin(v)}
                  className={cn(
                    "inline-flex h-8 items-center rounded-full px-3 font-mono text-xs tabular transition-colors",
                    Math.abs(scaleAtMin - v) < 0.001
                      ? "bg-accent text-white"
                      : "bg-bg-elev text-fg-muted hover:bg-bg-elev-2 hover:text-fg",
                  )}
                >
                  {Math.round(v * 100)}%
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="grid gap-6 lg:grid-cols-2">
          <ClampBuilder />
          <ScaleVisualizer />
        </div>
      }
      trailing={
        <div className="rounded-2xl border border-line bg-bg-elev/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-fg">
                Fluid typography CSS
              </h3>
              <p className="text-xs text-fg-muted">
                One declaration per role — interpolates between min and max
                viewport.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton value={generated} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  downloadText(generated, "onylogy-clamp.css", "text/css")
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
      }
    />
  );
}
