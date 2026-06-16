"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { copyToClipboard } from "@/lib/utils/clipboard";

export interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function CopyButton({
  value,
  label = "Copy",
  className,
  size = "md",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line bg-bg-elev font-medium text-fg-muted transition-colors hover:bg-bg-elev-2 hover:text-fg",
        size === "sm" ? "h-7 px-2 text-xs" : "h-9 px-3 text-sm",
        className,
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-ok" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </button>
  );
}
