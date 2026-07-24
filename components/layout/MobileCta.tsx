"use client";

import { scrollToSection } from "@/lib/scrollToSection";

export function MobileCta() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-3"
      style={{
        borderTop: "1px solid var(--step-3)",
        backgroundColor: "var(--base)",
      }}
    >
      <span
        className="font-mono text-[9px] tracking-[0.25em] uppercase truncate"
        style={{ color: "var(--step-5)" }}
      >
        Available for work
      </span>
      <button
        type="button"
        onClick={() => scrollToSection("contact")}
        className="font-mono text-[10px] tracking-widest uppercase shrink-0 transition-colors"
        style={{
          backgroundColor: "var(--off-white)",
          color: "var(--base)",
          border: "1px solid var(--off-white)",
          padding: "0.55rem 1.1rem",
          cursor: "pointer",
        }}
      >
        Start a Project
      </button>
    </div>
  );
}
