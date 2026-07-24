// Scroll-linked parallax transform disabled: four simultaneous useScroll
// instances (Hero/Profile/Projects/Contact) combined with Lenis's JS-driven
// scroll were the one structural difference between the homepage (where the
// fixed FloatingCta button was unreliable) and pages with no ParallaxLayer
// usage (where it was always fine). Kept as a plain static wrapper so
// Hero/Profile/Projects/Contact don't need to change their markup.

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** No longer used — kept so call sites don't need to change. */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  className,
  style,
}: ParallaxLayerProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
