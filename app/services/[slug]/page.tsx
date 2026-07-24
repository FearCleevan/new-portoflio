import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { services, getService } from "@/data/services";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `${SITE_URL}/services/${slug}`;

  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${service.title} — Peter Paul Lazan`,
      description: service.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — Peter Paul Lazan`,
      description: service.tagline,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "Person",
      name: "Peter Paul Lazan",
      url: SITE_URL,
    },
    areaServed: ["Canada", "United States", "Philippines"],
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
            href="/#services"
            className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
          >
            ← All Services
          </Link>
          <div
            className="flex-1"
            style={{ height: "1px", backgroundColor: "var(--step-3)" }}
          />
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--step-5)" }}
          >
            {service.index} / {services.length.toString().padStart(2, "0")}
          </span>
        </div>

        {/* ── Header ───────────────────────────────────────── */}
        <div className="section-px" style={{ paddingTop: "4rem", paddingBottom: "0" }}>
          <ZoomReveal trigger="animate" delay={0.1}>
            <SectionLabel>{service.title}</SectionLabel>

            <h1
              className="font-display font-bold uppercase leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: "clamp(48px, 8vw, 100px)", color: "var(--off-white)" }}
            >
              {service.title}
            </h1>

            <p
              className="font-body text-base leading-relaxed mb-8 max-w-2xl"
              style={{ color: "var(--step-6)" }}
            >
              {service.tagline}
            </p>

            <div className="flex items-center gap-3 mb-12">
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: "var(--step-5)" }}
              >
                Timeline
              </span>
              <div style={{ width: "20px", height: "1px", backgroundColor: "var(--step-4)" }} />
              <span
                className="font-mono text-[11px] tracking-widest"
                style={{ color: "var(--off-white)" }}
              >
                {service.timeline}
              </span>
            </div>

            <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
          </ZoomReveal>
        </div>

        {/* ── What's included ──────────────────────────────── */}
        <div className="section-px max-w-2xl" style={{ paddingTop: "3rem" }}>
          <ZoomReveal trigger="animate" delay={0.2}>
            <div
              className="font-mono text-[10px] tracking-[0.25em] mb-6 uppercase"
              style={{ color: "var(--step-6)" }}
            >
              ... /whats-included ...
            </div>
            <ul className="flex flex-col gap-4">
              {service.scope.map((line) => (
                <li
                  key={line}
                  className="font-body text-sm leading-relaxed flex gap-3"
                  style={{ color: "var(--step-6)" }}
                >
                  <span aria-hidden="true" style={{ color: "var(--step-4)" }}>
                    —
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </ZoomReveal>
        </div>

        {/* ── How I work ───────────────────────────────────── */}
        <div className="section-px max-w-2xl" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
          <ZoomReveal trigger="animate" delay={0.3}>
            <div
              className="font-mono text-[10px] tracking-[0.25em] mb-6 uppercase"
              style={{ color: "var(--step-6)" }}
            >
              ... /how-i-work ...
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--step-6)" }}>
              Every project follows the same five-stage process — understand, design,
              build, verify, iterate. See the full breakdown in{" "}
              <Link
                href="/#process"
                style={{ color: "var(--mid-gray)", textDecoration: "underline" }}
              >
                how I develop
              </Link>
              .
            </p>
          </ZoomReveal>
        </div>
      </div>
    </>
  );
}
