"use client";

import { useRef, useState } from "react";
import { Upload, ImageIcon, ArrowRight } from "lucide-react";
import { extractClusters, clustersToPalette } from "@/lib/color/extract-image";
import { rgbaToHex } from "@/lib/color/convert";
import { useColorStore } from "@/stores/color-store";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { ToolShell } from "@/components/layout/tool-shell";
import { bestForeground } from "@/lib/color/contrast";
import type { Cluster } from "@/lib/color/cluster";

interface ExtractedSwatch {
  hex: string;
  percentage: number;
}

export function ImagePaletteWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [swatches, setSwatches] = useState<ExtractedSwatch[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [busy, setBusy] = useState(false);
  const semantic = useColorStore((s) => s.semantic);
  const loadPalette = useColorStore((s) => s.loadPalette);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setBusy(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current ?? document.createElement("canvas");
      const maxDim = 400;
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setBusy(false);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const found = extractClusters(data, 8);
      const totalArea = found.reduce((s, c) => s + c.area, 0) || 1;
      setClusters(found);
      setSwatches(
        found.map((c) => ({
          hex: rgbaToHex(c.rgba),
          percentage: Math.round((c.area / totalArea) * 1000) / 10,
        })),
      );
      setBusy(false);
    };
    img.onerror = () => setBusy(false);
    img.src = url;
  };

  return (
    <ToolShell
      canvas={
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <label
              className="flex aspect-video cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-line bg-bg-elev/40 text-center transition-colors hover:bg-bg-elev"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleFile(file);
              }}
            >
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Uploaded preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Upload className="h-6 w-6" />
                  </span>
                  <div className="text-sm font-medium text-fg">
                    Drop an image or click to upload
                  </div>
                  <div className="text-xs text-fg-muted">
                    PNG, JPG, WebP — processed locally, never uploaded
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="rounded-2xl border border-line bg-bg-elev/40 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-fg">
                Extracted palette
              </h3>
              {swatches.length > 0 && (
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={() =>
                    loadPalette(clustersToPalette(clusters, semantic))
                  }
                >
                  Load into tools <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>

            {busy ? (
              <p className="mt-6 text-sm text-fg-muted">Extracting colors…</p>
            ) : swatches.length === 0 ? (
              <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center text-fg-muted">
                <ImageIcon className="h-8 w-8 opacity-50" />
                <p className="text-sm">
                  Upload an image to pull out its dominant colors.
                </p>
              </div>
            ) : (
              <ul className="mt-4 space-y-2">
                {swatches.map((s, i) => (
                  <li
                    key={`${s.hex}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-line bg-bg p-2"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[10px] font-medium"
                      style={{ background: s.hex, color: bestForeground(s.hex) }}
                    >
                      {s.percentage}%
                    </span>
                    <code className="flex-1 font-mono text-sm text-fg">
                      {s.hex.toUpperCase()}
                    </code>
                    <CopyButton value={s.hex.toUpperCase()} size="sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      }
    />
  );
}
