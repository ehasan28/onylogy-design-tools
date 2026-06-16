"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface ToolShellProps {
  /** Compact action bar — sticky at the top of the workspace. */
  actions?: ReactNode;
  /** Primary controls panel below the action bar (still sticky). */
  controls?: ReactNode;
  /** Full-width canvas (previews, scale visualizer, etc). */
  canvas: ReactNode;
  /** Below-canvas section (e.g. export drawer). */
  trailing?: ReactNode;
  className?: string;
}

/**
 * Unified tool layout: an optional sticky action bar (compact), an optional
 * controls panel (also sticky on desktop), then a full-width canvas, then
 * trailing content (exports). Replaces the previous left-sidebar layout so
 * controls float at the top across every tool.
 */
export function ToolShell({
  actions,
  controls,
  canvas,
  trailing,
  className,
}: ToolShellProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {(actions || controls) && (
        <div className="sticky top-14 z-30 border-b border-line bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
          {actions && (
            <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
              {actions}
            </div>
          )}
          {controls && (
            <div className="border-t border-line/60">
              <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
                {controls}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {canvas}
      </div>
      {trailing && (
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
          {trailing}
        </div>
      )}
    </div>
  );
}

/**
 * Horizontal scrollable strip — used inside `actions` or `controls` for
 * groups of chips that overflow on narrow viewports.
 */
export function ToolStrip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "scrollbar-thin -mx-1 flex items-center gap-2 overflow-x-auto px-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
