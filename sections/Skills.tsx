"use client";

import { SectionLabel } from "@/components/layout/SectionLabel";
import { Card } from "@/components/shared/Card";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import {
  technicalDisplay,
  technicalCore,
  skills,
  professionalCore,
  softCore,
} from "@/data/skills";

const groups = [
  {
    index: "01",
    label: "Technical",
    description: "Languages, frameworks, and tools used daily in production.",
    core: technicalCore,
    skills: technicalDisplay,
  },
  {
    index: "02",
    label: "Professional",
    description: "Specialist capabilities delivered across production systems.",
    core: professionalCore,
    skills: skills.professional,
  },
  {
    index: "03",
    label: "Soft Skills",
    description: "How I work with teams, clients, and complex problems.",
    core: softCore,
    skills: skills.soft,
  },
];

export function Skills() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>Skills</SectionLabel>
      </ZoomReveal>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {groups.map((group) => (
          <StaggerItem key={group.index}>
            <Card className="h-full flex flex-col gap-5">
              {/* Card header */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-[10px] tracking-widest"
                    style={{ color: "var(--step-5)" }}
                  >
                    {group.index}
                  </span>
                  <h3
                    className="font-display font-bold uppercase tracking-tight text-lg"
                    style={{ color: "var(--off-white)" }}
                  >
                    {group.label}
                  </h3>
                </div>
                <p
                  className="font-body text-xs leading-relaxed"
                  style={{ color: "var(--step-5)" }}
                >
                  {group.description}
                </p>
              </div>

              {/* Hairline divider */}
              <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />

              {/* Skill tags — core skills are brighter */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isCore = group.core.has(skill);
                  return (
                    <span
                      key={skill}
                      className="font-mono text-[11px] tracking-wide px-3 py-1.5 transition-colors"
                      style={{
                        border: `1px solid ${isCore ? "var(--step-4)" : "var(--step-3)"}`,
                        color: isCore ? "var(--mid-gray)" : "var(--step-6)",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--step-5)";
                        el.style.color = "var(--off-white)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = isCore ? "var(--step-4)" : "var(--step-3)";
                        el.style.color = isCore ? "var(--mid-gray)" : "var(--step-6)";
                      }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>

              {/* Core skills legend */}
              <div
                className="font-mono text-[9px] tracking-widest mt-auto pt-3"
                style={{ color: "var(--step-5)", borderTop: "1px solid var(--step-3)" }}
              >
                <span style={{ color: "var(--mid-gray)" }}>■</span>
                {" "}brighter = core competency
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
