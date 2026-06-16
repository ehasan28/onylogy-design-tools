"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useTypographyStore } from "@/stores/typography-store";
import {
  TYPOGRAPHY_EXPORT_FORMATS,
  exportTypography,
} from "@/lib/exporters/typography";
import type { TypographyExportFormat, TypographyTheme } from "@/lib/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CopyButton } from "@/components/shared/CopyButton";
import { Button } from "@/components/ui/button";
import { downloadText } from "@/lib/utils/download";
import { findClosestRatioName } from "@/lib/typography/scale";

export function TypographyExportDrawer({
  defaultFormat = "css-vars",
}: {
  defaultFormat?: TypographyExportFormat;
}) {
  const pair = useTypographyStore((s) => s.pair);
  const basePx = useTypographyStore((s) => s.basePx);
  const ratio = useTypographyStore((s) => s.ratio);
  const ratioName = useTypographyStore((s) => s.ratioName);
  const steps = useTypographyStore((s) => s.steps);
  const [format, setFormat] = useState<TypographyExportFormat>(defaultFormat);
  const meta = TYPOGRAPHY_EXPORT_FORMATS.find((f) => f.value === format)!;

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
    () => exportTypography(format, theme),
    [format, theme],
  );

  return (
    <div className="rounded-2xl border border-line bg-bg-elev/40">
      <div className="border-b border-line px-4 py-3">
        <h3 className="text-sm font-semibold text-fg">Export</h3>
        <p className="text-xs text-fg-muted">
          Copy or download in your preferred format.
        </p>
      </div>
      <Tabs
        value={format}
        onValueChange={(v) => setFormat(v as TypographyExportFormat)}
      >
        <TabsList className="overflow-x-auto">
          {TYPOGRAPHY_EXPORT_FORMATS.map((f) => (
            <TabsTrigger
              key={f.value}
              value={f.value}
              layoutId="type-export-indicator"
            >
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TYPOGRAPHY_EXPORT_FORMATS.map((f) => (
          <TabsContent key={f.value} value={f.value} className="p-3">
            <div className="flex items-center justify-end gap-2 pb-2">
              <CopyButton value={generated} size="sm" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  downloadText(
                    generated,
                    `onylogy-typography.${meta.extension}`,
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
