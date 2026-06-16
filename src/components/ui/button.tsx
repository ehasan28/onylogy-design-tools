"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:opacity-90 active:opacity-80",
        secondary:
          "bg-bg-elev text-fg border border-line hover:bg-bg-elev-2",
        ghost: "text-fg-muted hover:text-fg hover:bg-bg-elev",
        outline:
          "border border-line text-fg hover:bg-bg-elev hover:border-fg-dim",
        link: "text-accent underline-offset-4 hover:underline",
        destructive:
          "bg-bad text-white hover:opacity-90 active:opacity-80",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-9 px-3.5 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonStyles> {
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn(buttonStyles({ variant, size }), className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";
