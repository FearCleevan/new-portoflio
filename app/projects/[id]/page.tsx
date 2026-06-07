import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects, getProject } from "@/data/projects";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { MarkdownRenderer } from "@/components/projects/MarkdownRenderer";
import { CodePreview } from "@/components/projects/CodePreview";
import { ZoomReveal } from "@/components/motion/ZoomReveal";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

const BASE_URL = "https://lazandev.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};

  const url = `${BASE_URL}/projects/${id}`;

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — Peter Paul Lazan`,
      description: project.tagline,
      images: [
        {
          url: project.heroImage,
          width: 1600,
          height: 800,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Peter Paul Lazan`,
      description: project.tagline,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.tagline,
    url: `${BASE_URL}/projects/${id}`,
    image: project.heroImage,
    author: {
      "@type": "Person",
      name: "Peter Paul Lazan",
      url: BASE_URL,
    },
    keywords: project.stack.join(", "),
    dateCreated: project.year,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div style={{ minHeight: "100vh" }}>

      {/* ── Back navigation ──────────────────────────────── */}
      <div
        className="section-px flex items-center gap-4"
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--step-3)",
        }}
      >
        <Link
          href="/#projects"
          className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
        >
          ← All Projects
        </Link>
        <div
          className="flex-1"
          style={{ height: "1px", backgroundColor: "var(--step-3)" }}
        />
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--step-5)" }}
        >
          {project.index} / {projects.length.toString().padStart(2, "0")}
        </span>
      </div>

      {/* ── Hero image ───────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(240px, 45vh, 520px)" }}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: "grayscale(100%) contrast(1.1) brightness(0.55)",
          }}
        />

        {/* Gradient scrim — fades image into the base color at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,18,18,0) 40%, rgba(18,18,18,1) 100%)",
          }}
        />

        {/* Status + year badges over the image */}
        <div className="absolute top-5 left-8 flex items-center gap-3">
          <span
            className="font-mono text-[10px] tracking-widest px-2 py-1"
            style={{
              backgroundColor: "rgba(18,18,18,0.8)",
              border: "1px solid var(--step-3)",
              color:
                project.status === "WIP" ? "var(--mid-gray)" : "var(--step-5)",
            }}
          >
            {project.status === "WIP" ? "in progress" : "shipped"}
          </span>
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--step-5)" }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Project header ───────────────────────────────── */}
      <div className="section-px" style={{ paddingTop: "3rem", paddingBottom: "0" }}>
        <ZoomReveal trigger="animate" delay={0.1}>
          <SectionLabel>{project.title}</SectionLabel>

          <h1
            className="font-display font-bold uppercase leading-[0.88] tracking-tight mb-6"
            style={{
              fontSize: "clamp(48px, 8vw, 100px)",
              color: "var(--off-white)",
            }}
          >
            {project.title}
          </h1>

          <p
            className="font-body text-base leading-relaxed mb-8 max-w-2xl"
            style={{ color: "var(--step-6)" }}
          >
            {project.tagline}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] tracking-wider px-3 py-1.5"
                style={{
                  border: "1px solid var(--step-3)",
                  color: "var(--step-5)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project links */}
          <div className="flex items-center gap-6 mb-12">
            <a
              href={project.github}
              className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
            >
              GitHub ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </ZoomReveal>

        {/* Hairline divider before content */}
        <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
      </div>

      {/* ── Markdown description ─────────────────────────── */}
      <div
        className="section-px max-w-3xl"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <ZoomReveal trigger="animate" delay={0.2}>
          <MarkdownRenderer content={project.description} />
        </ZoomReveal>
      </div>

      {/* ── VS Code Code Preview ─────────────────────────── */}
      <div className="section-px" style={{ paddingBottom: "6rem" }}>
        <ZoomReveal trigger="animate" delay={0.3}>
          <div
            className="font-mono text-[10px] tracking-[0.25em] mb-4"
            style={{ color: "var(--step-5)" }}
          >
            ... /code-preview ...
          </div>
          <CodePreview
            repo={project.repo}
            githubUrl={project.github !== "#" ? project.github : undefined}
          />
        </ZoomReveal>
      </div>

      {/* ── Footer navigation ────────────────────────────── */}
      <div
        className="section-px flex items-center justify-between"
        style={{
          paddingTop: "2rem",
          paddingBottom: "4rem",
          borderTop: "1px solid var(--step-3)",
        }}
      >
        <Link
          href="/#projects"
          className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
        >
          ← Back
        </Link>
        <div
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--step-5)" }}
        >
          {project.title}
        </div>
      </div>
    </div>
    </>
  );
}
