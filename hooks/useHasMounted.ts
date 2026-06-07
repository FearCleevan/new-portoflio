"use client";

import { useState, useEffect } from "react";

/** Returns true only after the component has mounted on the client.
 *  Use this to gate motion components so SSR and first client render
 *  produce identical HTML, eliminating all hydration mismatches. */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}
