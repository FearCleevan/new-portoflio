import { SectionLabel } from "@/components/layout/SectionLabel";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { experiences } from "@/data/experience";

export function Experience() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>Experience</SectionLabel>
      </ZoomReveal>

      <StaggerContainer>
        {experiences.map((exp, i) => (
          <StaggerItem key={exp.id}>
            <div
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 py-10"
              style={{
                borderTop: i === 0 ? "1px solid var(--step-3)" : undefined,
                borderBottom: "1px solid var(--step-3)",
              }}
            >
              {/* ── Left: meta column ─────────────────── */}
              <div className="md:pt-1 flex flex-col gap-3">
                {/* Timeline marker */}
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      border: `1px solid ${exp.current ? "var(--off-white)" : "var(--step-4)"}`,
                      backgroundColor: exp.current ? "var(--off-white)" : "transparent",
                      flexShrink: 0,
                    }}
                  />
                  <div
                    className="font-mono text-xs tracking-wider"
                    style={{ color: "var(--step-5)" }}
                  >
                    {exp.period}
                  </div>
                </div>

                <div
                  className="font-mono text-[10px] tracking-widest uppercase pl-[20px]"
                  style={{ color: "var(--step-6)" }}
                >
                  {exp.type}
                </div>

                {exp.current && (
                  <div className="flex items-center gap-2 pl-[20px]">
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--off-white)" }}
                    />
                    <span
                      className="font-mono text-[9px] tracking-[0.3em] uppercase"
                      style={{ color: "var(--off-white)" }}
                    >
                      Current
                    </span>
                  </div>
                )}
              </div>

              {/* ── Right: content column ─────────────── */}
              <div>
                <div className="flex flex-wrap items-baseline gap-4 mb-1">
                  <h3
                    className="font-display font-bold uppercase tracking-tight leading-none"
                    style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "var(--off-white)" }}
                  >
                    {exp.title}
                  </h3>
                </div>

                <div
                  className="font-body text-sm mb-5 flex items-center gap-3"
                  style={{ color: "var(--mid-gray)" }}
                >
                  <span>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--off-white)] transition-colors"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </span>
                  <div style={{ width: "20px", height: "1px", backgroundColor: "var(--step-4)" }} />
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--step-5)" }}>
                    {exp.location}
                  </span>
                </div>

                <p
                  className="font-body text-sm leading-relaxed mb-5 max-w-prose"
                  style={{ color: "var(--step-6)" }}
                >
                  {exp.responsibilities[0]}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-wider px-2 py-1"
                      style={{ border: "1px solid var(--step-3)", color: "var(--step-5)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
