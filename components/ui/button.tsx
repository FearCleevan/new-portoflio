import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-sm tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--off-white)] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--off-white)] text-[var(--base)] hover:bg-[var(--mid-gray)]",
        outline:
          "border border-[var(--step-3)] text-[var(--mid-gray)] hover:border-[var(--step-5)] hover:text-[var(--off-white)]",
        ghost:
          "text-[var(--step-6)] hover:text-[var(--off-white)]",
        destructive:
          "border border-[var(--step-4)] text-[var(--step-6)] hover:text-[var(--off-white)] hover:border-[var(--step-5)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
