"use client";

import { useEffect, useRef } from "react";

interface PixelParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  glitchOffset: number;
}

const ORANGE_PALETTE = [
  "#FF6B2C", // Primary Nuuvixx Volt Orange
  "#FF8A3D", // Warm Amber
  "#FFA726", // Golden Cyber Highlight
  "#FF5722", // Deep Electric Ember
  "#FF3D00", // Saturated Neon Orange
  "#FFE082", // Glitch White-Gold Specular
];

export default function PixelTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch / coarse devices for mobile performance
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let isRunning = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: PixelParticle[] = [];
    let lastX = -1;
    let lastY = -1;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const spawnPixel = (x: number, y: number) => {
      // Create distorted pixelated cluster effect
      // Snap to 4px grid with subtle digital jitter
      const jitterX = (Math.random() - 0.5) * 16;
      const jitterY = (Math.random() - 0.5) * 16;
      const snappedX = Math.round((x + jitterX) / 3) * 3;
      const snappedY = Math.round((y + jitterY) / 3) * 3;

      // Random pixel size: 3px, 5px, or 7px square
      const sizes = [3, 4, 5, 6, 8];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = ORANGE_PALETTE[Math.floor(Math.random() * ORANGE_PALETTE.length)];

      particles.push({
        x: snappedX,
        y: snappedY,
        size,
        color,
        alpha: 0.95,
        decay: 0.03 + Math.random() * 0.035, // Rapid trail dissipation
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 + 0.2, // Subtle digital downward fall
        glitchOffset: Math.random() > 0.7 ? (Math.random() - 0.5) * 6 : 0,
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (lastX === -1 || lastY === -1) {
        lastX = currentX;
        lastY = currentY;
      }

      // Interpolate along movement vector to guarantee dense pixelated stream without gaps
      const dist = Math.hypot(currentX - lastX, currentY - lastY);
      const steps = Math.min(Math.max(Math.floor(dist / 4), 2), 16);

      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const interpX = lastX + (currentX - lastX) * t;
        const interpY = lastY + (currentY - lastY) * t;
        spawnPixel(interpX, interpY);
      }

      lastX = currentX;
      lastY = currentY;

      if (!isRunning) {
        isRunning = true;
        loop();
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Render pixelated distorted square trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.x += p.vx;
        p.y += p.vy;

        // Occasional digital chromatic glitch jump
        if (Math.random() < 0.08) {
          p.x += (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 4);
        }

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        // Draw crisp digital pixel square
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

        // Occasional secondary distorted shadow pixel for glitch depth
        if (p.glitchOffset !== 0 && p.alpha > 0.4) {
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.fillStyle = "#FF3D00";
          ctx.fillRect(Math.floor(p.x + p.glitchOffset), Math.floor(p.y), p.size, p.size);
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        isRunning = false;
        animId = null;
        lastX = -1;
        lastY = -1;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        imageRendering: "pixelated",
      }}
    />
  );
}
