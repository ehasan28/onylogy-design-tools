"use client";

import { useMemo } from "react";
import { Download } from "lucide-react";
import { CompactPresetPicker } from "./CompactPresetPicker";
import { CompactPaletteRow } from "./CompactPaletteRow";
import { useColorStore } from "@/stores/color-store";
import { exportColorPalette } from "@/lib/exporters/color";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { downloadText } from "@/lib/utils/download";
import { ToolShell } from "@/components/layout/tool-shell";

/**
 * A focused workspace that always emits a Tailwind-format export.
 */
export function TailwindFocusedWorkspace() {
  const semantic = useColorStore((s) => s.semantic);

  const generated = useMemo(
    () => exportColorPalette("tailwind", semantic),
    [semantic],
  );

  return (
    <ToolShell
      actions={<CompactPresetPicker />}
      controls={<CompactPaletteRow />}
      canvas={
        <div className="rounded-2xl border border-line bg-bg-elev/40">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-fg">
                tailwind.config — theme.extend.colors
              </h3>
              <p className="text-xs text-fg-muted">
                Paste into your Tailwind config (v3 or v4).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton value={generated} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  downloadText(generated, "tailwind.colors.js", "text/javascript")
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
