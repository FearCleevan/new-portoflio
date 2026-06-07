"use client";

import { SectionLabel } from "@/components/layout/SectionLabel";
import { CircleDecor } from "@/components/shared/CircleDecor";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { motion, useReducedMotion } from "motion/react";
import { useHasMounted } from "@/hooks/useHasMounted";

const EASE = [0.22, 1, 0.36, 1] as const;

function HeroLine({
  children,
  delay,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  // Pre-mount (server + first client render): plain visible h1
  if (!mounted || prefersReduced) {
    return (
      <h1 className={className} style={style}>
        {children}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      style={style}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.h1>
  );
}

export function Hero() {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="section-px relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16"
    >
      {/* Decorative circles — parallax at different speeds for depth */}
      <ParallaxLayer speed={80} className="absolute inset-0 pointer-events-none">
        <CircleDecor size={720} top="-220px" right="-300px" />
      </ParallaxLayer>
      <ParallaxLayer speed={40} className="absolute inset-0 pointer-events-none">
        <CircleDecor size={380} bottom="-80px" left="-120px" />
      </ParallaxLayer>

      {/* Watermark — slow parallax */}
      <ParallaxLayer
        speed={30}
        className="absolute right-[-2rem] bottom-16 pointer-events-none select-none"
      >
        <span
          aria-hidden="true"
          className="font-display font-bold uppercase leading-none"
          style={{
            fontSize: "clamp(120px, 22vw, 260px)",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.04em",
            display: "block",
          }}
        >
          DEV
        </span>
      </ParallaxLayer>

      {/* Section label */}
      <ZoomReveal trigger="animate" delay={0.05}>
        <SectionLabel>Home</SectionLabel>
      </ZoomReveal>

      {/* Content block */}
      <div className="relative z-10 max-w-5xl">
        {/* Terminal prompt */}
        {mounted && !prefersReduced ? (
          <motion.div
            className="font-mono text-sm mb-8 flex items-center gap-2"
            style={{ color: "var(--step-6)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <span style={{ color: "var(--off-white)" }}>&gt;_</span>
            <span>portfolio.init()</span>
            <span
              className="inline-block w-2 h-4 animate-cursor-blink"
              style={{ backgroundColor: "var(--mid-gray)" }}
            />
          </motion.div>
        ) : (
          <div className="font-mono text-sm mb-8 flex items-center gap-2" style={{ color: "var(--step-6)" }}>
            <span style={{ color: "var(--off-white)" }}>&gt;_</span>
            <span>portfolio.init()</span>
            <span
              className="inline-block w-2 h-4 animate-cursor-blink"
              style={{ backgroundColor: "var(--mid-gray)" }}
            />
          </div>
        )}

        {/* Display heading lines — staggered slide-in from left */}
        <HeroLine
          delay={0.3}
          className="font-display font-bold uppercase leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(72px, 13vw, 176px)", color: "var(--off-white)" }}
        >
          Full
        </HeroLine>
        <HeroLine
          delay={0.42}
          className="font-display font-bold uppercase leading-[0.88] tracking-tight mb-2"
          style={{ fontSize: "clamp(72px, 13vw, 176px)", color: "var(--off-white)" }}
        >
          Stack
        </HeroLine>
        <HeroLine
          delay={0.54}
          className="font-display font-light uppercase leading-[0.88] tracking-tight mb-10"
          style={{ fontSize: "clamp(72px, 13vw, 176px)", color: "var(--mid-gray)" }}
        >
          Developer
        </HeroLine>

        {/* Subtitle rule */}
        {mounted && !prefersReduced ? (
          <motion.div
            className="flex items-center gap-5 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          >
            <div style={{ width: "64px", height: "1px", backgroundColor: "var(--step-4)" }} />
            <p
              className="font-body text-sm uppercase tracking-[0.2em]"
              style={{ color: "var(--step-6)" }}
            >
              Building things that matter
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center gap-5 mb-10">
            <div style={{ width: "64px", height: "1px", backgroundColor: "var(--step-4)" }} />
            <p
              className="font-body text-sm uppercase tracking-[0.2em]"
              style={{ color: "var(--step-6)" }}
            >
              Building things that matter
            </p>
          </div>
        )}

        {/* Scroll hint */}
        {mounted && !prefersReduced ? (
          <motion.p
            className="font-mono text-[11px] tracking-widest"
            style={{ color: "var(--step-5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
          >
            <span style={{ color: "var(--step-4)" }}>// </span>
            scroll to explore
          </motion.p>
        ) : (
          <p className="font-mono text-[11px] tracking-widest" style={{ color: "var(--step-5)" }}>
            <span style={{ color: "var(--step-4)" }}>// </span>
            scroll to explore
          </p>
        )}
      </div>
    </div>
  );
}
