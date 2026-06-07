export function Sidebar() {
  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-screen z-50 flex-col items-center justify-between py-8"
      style={{
        width: "var(--sidebar-w)",
        borderRight: "1px solid var(--step-3)",
        backgroundColor: "var(--base)",
      }}
    >
      {/* Top accent dot */}
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "var(--off-white)" }}
      />

      {/* Vertical wordmark — centred */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-display font-bold uppercase text-[10px] tracking-[0.35em]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--off-white)",
            letterSpacing: "0.35em",
          }}
        >
          Peter Paul
        </span>
        <div
          className="w-px"
          style={{ height: "20px", backgroundColor: "var(--step-3)" }}
        />
        <span
          className="font-display font-light uppercase text-[10px]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--step-6)",
            letterSpacing: "0.35em",
          }}
        >
          Lazan
        </span>
      </div>

      {/* Bottom: year */}
      <span
        className="font-mono text-[9px]"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          color: "var(--step-5)",
          letterSpacing: "0.2em",
        }}
      >
        2025
      </span>
    </aside>
  );
}
