export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes ld-sweep {
          0%   { width: 0%; }
          15%  { width: 22%; }
          35%  { width: 44%; }
          55%  { width: 63%; }
          75%  { width: 81%; }
          90%  { width: 91%; }
          100% { width: 95%; }
        }

        @keyframes ld-pulse-dot {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6); }
          50%       { opacity: 1;   transform: scaleY(1); }
        }

        @keyframes ld-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @keyframes ld-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes ld-scan {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div
        className="sidebar-push min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "var(--base)" }}
      >
        {/* Horizontal scan line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "var(--step-4)",
            animation: "ld-scan 2.4s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Center block ── */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{ gap: "1.75rem", animation: "ld-fade-in 0.4s ease forwards" }}
        >
          {/* Initials */}
          <div className="relative select-none">
            <span
              className="font-display font-bold"
              style={{
                fontSize: "clamp(4.5rem, 12vw, 8.5rem)",
                lineHeight: 0.88,
                color: "transparent",
                WebkitTextStroke: "1px var(--step-3)",
                letterSpacing: "0.1em",
              }}
            >
              PPL
            </span>

            {/* Subtle fill that pulses */}
            <span
              aria-hidden="true"
              className="font-display font-bold absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: "clamp(4.5rem, 12vw, 8.5rem)",
                lineHeight: 0.88,
                color: "var(--step-2)",
                WebkitTextStroke: "1px var(--step-4)",
                letterSpacing: "0.1em",
                animation: "ld-blink 2.4s ease-in-out infinite",
              }}
            >
              PPL
            </span>
          </div>

          {/* Section label */}
          <div className="flex items-center gap-4 w-full" style={{ minWidth: "260px" }}>
            <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase shrink-0"
              style={{ color: "var(--step-6)" }}
            >
              ... /loading ...
            </span>
            <div className="flex-1" style={{ height: "1px", backgroundColor: "var(--step-3)" }} />
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "260px",
              height: "1px",
              backgroundColor: "var(--step-2)",
              position: "relative",
            }}
          >
            {/* Track */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                border: "none",
                backgroundColor: "var(--step-3)",
              }}
            />
            {/* Fill */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                backgroundColor: "var(--step-5)",
                animation: "ld-sweep 2.4s ease-in-out infinite",
              }}
            />
          </div>

          {/* Dot row + status */}
          <div className="flex flex-col items-center gap-3">
            {/* Pulse dots */}
            <div className="flex items-end gap-1.5" aria-hidden="true">
              {[0, 0.18, 0.36].map((delay, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: "10px",
                    backgroundColor: "var(--step-5)",
                    animation: `ld-pulse-dot 1.1s ease-in-out ${delay}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* Status text */}
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[9px] tracking-[0.3em] uppercase"
                style={{ color: "var(--step-5)" }}
              >
                INITIALIZING
              </span>
              <span
                className="font-mono text-[9px]"
                style={{
                  color: "var(--step-4)",
                  animation: "ld-blink 1s step-end infinite",
                }}
              >
                _
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-right system label */}
        <div
          className="absolute bottom-8 right-8 hidden sm:flex items-center gap-3"
          style={{ animation: "ld-fade-in 0.4s ease 0.2s both" }}
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "var(--step-5)" }}>
            SYS / BOOT
          </span>
          <div style={{ width: "16px", height: "1px", backgroundColor: "var(--step-4)" }} />
        </div>
      </div>
    </>
  );
}
