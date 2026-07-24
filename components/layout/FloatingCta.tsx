"use client";

import { scrollToSection } from "@/lib/scrollToSection";

export function FloatingCta() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("contact")}
      className="fixed bottom-8 right-8 z-50 font-mono text-[11px] tracking-widest uppercase transition-colors"
      style={{
        backgroundColor: "var(--off-white)",
        color: "var(--base)",
        border: "1px solid var(--off-white)",
        padding: "0.75rem 1.5rem",
        cursor: "pointer",
        // Forces its own stable GPU compositing layer so it can't get lost
        // mid-scroll on mobile, on long pages with lots of scroll-linked
        // motion values (ParallaxLayer, etc.) running under Lenis.
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget;
        b.style.backgroundColor = "transparent";
        b.style.color = "var(--off-white)";
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget;
        b.style.backgroundColor = "var(--off-white)";
        b.style.color = "var(--base)";
      }}
    >
      Start a Project
    </button>
  );
}
