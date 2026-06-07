import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-[var(--step-3)] bg-[var(--step-1)] px-4 py-2",
          "font-mono text-sm text-[var(--off-white)] tracking-wide",
          "placeholder:text-[var(--step-5)]",
          "focus:outline-none focus:border-[var(--step-5)]",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
