"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Card } from "@/components/shared/Card";
import { CircleDecor } from "@/components/shared/CircleDecor";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { personal } from "@/data/personal";

const quickFacts = [
  { label: "Role",     value: "Full-Stack Developer" },
  { label: "Location", value: "Davao City, Philippines" },
  { label: "Exp.",     value: "3+ Years" },
  { label: "Focus",    value: "React · Next.js · TypeScript" },
  { label: "Status",   value: "Open to Opportunities" },
];

const links = [
  { label: "GitHub",   href: personal.githubUrl },
  { label: "LinkedIn", href: personal.linkedinUrl },
  { label: "Résumé",   href: personal.cvUrl },
];

export function Profile() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      <ParallaxLayer speed={50} className="absolute inset-0 pointer-events-none">
        <CircleDecor size={500} top="-80px" left="-180px" />
      </ParallaxLayer>

      <ZoomReveal>
        <SectionLabel>Profile</SectionLabel>
      </ZoomReveal>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

        {/* ── Headshot column ─────────────────────────────── */}
        <ZoomReveal delay={0.1}>
          <div className="relative shrink-0">

            {/* Portrait frame */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "280px",
                aspectRatio: "3 / 4",
                border: "1px solid var(--step-3)",
                backgroundColor: "var(--step-2)",
              }}
            >
              <Image
                src="/profile.png"
                alt={`${personal.firstName} ${personal.lastName} — Full-Stack Developer`}
                fill
                sizes="280px"
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "grayscale(100%) contrast(1.08) brightness(0.88)",
                }}
              />
              {/* Monochrome overlay tinted to base */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(18,18,18,0.18)", mixBlendMode: "multiply" }}
              />
            </div>

            {/* Offset accent frame */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: "-14px",
                right: "-14px",
                width: "calc(100% - 28px)",
                height: "calc(100% - 28px)",
                border: "1px solid var(--step-4)",
              }}
            />

            {/* Mono caption below image */}
            <div
              className="mt-6 font-mono text-[10px] tracking-widest uppercase"
              style={{ color: "var(--step-5)" }}
            >
              {personal.location.toLowerCase()}
            </div>
          </div>
        </ZoomReveal>

        {/* ── Bio column ──────────────────────────────────── */}
        <div>
          <ZoomReveal delay={0.18}>
            <h2
              className="font-display font-bold uppercase leading-none tracking-tight mb-1"
              style={{ fontSize: "clamp(40px, 6vw, 68px)", color: "var(--off-white)" }}
            >
              {personal.firstName}
            </h2>
            <h2
              className="font-display font-light uppercase leading-none tracking-tight mb-8"
              style={{ fontSize: "clamp(40px, 6vw, 68px)", color: "var(--mid-gray)" }}
            >
              {personal.lastName}
            </h2>

            <p
              className="font-body text-base leading-relaxed mb-4 max-w-prose"
              style={{ color: "var(--step-6)" }}
            >
              A full-stack developer who builds purposeful, well-crafted digital
              products. I combine{" "}
              <strong style={{ color: "var(--off-white)", fontWeight: 600 }}>
                technical depth
              </strong>{" "}
              with a sharp eye for design, turning complex problems into clean,
              maintainable solutions.
            </p>
            <p
              className="font-body text-sm leading-relaxed mb-10 max-w-prose"
              style={{ color: "var(--step-5)" }}
            >
              Based in the Philippines. Available for remote contracts, full-time
              roles, and project-based collaboration.
            </p>
          </ZoomReveal>

          {/* Quick facts */}
          <ZoomReveal delay={0.28}>
            <Card className="mb-6">
              <div
                className="font-mono text-[10px] tracking-[0.25em] mb-5 uppercase"
                style={{ color: "var(--step-6)" }}
              >
                ... /quick-facts ...
              </div>
              <StaggerContainer style={{ borderTop: "1px solid var(--step-3)" }}>
                {quickFacts.map((fact) => (
                  <StaggerItem key={fact.label}>
                    <div
                      className="flex items-center gap-6 py-3"
                      style={{ borderBottom: "1px solid var(--step-3)" }}
                    >
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase shrink-0"
                        style={{ width: "80px", color: "var(--step-5)" }}
                      >
                        {fact.label}
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "var(--off-white)" }}
                      >
                        {fact.value}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Card>
          </ZoomReveal>

          {/* External links */}
          <ZoomReveal delay={0.36}>
            <div className="flex items-center flex-wrap gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
                >
                  {link.label} ↗
                </a>
              ))}
              <button
                onClick={() => {
                  const target = document.getElementById("contact");
                  if (!target) return;
                  if (window.__lenis) {
                    window.__lenis.scrollTo(target, { offset: 0, duration: 1.6 });
                  } else {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--base)] hover:text-[var(--base)]"
                style={{
                  backgroundColor: "var(--off-white)",
                  border: "1px solid var(--off-white)",
                  padding: "0.45rem 1.1rem",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--off-white)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--off-white)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--off-white)";
                  (e.currentTarget as HTMLElement).style.color = "var(--base)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--off-white)";
                }}
              >
                Message Me ↓
              </button>
            </div>
          </ZoomReveal>
        </div>
      </div>
    </div>
  );
}
