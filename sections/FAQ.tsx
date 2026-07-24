import { SectionLabel } from "@/components/layout/SectionLabel";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { faqs } from "@/data/faq";

export function FAQ() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>FAQ</SectionLabel>
      </ZoomReveal>

      <StaggerContainer className="max-w-3xl">
        {faqs.map((faq, i) => (
          <StaggerItem key={faq.id}>
            <div
              className="py-8"
              style={{
                borderTop: i === 0 ? "1px solid var(--step-3)" : undefined,
                borderBottom: "1px solid var(--step-3)",
              }}
            >
              <h3
                className="font-display font-bold uppercase tracking-tight text-lg mb-3"
                style={{ color: "var(--off-white)" }}
              >
                {faq.question}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--step-6)" }}
              >
                {faq.answer}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
