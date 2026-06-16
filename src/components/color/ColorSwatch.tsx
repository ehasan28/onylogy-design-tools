"use client";

import { forwardRef } from "react";
import { Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CopyButton } from "@/components/shared/CopyButton";
import { bestForeground } from "@/lib/color/contrast";
import { copyToClipboard } from "@/lib/utils/clipboard";
import type { Swatch } from "@/lib/types";

export interface ColorSwatchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  swatch: Swatch;
  onToggleLock?: () => void;
  showLock?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "h-16",
  md: "h-24",
  lg: "h-32",
} as const;

/**
 * Renders as a div with role="button" so it can be safely nested inside other
 * interactive elements (e.g. a Radix Popover trigger). All click handling
 * goes through onClick.
 */
export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
  function ColorSwatch(
    {
      swatch,
      onClick,
      onToggleLock,
      showLock = true,
      size = "md",
      className,
      ...rest
    },
    ref,
  ) {
    const fg = bestForeground(swatch.hex);
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        {...rest}
        className={cn(
          "group relative flex w-full cursor-pointer flex-col items-start justify-between rounded-xl border border-line p-3 text-left transition-transform hover:-translate-y-0.5 hover:shadow-pop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring",
          SIZE_MAP[size],
          className,
        )}
        style={{ background: swatch.hex, color: fg }}
      >
        <div className="flex w-full items-start justify-between gap-2">
          <span className="text-[10px] uppercase tracking-wider opacity-80">
            {swatch.role ?? "swatch"}
          </span>
          {showLock && (
            <span
              role="button"
              tabIndex={0}
              aria-label={swatch.locked ? "Unlock" : "Lock"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLock?.();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleLock?.();
                }
              }}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
            >
              {swatch.locked ? (
                <Lock className="h-3 w-3" />
              ) : (
                <Unlock className="h-3 w-3 opacity-60" />
              )}
            </span>
          )}
        </div>
        <div className="flex w-full items-end justify-between gap-2">
          <span className="font-mono text-sm font-medium tabular">
            {swatch.hex.toUpperCase()}
          </span>
          <span
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <CopyButton
              value={swatch.hex}
              size="sm"
              className="border-white/20 bg-white/10 text-current hover:bg-white/20"
            />
          </span>
        </div>
      </div>
    );
  },
);

/** Lightweight inline copy helper retained for future direct use. */
export async function copySwatchHex(hex: string): Promise<boolean> {
  return copyToClipboard(hex);
}
