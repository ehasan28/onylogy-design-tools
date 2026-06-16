"use client";

import { useState, type ReactNode } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Viewport = "mobile" | "tablet" | "desktop";

const WIDTHS: Record<Viewport, string> = {
  mobile: "max-w-[380px]",
  tablet: "max-w-[760px]",
  desktop: "max-w-[1100px]",
};

export interface PreviewFrameProps {
  title?: string;
  description?: string;
  defaultViewport?: Viewport;
  className?: string;
  children: ReactNode;
}

export function PreviewFrame({
  title,
  description,
  defaultViewport = "desktop",
  className,
  children,
}: PreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>(defaultViewport);

  return (
    <section
      className={cn(
        "rounded-2xl border border-line bg-bg-elev/30",
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex flex-col">
          {title && (
            <h3 className="text-sm font-semibold text-fg">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-fg-muted">{description}</p>
          )}
        </div>
        <div className="inline-flex items-center gap-0.5 rounded-full border border-line bg-bg p-0.5 text-fg-muted">
          {(
            [
              { id: "mobile", icon: Smartphone, label: "Mobile" },
              { id: "tablet", icon: Tablet, label: "Tablet" },
              { id: "desktop", icon: Monitor, label: "Desktop" },
            ] as const
          ).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setViewport(id)}
              aria-label={label}
              aria-pressed={viewport === id}
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                viewport === id
                  ? "bg-accent text-white"
                  : "hover:bg-bg-elev hover:text-fg",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </header>
      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.015)_8px,rgba(0,0,0,0.015)_16px)] p-4 sm:p-6">
        <div className={cn("w-full transition-all", WIDTHS[viewport])}>
          {children}
        </div>
      </div>
    </section>
  );
}
