"use client";

import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative flex items-center gap-1 border-b border-line bg-bg-elev/40 px-2",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    layoutId?: string;
  }
>(({ className, children, layoutId = "tab-indicator", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group relative flex flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-medium text-fg-muted transition-colors hover:text-fg data-[state=active]:text-fg",
      className,
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="absolute inset-x-0 bottom-0 hidden h-[2px] group-data-[state=active]:block">
      <motion.span
        layoutId={layoutId}
        className="block h-full w-full rounded-t bg-accent"
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      />
    </span>
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("flex-1 outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
