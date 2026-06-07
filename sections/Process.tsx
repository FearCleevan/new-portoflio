import { SectionLabel } from "@/components/layout/SectionLabel";
import { Card } from "@/components/shared/Card";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";

const steps = [
  {
    num: "01",
    title: "Understand",
    icon: "◎",
    description:
      "Deep-dive into the problem space. Ask dumb questions until I can explain it back simply. Map edge cases before touching a keyboard.",
  },
  {
    num: "02",
    title: "Design",
    icon: "⬡",
    description:
      "Sketch the data model and API contracts first. The UI is easy — the schema is forever. Align on interfaces before writing any code.",
  },
  {
    num: "03",
    title: "Build",
    icon: "▣",
    description:
      "Write tests for the critical paths, then implement. Ship small, merge often. Code reviews are a feature, not a bottleneck.",
  },
  {
    num: "04",
    title: "Verify",
    icon: "◈",
    description:
      "Manual smoke-test the golden path. Monitor error rates post-deploy. If it pages at 3am, I want to know why before it does.",
  },
  {
    num: "05",
    title: "Iterate",
    icon: "↺",
    description:
      "Collect real usage data. Refactor ruthlessly once patterns emerge. Leave the codebase cleaner than I found it.",
  },
];

export function Process() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>How I Develop</SectionLabel>
      </ZoomReveal>

      {/* Philosophy quote */}
      <ZoomReveal delay={0.08}>
        <p
          className="font-body text-sm leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--step-5)" }}
        >
          Every project goes through the same five stages. The order is non-negotiable.
          Skip one and you pay for it later — usually at 3am.
        </p>
      </ZoomReveal>

      {/* Horizontal step breadcrumb */}
      <ZoomReveal delay={0.14}>
        <div
          className="flex items-center mb-8 overflow-x-auto"
          style={{ borderBottom: "1px solid var(--step-3)", paddingBottom: "1.25rem" }}
        >
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 shrink-0">
              <span
                className="font-mono text-[9px] tracking-widest"
                style={{ color: "var(--step-5)" }}
              >
                {s.num}
              </span>
              <span
                className="font-mono text-[9px]"
                style={{ color: "var(--step-4)" }}
              >
                {s.icon}
              </span>
              <span
                className="font-display font-semibold uppercase text-sm tracking-tight"
                style={{ color: "var(--step-6)" }}
              >
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div
                  className="mx-4"
                  style={{ width: "28px", height: "1px", backgroundColor: "var(--step-3)" }}
                />
              )}
            </div>
          ))}
        </div>
      </ZoomReveal>

      {/* Step cards — staggered */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {steps.map((step) => (
          <StaggerItem key={step.num}>
            <Card className="flex flex-col gap-3 h-full">
              {/* Step number + icon row */}
              <div className="flex items-end justify-between">
                <div
                  className="font-display font-bold leading-none"
                  style={{ fontSize: "52px", color: "var(--step-3)" }}
                >
                  {step.num}
                </div>
                <div
                  className="font-mono text-xl mb-1"
                  style={{ color: "var(--step-4)" }}
                >
                  {step.icon}
                </div>
              </div>

              <h3
                className="font-display font-bold uppercase tracking-tight text-lg"
                style={{ color: "var(--off-white)" }}
              >
                {step.title}
              </h3>

              <p
                className="font-body text-xs leading-relaxed"
                style={{ color: "var(--step-6)" }}
              >
                {step.description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
