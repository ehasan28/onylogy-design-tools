"use client";

import { CVD_TYPES, type CvdType } from "@/lib/color/cvd";
import { cn } from "@/lib/utils/cn";

/** CSS `filter` value to apply for a given CVD type. */
export function cvdFilter(type: CvdType): string | undefined {
  if (type === "none") return undefined;
  if (type === "achromatopsia") return "grayscale(1)";
  return `url(#cvd-${type})`;
}

/**
 * Hidden SVG feColorMatrix definitions used to simulate color-vision
 * deficiencies on any element via `filter: url(#cvd-…)`.
 */
export function CvdFilters() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        <filter id="cvd-protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"
          />
        </filter>
        <filter id="cvd-deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
          />
        </filter>
        <filter id="cvd-tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function CvdToggle({
  value,
  onChange,
}: {
  value: CvdType;
  onChange: (t: CvdType) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-dim">
        Vision
      </span>
      {CVD_TYPES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          title={t.note}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            value === t.id
              ? "bg-accent-soft text-accent"
              : "text-fg-muted hover:bg-bg-elev hover:text-fg",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
