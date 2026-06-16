import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const Kbd = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-4 min-w-4 items-center justify-center rounded border border-line bg-bg-elev px-1 font-mono text-[10px] font-medium text-fg-muted tabular",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = "Kbd";
