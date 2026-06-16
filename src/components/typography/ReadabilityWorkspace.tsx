"use client";

import { useMemo, useState } from "react";
import { CompactPairPicker } from "./CompactPairPicker";
import { CompactScaleControls } from "./CompactScaleControls";
import { ReadabilityReport } from "./ReadabilityReport";
import { ScaleVisualizer } from "./ScaleVisualizer";
import { useTypographyStore } from "@/stores/typography-store";
import { analyzeReadingEase } from "@/lib/typography/flesch";
import { GoogleFontsLoader } from "./GoogleFontsLoader";
import { Slider } from "@/components/ui/slider";
import { ToolShell } from "@/components/layout/tool-shell";

const SAMPLE = `Typography exists to honour content. Robert Bringhurst writes that the type designer's first responsibility is to render the contents of a text faithfully — but those contents are only legible when the form, weight, size, and rhythm of the type cooperate. Long-form reading rewards restraint: 16px and up for body text, 45–75 characters per line, and a line height that breathes — usually 1.5 or more.`;

export function ReadabilityWorkspace() {
  const pair = useTypographyStore((s) => s.pair);
  const steps = useTypographyStore((s) => s.steps);
  const body = steps.find((s) => s.role === "body");
  const [width, setWidth] = useState(720);
  const [content, setContent] = useState(SAMPLE);

  const reading = useMemo(() => analyzeReadingEase(content), [content]);

  return (
    <ToolShell
      actions={<CompactPairPicker />}
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <CompactScaleControls />
          <div className="flex min-w-[220px] items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
              Width
            </span>
            <div className="flex flex-1 items-center gap-2">
              <Slider
                value={[width]}
                min={320}
                max={1200}
                step={20}
                onValueChange={(v) => setWidth(v[0] ?? 720)}
                className="min-w-[120px]"
              />
              <span className="shrink-0 font-mono text-xs tabular text-fg">
                {width}px
              </span>
            </div>
          </div>
        </div>
      }
      canvas={
        <div className="space-y-6">
          <GoogleFontsLoader pair={pair} />
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-line bg-bg p-6 sm:p-8">
                <div style={{ maxWidth: width, margin: "0 auto" }}>
                  <p
                    style={{
                      fontFamily: `'${pair.body.family}', ${pair.body.fallback}`,
                      fontSize: `${body?.fontSizePx ?? 16}px`,
                      lineHeight: body?.lineHeight ?? 1.6,
                      color: "var(--token-fg)",
                    }}
                  >
                    {content}
                  </p>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
                  Paste your own content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="w-full resize-y rounded-xl border border-line bg-bg p-3 text-sm text-fg outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
                  placeholder="Paste body copy to score its readability…"
                />
              </div>
            </div>
            <div className="space-y-6">
              <ReadabilityReport containerWidthPx={width} />
              <section className="rounded-2xl border border-line bg-bg-elev/40 p-5">
                <h3 className="text-sm font-semibold text-fg">
                  Reading ease
                </h3>
                <p className="text-xs text-fg-muted">
                  Flesch reading ease &amp; Flesch–Kincaid grade for your text.
                </p>
                <div className="mt-4 flex items-end gap-4">
                  <div>
                    <div className="font-mono text-4xl font-semibold text-fg tabular">
                      {reading.ease}
                    </div>
                    <div className="text-[11px] text-fg-muted">/ 100 ease</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-semibold text-fg tabular">
                      {reading.grade}
                    </div>
                    <div className="text-[11px] text-fg-muted">grade level</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-fg-muted">{reading.label}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fg-dim tabular">
                  <span>{reading.words} words</span>
                  <span>{reading.sentences} sentences</span>
                  <span>{reading.syllables} syllables</span>
                </div>
              </section>
            </div>
          </div>
          <ScaleVisualizer />
        </div>
      }
    />
  );
}
