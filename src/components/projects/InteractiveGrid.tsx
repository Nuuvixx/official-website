"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./interactive-grid.module.css";

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isTracking = false;

    const updatePosition = (x: number, y: number) => {
      targetX = x;
      targetY = y;
      if (!isTracking) {
        isTracking = true;
        setActive(true);
        if (currentX < -500) {
          currentX = targetX;
          currentY = targetY;
        }
        loop();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      setActive(false);
    };

    const onMouseLeave = () => {
      setActive(false);
    };

    const onMouseEnter = () => {
      setActive(true);
    };

    const loop = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Ultra-responsive fluid interpolation
      currentX += dx * 0.22;
      currentY += dy * 0.22;

      container.style.setProperty("--cursor-x", `${currentX.toFixed(1)}px`);
      container.style.setProperty("--cursor-y", `${currentY.toFixed(1)}px`);

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        currentX = targetX;
        currentY = targetY;
        container.style.setProperty("--cursor-x", `${currentX.toFixed(1)}px`);
        container.style.setProperty("--cursor-y", `${currentY.toFixed(1)}px`);
        isTracking = false;
        rafId = null;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.gridContainer}
      aria-hidden="true"
    >
      {/* 1. Baseline delicate light orange grid visible across entire screen */}
      <div className={styles.baseGrid} />

      {/* 2. Cursor glow layer container — illuminates and glows where cursor points */}
      <div className={`${styles.glowContainer} ${active ? styles.glowActive : ""}`}>
        <div className={styles.ambientGlow} />
        <div className={styles.glowingGridLines} />
        <div className={styles.glowingVertices} />
      </div>
    </div>
  );
}
