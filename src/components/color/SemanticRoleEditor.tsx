"use client";

import { useColorStore } from "@/stores/color-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColorPicker } from "./ColorPicker";
import { bestForeground } from "@/lib/color/contrast";
import type { SemanticRole } from "@/lib/types";

const ROLE_ORDER: Array<{
  role: SemanticRole;
  label: string;
  description: string;
}> = [
  { role: "primary", label: "Primary", description: "Brand CTA and key emphasis." },
  { role: "secondary", label: "Secondary", description: "Supporting actions." },
  { role: "accent", label: "Accent", description: "Highlights and badges." },
  { role: "muted", label: "Muted", description: "Secondary text and captions." },
  { role: "background", label: "Background", description: "Page background." },
  { role: "surface", label: "Surface", description: "Cards and elevated content." },
  { role: "foreground", label: "Foreground", description: "Primary text color." },
  { role: "border", label: "Border", description: "Hairline borders and dividers." },
  { role: "success", label: "Success", description: "Positive/affirmative states." },
  { role: "warning", label: "Warning", description: "Cautionary states." },
  { role: "destructive", label: "Destructive", description: "Errors and dangerous actions." },
];

export function SemanticRoleEditor() {
  const semantic = useColorStore((s) => s.semantic);
  const setSemantic = useColorStore((s) => s.setSemantic);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-fg">Semantic roles</h3>
        <p className="text-xs text-fg-muted">
          Click a token to edit its color. Roles drive both the live preview
          and the exports.
        </p>
      </div>
      <div className="grid gap-2">
        {ROLE_ORDER.map(({ role, label, description }) => {
          const hex = semantic[role];
          const fg = bestForeground(hex);
          return (
            <Popover key={role}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl border border-line bg-bg-elev/40 p-3 text-left transition-colors hover:bg-bg-elev"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-semibold tabular"
                    style={{ background: hex, color: fg }}
                  >
                    {role.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-fg">
                      {label}
                    </span>
                    <span className="block truncate text-xs text-fg-muted">
                      {description}
                    </span>
                  </span>
                  <span className="font-mono text-xs uppercase tabular text-fg-muted">
                    {hex}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ColorPicker
                  value={hex}
                  onChange={(next) => setSemantic(role, next)}
                />
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
