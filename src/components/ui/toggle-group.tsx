"use client";

import { createContext, forwardRef, useContext, useId } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle-group";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CtxValue {
  layoutId: string;
}
const Ctx = createContext<CtxValue>({ layoutId: "toggle-chip" });

type ToggleGroupRootProps = React.ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> & {
  layoutGroupId?: string;
};

export const ToggleGroup = forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  ToggleGroupRootProps
>((props, ref) => {
  const fallbackId = useId();
  const { className, layoutGroupId, children, ...rest } =
    props as ToggleGroupRootProps & {
      className?: string;
      children?: React.ReactNode;
    };
  const id = layoutGroupId ?? `toggle-chip-${fallbackId}`;
  return (
    <Ctx.Provider value={{ layoutId: id }}>
      <TogglePrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-full border border-line bg-bg-elev p-0.5",
          className,
        )}
        {...(rest as React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>)}
      >
        {children}
      </TogglePrimitive.Root>
    </Ctx.Provider>
  );
});
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const { layoutId } = useContext(Ctx);
  return (
    <TogglePrimitive.Item
      ref={ref}
      className={cn(
        "group relative inline-flex h-7 min-w-7 items-center justify-center rounded-full px-3 text-xs font-medium text-fg-muted transition-colors hover:text-fg data-[state=on]:text-white",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 hidden rounded-full group-data-[state=on]:block">
        <motion.span
          layoutId={layoutId}
          className="block h-full w-full rounded-full bg-accent"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      </span>
      <span className="relative z-10">{children}</span>
    </TogglePrimitive.Item>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
