interface CircleDecorProps {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
}

export function CircleDecor({
  size = 600,
  top,
  left,
  right,
  bottom,
  className = "",
}: CircleDecorProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        border: "1px solid rgba(255,255,255,0.04)",
        flexShrink: 0,
      }}
    />
  );
}
