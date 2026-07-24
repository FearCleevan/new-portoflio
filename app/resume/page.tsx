import Link from "next/link";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { ZoomReveal } from "@/components/motion/ZoomReveal";
import { SITE_URL } from "@/lib/constants";

const url = `${SITE_URL}/resume`;
const title = "Résumé";
const description =
  "Résumé of Peter Paul Lazan — Full-Stack Developer based in Davao City, Philippines. View or download as PDF.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title: `${title} — Peter Paul Lazan`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Peter Paul Lazan`,
    description,
  },
};

export default function ResumePage() {
  return (
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
          href="/#profile"
          className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
        >
          ← Back to Profile
        </Link>
      </div>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="section-px" style={{ paddingTop: "4rem", paddingBottom: "0" }}>
        <ZoomReveal trigger="animate" delay={0.1}>
          <SectionLabel>Résumé</SectionLabel>

          <h1
            className="font-display font-bold uppercase leading-[0.88] tracking-tight mb-6"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              color: "var(--off-white)",
            }}
          >
            Résumé
          </h1>

          <p
            className="font-body text-base leading-relaxed mb-8 max-w-2xl"
            style={{ color: "var(--step-6)" }}
          >
            Full-stack developer résumé — view it below or download the PDF.
          </p>

          <div className="flex items-center gap-6 mb-12">
            <a
              href="/resume.pdf"
              download
              className="font-mono text-[11px] tracking-widest uppercase transition-colors"
              style={{
                backgroundColor: "var(--off-white)",
                color: "var(--base)",
                border: "1px solid var(--off-white)",
                padding: "0.75rem 1.5rem",
              }}
            >
              Download PDF ↓
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
            >
              Open in new tab ↗
            </a>
          </div>
        </ZoomReveal>

        <div style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
      </div>

      {/* ── Embedded PDF viewer ──────────────────────────── */}
      <div className="section-px" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        <ZoomReveal trigger="animate" delay={0.2}>
          <div
            className="font-mono text-[10px] tracking-[0.25em] mb-4"
            style={{ color: "var(--step-5)" }}
          >
            ... /preview ...
          </div>

          <div
            className="relative w-full"
            style={{
              border: "1px solid var(--step-3)",
              backgroundColor: "var(--step-1)",
              height: "clamp(480px, 130vh, 1400px)",
              maxHeight: "85vh",
            }}
          >
            <iframe
              src="/resume.pdf"
              title="Peter Paul Lazan — Résumé"
              className="absolute inset-0"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>

          <p
            className="font-body text-sm mt-4"
            style={{ color: "var(--step-5)" }}
          >
            Preview not loading (common on some mobile browsers)?{" "}
            <a
              href="/resume.pdf"
              download
              className="underline"
              style={{ color: "var(--step-6)" }}
            >
              Download the PDF
            </a>{" "}
            instead.
          </p>
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
          href="/#profile"
          className="font-mono text-[11px] tracking-widest uppercase transition-colors text-[var(--step-5)] hover:text-[var(--off-white)]"
        >
          ← Back
        </Link>
        <div
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--step-5)" }}
        >
          Résumé
        </div>
      </div>
    </div>
  );
}
