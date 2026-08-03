"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useHasMounted } from "@/hooks/useHasMounted";

interface ParallaxLayerProps {
  children: React.ReactNode;
  /**
   * Parallax strength in pixels. The element drifts ±speed px as it
   * travels through the viewport. Higher = more movement.
   * Default 60 is noticeable on decorative circles; use 20-30 for content.
   */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  speed = 60,
  className,
  style,
}: ParallaxLayerProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed}px`, `${-speed}px`]);

  // Pre-mount: render identical to server (plain div — no transform state)
  if (!mounted || prefersReduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
