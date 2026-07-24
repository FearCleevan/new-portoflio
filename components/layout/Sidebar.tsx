"use client";

import { scrollToSection } from "@/lib/scrollToSection";

const navItems = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Sidebar() {
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-screen z-50 flex-col items-center justify-between py-8"
      style={{
        width: "var(--sidebar-w)",
        borderRight: "1px solid var(--step-3)",
        backgroundColor: "var(--base)",
      }}
    >
      {/* Section nav — dot markers, replacing the old static accent dot */}
      <nav aria-label="Section navigation" className="flex flex-col items-center gap-5">
        {navItems.map((item, i) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={`Scroll to ${item.label}`}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center justify-center p-1.5"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              className="rounded-full transition-colors group-hover:bg-[var(--off-white)] group-focus-visible:bg-[var(--off-white)]"
              style={{
                width: i === 0 ? "6px" : "5px",
                height: i === 0 ? "6px" : "5px",
                backgroundColor: i === 0 ? "var(--off-white)" : "var(--step-4)",
              }}
            />
          </button>
        ))}
      </nav>

      {/* Vertical wordmark — centred */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-display font-bold uppercase text-[10px] tracking-[0.35em]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--off-white)",
            letterSpacing: "0.35em",
          }}
        >
          Peter Paul
        </span>
        <div
          className="w-px"
          style={{ height: "20px", backgroundColor: "var(--step-3)" }}
        />
        <span
          className="font-display font-light uppercase text-[10px]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--step-6)",
            letterSpacing: "0.35em",
          }}
        >
          Lazan
        </span>
      </div>

      {/* Bottom: year */}
      <span
        className="font-mono text-[9px]"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          color: "var(--step-5)",
          letterSpacing: "0.2em",
        }}
      >
        2025
      </span>
    </aside>
  );
}
