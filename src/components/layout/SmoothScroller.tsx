"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * Lenis smooth scroller with tuned momentum parameters and RAF cancellation.
 */
export default function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafHandle: number;

    function raf(time: number) {
      lenis.raf(time);
      rafHandle = requestAnimationFrame(raf);
    }

    rafHandle = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafHandle);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
