"use client";

import { motion, useReducedMotion } from "motion/react";
import { useHasMounted } from "@/hooks/useHasMounted";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Extra delay before the first child starts (seconds) */
  delay?: number;
}

export function StaggerContainer({
  children,
  className,
  style,
  delay = 0,
}: ContainerProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  // Pre-mount: plain visible div matching server output
  if (!mounted || prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const variants = {
    ...containerVariants,
    show: {
      ...containerVariants.show,
      transition: {
        ...containerVariants.show.transition,
        delayChildren: delay + 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({ children, className, style }: ItemProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  // Pre-mount: plain visible div matching server output
  if (!mounted || prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
