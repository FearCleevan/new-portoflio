import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export function Card({ children, className, style, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn("p-6", className)}
      style={{
        backgroundColor: "var(--step-1)",
        border: "1px solid var(--step-3)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
