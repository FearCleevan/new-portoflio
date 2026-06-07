interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 mb-14 ${className}`}>
      {/* Left hairline — longer to anchor the label */}
      <div
        className="flex-1"
        style={{ height: "1px", backgroundColor: "var(--step-3)" }}
      />

      {/* Label */}
      <span
        className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0"
        style={{ color: "var(--step-6)" }}
      >
        ... /{children} ...
      </span>

      {/* Right hairline — short stub */}
      <div
        style={{ width: "40px", height: "1px", backgroundColor: "var(--step-3)" }}
      />
    </div>
  );
}
