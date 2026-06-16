"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useColorStore } from "@/stores/color-store";
import {
  COLOR_EXPORT_FORMATS,
  exportColorPalette,
} from "@/lib/exporters/color";
import type { ColorExportFormat } from "@/lib/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { downloadText } from "@/lib/utils/download";

export function ColorExportDrawer() {
  const semantic = useColorStore((s) => s.semantic);
  const [format, setFormat] = useState<ColorExportFormat>("css-vars");
  const formatMeta = COLOR_EXPORT_FORMATS.find((f) => f.value === format)!;

  const generated = useMemo(
    () => exportColorPalette(format, semantic),
    [format, semantic],
  );

  return (
    <div className="rounded-2xl border border-line bg-bg-elev/40">
      <div className="border-b border-line px-4 py-3">
        <h3 className="text-sm font-semibold text-fg">Export</h3>
        <p className="text-xs text-fg-muted">
          Copy the snippet or download a file in your preferred format.
        </p>
      </div>
      <Tabs
        value={format}
        onValueChange={(v) => setFormat(v as ColorExportFormat)}
      >
        <TabsList className="overflow-x-auto">
          {COLOR_EXPORT_FORMATS.map((f) => (
            <TabsTrigger
              key={f.value}
              value={f.value}
              layoutId="color-export-indicator"
            >
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {COLOR_EXPORT_FORMATS.map((f) => (
          <TabsContent key={f.value} value={f.value} className="p-3">
            <div className="flex items-center justify-end gap-2 pb-2">
              <CopyButton value={generated} size="sm" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  downloadText(
                    generated,
                    `onylogy-palette.${formatMeta.extension}`,
                  )
                }
                className="gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </div>
            <pre className="max-h-96 overflow-auto rounded-lg border border-line bg-bg p-3 font-mono text-xs leading-relaxed text-fg tabular scrollbar-thin">
              <code>{generated}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
