import { SectionLabel } from "@/components/layout/SectionLabel";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";

const stats = [
  { value: "3+",  label: "Years" },
  { value: "15+", label: "Projects" },
  { value: "5",   label: "Prod. Systems" },
  { value: "∞",   label: "Coffee / Day" },
];

const pillars = [
  {
    index: "01",
    label: "Approach",
    body: "Thoughtful architecture first. Code that future-me can read without cursing.",
  },
  {
    index: "02",
    label: "Output",
    body: "Production-ready systems, not prototypes. With tests, docs, and CI in place.",
  },
  {
    index: "03",
    label: "Values",
    body: "Clarity over cleverness. Simplicity over complexity. Delivery over perfection.",
  },
];

export function Summary() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>Summary</SectionLabel>
      </ZoomReveal>

      <div className="max-w-5xl">
        {/* Editorial positioning statement */}
        <ZoomReveal delay={0.1}>
          <p
            className="font-display font-medium uppercase leading-[1.05] tracking-tight mb-14"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)", color: "var(--off-white)" }}
          >
            I build{" "}
            <em className="not-italic" style={{ color: "var(--mid-gray)" }}>
              full-stack applications
            </em>{" "}
            that are fast, maintainable, and{" "}
            <em className="italic" style={{ color: "var(--off-white)" }}>
              genuinely useful
            </em>{" "}
            — from database schema to polished UI.
          </p>
        </ZoomReveal>

        {/* Stats strip */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-4 mb-16"
          delay={0.15}
          style={{ borderTop: "1px solid var(--step-3)", borderLeft: "1px solid var(--step-3)" }}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div
                className="px-6 py-5"
                style={{
                  borderBottom: "1px solid var(--step-3)",
                  borderRight: "1px solid var(--step-3)",
                }}
              >
                <div
                  className="font-display font-bold leading-none mb-2"
                  style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--off-white)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-mono text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--step-5)" }}
                >
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Three pillars */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          delay={0.1}
        >
          {pillars.map((p, i) => (
            <StaggerItem key={p.index}>
              <div
                className="pt-6 pr-8 pb-2"
                style={{
                  borderTop: "1px solid var(--step-3)",
                  borderLeft: i > 0 ? "1px solid var(--step-3)" : undefined,
                  paddingLeft: i > 0 ? "2rem" : undefined,
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.25em] mb-3"
                  style={{ color: "var(--step-5)" }}
                >
                  {p.index} — {p.label}
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "var(--step-6)" }}
                >
                  {p.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
