"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * Ultra-responsive Lenis smooth scroller.
 * - lerp: 0.1 / duration: 0.8s ensures instant input response with zero scroll lag.
 * - Touch is passed to native 120Hz smooth compositor for mobile devices.
 */
export default function SmoothScroller({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable smooth scroll on coarse pointer / touch devices for 100% native 120Hz scroll
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
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
