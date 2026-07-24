"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Card } from "@/components/shared/Card";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { services } from "@/data/services";
import { scrollToSection } from "@/lib/scrollToSection";

export function Services() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ZoomReveal>
        <SectionLabel>Services</SectionLabel>
      </ZoomReveal>

      <ZoomReveal delay={0.08}>
        <h2
          className="font-display font-medium uppercase leading-[1.05] tracking-tight mb-14 max-w-3xl"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)", color: "var(--off-white)" }}
        >
          Here&apos;s what you can{" "}
          <em className="not-italic" style={{ color: "var(--mid-gray)" }}>
            hire me for.
          </em>
        </h2>
      </ZoomReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <Card className="h-full flex flex-col gap-4">
              <Link
                href={`/services/${service.id}`}
                className="flex items-baseline gap-3 group"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: "var(--step-5)" }}
                >
                  {service.index}
                </span>
                <h3
                  className="font-display font-bold uppercase tracking-tight text-lg transition-colors"
                  style={{ color: "var(--off-white)" }}
                >
                  {service.title}
                </h3>
              </Link>

              <p className="font-body text-sm" style={{ color: "var(--mid-gray)" }}>
                {service.tagline}
              </p>

              <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />

              <ul className="flex flex-col gap-2 flex-1">
                {service.scope.map((line) => (
                  <li
                    key={line}
                    className="font-body text-xs leading-relaxed flex gap-2"
                    style={{ color: "var(--step-6)" }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--step-4)" }}>
                      —
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div
                className="flex items-center justify-between mt-auto pt-3"
                style={{ borderTop: "1px solid var(--step-3)" }}
              >
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--step-5)" }}
                >
                  {service.timeline}
                </span>
                <div className="flex items-center gap-5">
                  <Link
                    href={`/services/${service.id}`}
                    className="font-mono text-[10px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
                  >
                    Learn more →
                  </Link>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="font-mono text-[10px] tracking-widest uppercase transition-colors"
                    style={{
                      color: "var(--step-5)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--off-white)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--step-5)")}
                  >
                    Get a quote →
                  </button>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
