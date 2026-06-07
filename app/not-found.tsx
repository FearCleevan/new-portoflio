"use client";

import Link from "next/link";
import { CircleDecor } from "@/components/shared/CircleDecor";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes nf-glitch-main {
          0%, 82%, 100% { transform: translate(0, 0); }
          83%  { transform: translate(-4px, 0); }
          84%  { transform: translate( 4px, 1px); }
          85%  { transform: translate(-2px, 0); }
          86%  { transform: translate(0, 0); }
          87%  { transform: translate( 3px, -1px); }
          88%  { transform: translate(-3px, 0); }
          89%  { transform: translate(0, 0); }
        }

        @keyframes nf-glitch-a {
          0%, 82%, 100% { opacity: 0; clip-path: inset(0 0 100% 0); }
          83%  { opacity: 0.75; transform: translate(-6px, 0); clip-path: inset(12% 0 68% 0); }
          84%  { opacity: 0.65; transform: translate( 6px, 0); clip-path: inset(62% 0 18% 0); }
          85%  { opacity: 0.80; transform: translate(-3px, 0); clip-path: inset(32% 0 48% 0); }
          86%  { opacity: 0; clip-path: inset(0 0 100% 0); }
          87%  { opacity: 0.70; transform: translate( 4px, 0); clip-path: inset(47% 0 33% 0); }
          88%  { opacity: 0; clip-path: inset(0 0 100% 0); }
        }

        @keyframes nf-glitch-b {
          0%, 82%, 100% { opacity: 0; clip-path: inset(0 0 100% 0); }
          83%  { opacity: 0.55; transform: translate( 5px, 0); clip-path: inset(57% 0 28% 0); }
          84%  { opacity: 0; clip-path: inset(0 0 100% 0); }
          85%  { opacity: 0.65; transform: translate(-5px, 0); clip-path: inset(22% 0 62% 0); }
          86%  { opacity: 0.70; transform: translate( 3px, 0); clip-path: inset(42% 0 42% 0); }
          87%  { opacity: 0; clip-path: inset(0 0 100% 0); }
          88%  { opacity: 0.60; transform: translate(-4px, 0); clip-path: inset(72% 0 12% 0); }
          89%  { opacity: 0; clip-path: inset(0 0 100% 0); }
        }

        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes nf-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div className="sidebar-push min-h-screen flex items-center justify-center relative overflow-hidden section-px py-20">
        {/* Decorative circles */}
        <CircleDecor size={720} top="-260px" right="-200px" />
        <CircleDecor size={480} bottom="-200px" left="-120px" />
        <CircleDecor size={220} top="18%" right="14%" />

        {/* Top-left error code */}
        <div className="absolute top-8 left-0 hidden md:flex items-center gap-3" style={{ marginLeft: "calc(var(--sidebar-w) + 2rem)" }}>
          <div style={{ width: "20px", height: "1px", backgroundColor: "var(--step-4)" }} />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--step-5)" }}>
            ERR_404
          </span>
        </div>

        {/* Top-right status */}
        <div className="absolute top-8 right-8 hidden sm:flex items-center gap-3">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--step-5)" }}>
            STATUS / NOT_FOUND
          </span>
          <div style={{ width: "20px", height: "1px", backgroundColor: "var(--step-4)" }} />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 text-center" style={{ maxWidth: "820px", width: "100%" }}>

          {/* 404 glitch stack */}
          <div
            className="relative inline-block mb-6 select-none"
            style={{ animation: "nf-fade-up 0.55s ease forwards" }}
          >
            {/* Outline ghost — always visible */}
            <span
              aria-hidden="true"
              className="font-display font-bold block"
              style={{
                fontSize: "clamp(6.5rem, 21vw, 15rem)",
                lineHeight: 0.84,
                color: "transparent",
                WebkitTextStroke: "1px var(--step-3)",
              }}
            >
              404
            </span>

            {/* Filled base layer */}
            <span
              className="font-display font-bold absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: "clamp(6.5rem, 21vw, 15rem)",
                lineHeight: 0.84,
                color: "var(--step-2)",
                WebkitTextStroke: "1px var(--step-4)",
                animation: "nf-glitch-main 6s infinite",
              }}
            >
              404
            </span>

            {/* Glitch layer A */}
            <span
              aria-hidden="true"
              className="font-display font-bold absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                fontSize: "clamp(6.5rem, 21vw, 15rem)",
                lineHeight: 0.84,
                color: "var(--off-white)",
                opacity: 0,
                animation: "nf-glitch-a 6s infinite",
              }}
            >
              404
            </span>

            {/* Glitch layer B */}
            <span
              aria-hidden="true"
              className="font-display font-bold absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                fontSize: "clamp(6.5rem, 21vw, 15rem)",
                lineHeight: 0.84,
                color: "var(--mid-gray)",
                opacity: 0,
                animation: "nf-glitch-b 6s infinite 0.08s",
              }}
            >
              404
            </span>
          </div>

          {/* Section label */}
          <div
            className="flex items-center gap-4 mb-7 mx-auto"
            style={{ maxWidth: "440px", animation: "nf-fade-up 0.55s ease 0.12s both" }}
          >
            <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0" style={{ color: "var(--step-6)" }}>
              ... /page-not-found ...
            </span>
            <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
          </div>

          {/* Description */}
          <p
            className="font-body mx-auto mb-10"
            style={{
              fontSize: "0.9375rem",
              color: "var(--step-6)",
              maxWidth: "340px",
              lineHeight: 1.75,
              animation: "nf-fade-up 0.55s ease 0.24s both",
            }}
          >
            The page you&apos;re looking for has been moved, deleted, or never existed.
          </p>

          {/* CTA button */}
          <div style={{ animation: "nf-fade-up 0.55s ease 0.36s both" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
              style={{
                height: "2.75rem",
                padding: "0 1.75rem",
                backgroundColor: "var(--off-white)",
                color: "var(--base)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--mid-gray)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--off-white)";
              }}
            >
              <span style={{ fontSize: "0.8rem" }}>←</span>
              RETURN HOME
            </Link>
          </div>

          {/* Bottom meta strip */}
          <div
            className="flex items-center justify-center gap-5 mt-14"
            style={{ animation: "nf-fade-up 0.55s ease 0.48s both" }}
          >
            {[["HTTP", "404"], ["CLIENT", "ERROR"], ["RESOURCE", "MISSING"]].map(([k, v], i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && (
                  <div style={{ width: "1px", height: "10px", backgroundColor: "var(--step-4)" }} />
                )}
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: "var(--step-5)" }}>
                    {k}
                  </span>
                  <span className="font-mono text-[8px]" style={{ color: "var(--step-4)" }}>/</span>
                  <span
                    className="font-mono text-[8px] tracking-[0.25em] uppercase"
                    style={{ color: "var(--step-6)" }}
                  >
                    {v}
                  </span>
                </div>
              </div>
            ))}
            <div style={{ width: "1px", height: "10px", backgroundColor: "var(--step-4)" }} />
            <span
              className="font-mono text-[8px]"
              style={{
                color: "var(--step-4)",
                animation: "nf-blink 1.2s step-end infinite",
              }}
            >
              _
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
