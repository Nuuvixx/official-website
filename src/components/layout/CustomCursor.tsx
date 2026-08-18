"use client";
import { useEffect, useRef } from "react";
import styles from "./cursor.module.css";

/**
 * Ref-based custom cursor — zero React re-renders on mouse move.
 * We write directly to DOM style.transform via rAF, bypassing React's
 * reconciler entirely for maximum smoothness.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add(styles.hideNativeCursor);

    let raf: number;
    let mouseX = 0;
    let mouseY = 0;
    // Ring lags behind slightly (spring-like lerp)
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;

    const LERP = 0.18; // ring follows at 18% per frame → springy feel

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        !!target.dataset.magnetic;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Lerp ring toward mouse
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;

      // Ring: center on cursor (16px = half of 32px ring)
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(${isHovering ? 1.5 : 1})`;
      ring.style.borderColor = isHovering ? "var(--color-volt)" : "rgba(255,255,255,0.2)";

      // Dot: snaps to exact cursor position (4px = half of 8px dot)
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${isHovering ? 0 : 1})`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove(styles.hideNativeCursor);
    };
  }, []);

  // Don't render on server or touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className={styles.cursorRing}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
          transition: "border-color 0.2s, transform 0.05s",
          pointerEvents: "none",
        }}
      />
      <div
        ref={dotRef}
        className={styles.cursorDot}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
          transition: "transform 0.05s",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
