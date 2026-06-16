"use client";

import { useMemo, useState } from "react";
import { Check, X, Wand2 } from "lucide-react";
import { contrastRatioHex, wcagBadges } from "@/lib/color/contrast";
import { apcaContrast, apcaLevel } from "@/lib/color/apca";
import { suggestForegroundFix } from "@/lib/color/suggest";
import { ColorPicker } from "./ColorPicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolShell } from "@/components/layout/tool-shell";

interface PairState {
  fg: string;
  bg: string;
}

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog";

export function PairContrastChecker({
  initialFg = "#0a0a0a",
  initialBg = "#ffffff",
}: {
  initialFg?: string;
  initialBg?: string;
}) {
  const [pair, setPair] = useState<PairState>({
    fg: initialFg,
    bg: initialBg,
  });

  const ratio = useMemo(
    () => contrastRatioHex(pair.fg, pair.bg),
    [pair.fg, pair.bg],
  );
  const badges = wcagBadges(ratio);
  const lc = useMemo(() => apcaContrast(pair.fg, pair.bg), [pair.fg, pair.bg]);
  const lcLevel = apcaLevel(lc);
  const suggestion = useMemo(
    () =>
      badges.aaNormal ? null : suggestForegroundFix(pair.fg, pair.bg, 4.5),
    [pair.fg, pair.bg, badges.aaNormal],
  );

  return (
    <ToolShell
      controls={
        <div className="grid gap-4 md:grid-cols-2">
          <section>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
              Foreground
            </h3>
            <ColorPicker
              value={pair.fg}
              onChange={(hex) => setPair((p) => ({ ...p, fg: hex }))}
            />
          </section>
          <section>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
              Background
            </h3>
            <ColorPicker
              value={pair.bg}
              onChange={(hex) => setPair((p) => ({ ...p, bg: hex }))}
            />
          </section>
        </div>
      }
      canvas={
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
          <div
            className="min-h-[280px] rounded-2xl border border-line p-6 sm:p-8"
            style={{ background: pair.bg, color: pair.fg }}
          >
            <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Large heading — 24px+
            </p>
            <p className="mt-3 text-base leading-relaxed">{SAMPLE_TEXT}</p>
            <p className="mt-4 text-sm leading-relaxed opacity-90">
              Body text — {SAMPLE_TEXT}
            </p>
            <p className="mt-4 text-xs leading-relaxed opacity-80">
              Caption text — {SAMPLE_TEXT}
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-bg-elev/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-fg-dim">
                    WCAG 2.x
                  </span>
                  <div className="font-mono text-4xl font-semibold text-fg tabular">
                    {badges.ratio.toFixed(2)}:1
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-fg-dim">
                    APCA (WCAG 3)
                  </span>
                  <div className="font-mono text-4xl font-semibold text-fg tabular">
                    {lc}
                  </div>
                  <div className="text-[11px] text-fg-muted">
                    {lcLevel.label} · {lcLevel.use}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Result label="AA" passed={badges.aaNormal} />
                <Result label="AA Large" passed={badges.aaLarge} />
                <Result label="AAA" passed={badges.aaaNormal} />
                <Result label="AAA Large" passed={badges.aaaLarge} />
              </div>
              <p className="mt-4 text-sm text-fg-muted">
                {badges.aaaNormal
                  ? "Excellent contrast across all body and UI use cases."
                  : badges.aaNormal
                    ? "Meets WCAG AA for body text. Consider a stronger pair for AAA."
                    : badges.aaLarge
                      ? "OK for large or display text only. Body text will fail AA."
                      : "Fails WCAG AA. Increase contrast before shipping body text."}
              </p>
            </div>

            {suggestion && suggestion.hex.toLowerCase() !== pair.fg.toLowerCase() && (
              <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <Wand2 className="h-4 w-4 text-accent" />
                  Suggested fix
                </div>
                <p className="mt-1 text-sm text-fg-muted">
                  Nudge the foreground to pass AA (4.5:1):
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="h-9 w-9 shrink-0 rounded-md border border-line"
                    style={{ background: suggestion.hex }}
                  />
                  <code className="font-mono text-sm text-fg">
                    {suggestion.hex.toUpperCase()}
                  </code>
                  <span className="text-xs text-fg-muted">
                    {suggestion.ratio.toFixed(2)}:1
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-auto"
                    onClick={() =>
                      setPair((p) => ({ ...p, fg: suggestion.hex }))
                    }
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}

function Result({ label, passed }: { label: string; passed: boolean }) {
  return (
    <Badge variant={passed ? "ok" : "bad"} size="lg">
      {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {label}
    </Badge>
  );
}
