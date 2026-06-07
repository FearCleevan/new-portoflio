"use client";

import { motion, useReducedMotion } from "motion/react";
import { useHasMounted } from "@/hooks/useHasMounted";

interface ZoomRevealProps {
  children: React.ReactNode;
  delay?: number;
  /** Use "animate" for elements already visible on load (e.g. Hero) */
  trigger?: "whileInView" | "animate";
  className?: string;
  style?: React.CSSProperties;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ZoomReveal({
  children,
  delay = 0,
  trigger = "whileInView",
  className,
  style,
}: ZoomRevealProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  // Pre-mount: render identical to server (plain visible div — no animation state)
  if (!mounted || prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const initial = { opacity: 0, scale: 0.93, y: 22 };
  const visible = { opacity: 1, scale: 1, y: 0 };
  const transition = { duration: 0.75, delay, ease: EASE };

  if (trigger === "animate") {
    return (
      <motion.div
        initial={initial}
        animate={visible}
        transition={transition}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: "-72px" }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
