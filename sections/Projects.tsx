import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { CircleDecor } from "@/components/shared/CircleDecor";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerReveal";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <div
      className="section-px relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "8rem", borderTop: "1px solid var(--step-3)" }}
    >
      <ParallaxLayer speed={60} className="absolute inset-0 pointer-events-none">
        <CircleDecor size={640} top="-120px" right="-240px" />
      </ParallaxLayer>

      <ZoomReveal>
        <SectionLabel>Projects</SectionLabel>
      </ZoomReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              className="block group h-full"
              style={{ textDecoration: "none" }}
            >
              <div
                className="overflow-hidden border border-[var(--step-3)] group-hover:border-[var(--step-4)] transition-colors h-full flex flex-col"
                style={{ backgroundColor: "var(--step-1)" }}
              >
                {/* Hero thumbnail */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "160px" }}
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      filter: "grayscale(100%) contrast(1.05) brightness(0.6)",
                    }}
                  />
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="font-mono text-[10px] tracking-widest px-2 py-1"
                      style={{
                        backgroundColor: "var(--step-1)",
                        border: "1px solid var(--step-3)",
                        color: project.status === "WIP" ? "var(--mid-gray)" : "var(--step-5)",
                      }}
                    >
                      {project.status === "WIP" ? "in progress" : "shipped"}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <div
                      className="font-mono text-[10px] tracking-[0.25em] mb-1"
                      style={{ color: "var(--step-6)" }}
                    >
                      {project.index} — {project.year}
                    </div>
                    <h3
                      className="font-display font-bold uppercase tracking-tight leading-none"
                      style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "var(--off-white)" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p
                    className="font-body text-xs leading-relaxed mb-4 flex-1"
                    style={{ color: "var(--step-6)" }}
                  >
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] tracking-wider px-1.5 py-0.5"
                        style={{ border: "1px solid var(--step-3)", color: "var(--step-5)" }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span
                        className="font-mono text-[9px] tracking-wider px-1.5 py-0.5"
                        style={{ border: "1px solid var(--step-3)", color: "var(--step-5)" }}
                      >
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div
                    className="font-mono text-[10px] tracking-widest transition-colors mt-auto"
                    style={{ color: "var(--step-5)" }}
                  >
                    View Case Study →
                  </div>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Footer rule */}
      <ZoomReveal delay={0.2}>
        <div
          className="mt-16 flex items-center gap-4"
          style={{ borderTop: "1px solid var(--step-3)", paddingTop: "2rem" }}
        >
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--step-5)" }}>
            open to new work
          </span>
          <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--step-5)" }}>
            © 2025
          </span>
        </div>
      </ZoomReveal>
    </div>
  );
}
