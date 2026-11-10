import React from "react";
import styles from "./architectural-sculpture.module.css";

export default function ArchitecturalSculpture() {
  return (
    <div className={styles.sculptureWrapper} aria-label="Architectural sculptural composition in warm stone and deep aubergine shadow">
      {/* Editorial Decorative Crosshair & Coordinates */}
      <div className={styles.coordinateBadge} aria-hidden="true">
        <span className={styles.crosshair}>+</span>
        <span className={styles.coordText}>FIG. 01 — ARCHITECTURAL VOID / CANTILEVER</span>
      </div>

      {/* Main Sculptural Canvas with Asymmetric Organic Clip & Lighting */}
      <div className={styles.sculptureFrame}>
        <svg
          viewBox="0 0 800 1000"
          className={styles.svgArt}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-hidden="true"
        >
          <defs>
            {/* Linear and Radial Gradients for Oblique Sunlight & Deep Aubergine Shadows */}
            <linearGradient id="sunlitStone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBF7F2" />
              <stop offset="35%" stopColor="#EADDD4" />
              <stop offset="70%" stopColor="#D9C8BF" />
              <stop offset="100%" stopColor="#C4B2A7" />
            </linearGradient>

            <linearGradient id="warmTravertine" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="40%" stopColor="#EFE5DC" />
              <stop offset="85%" stopColor="#D5C3B8" />
              <stop offset="100%" stopColor="#BBA69A" />
            </linearGradient>

            <linearGradient id="shadowVoid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#341626" />
              <stop offset="50%" stopColor="#241A21" />
              <stop offset="100%" stopColor="#1A1218" />
            </linearGradient>

            <linearGradient id="deepPlumShadow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#52263B" />
              <stop offset="60%" stopColor="#341626" />
              <stop offset="100%" stopColor="#241A21" />
            </linearGradient>

            <linearGradient id="skyWash" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#EADDD4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F4EDE6" stopOpacity="0" />
            </linearGradient>

            {/* Asymmetric Organic Architectural Clip Mask */}
            <clipPath id="architecturalMask">
              <path d="M 120,0 C 40,180 0,380 0,560 C 0,780 180,980 440,1000 L 800,1000 L 800,0 Z" />
            </clipPath>

            {/* Subtle Texture Filter for Natural Concrete Grain */}
            <filter id="stoneGrain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.04 0" />
              <feComposite in2="SourceGraphic" in="glare" operator="over" />
            </filter>
          </defs>

          {/* Background Tone */}
          <rect width="800" height="1000" fill="url(#sunlitStone)" />

          {/* Sky Gradient Inset */}
          <rect width="800" height="500" fill="url(#skyWash)" />

          {/* Primary Monolithic Concrete Wall (Upright Cantilever) */}
          <path
            d="M 280,0 L 800,0 L 800,1000 L 520,1000 Z"
            fill="url(#warmTravertine)"
          />

          {/* Deep Interior Architectural Void (The Dark Plum/Aubergine Cavity) */}
          <path
            d="M 280,0 C 240,240 180,440 220,680 C 250,840 400,940 540,1000 L 410,1000 C 260,940 120,780 90,580 C 60,360 140,140 220,0 Z"
            fill="url(#shadowVoid)"
          />

          {/* Secondary Sweeping Curved Parabola (Foreground Sculptural Ramp) */}
          <path
            d="M 120,1000 C 180,820 280,680 440,560 C 600,440 720,260 760,0 L 800,0 L 800,1000 Z"
            fill="url(#deepPlumShadow)"
            opacity="0.94"
          />

          {/* Sunlit Curved Lip (Highlights the Razor-Sharp Cast Edge) */}
          <path
            d="M 120,1000 C 180,820 280,680 440,560 C 600,440 720,260 760,0 L 766,0 C 726,260 606,440 446,560 C 286,680 186,820 126,1000 Z"
            fill="#FFFDF9"
            opacity="0.85"
          />

          {/* Tertiary Geometric Fluting & Recessed Light Lines */}
          <line x1="380" y1="0" x2="380" y2="1000" stroke="#D9C8BF" strokeWidth="1" opacity="0.4" />
          <line x1="580" y1="0" x2="580" y2="1000" stroke="#D9C8BF" strokeWidth="1" opacity="0.3" />
          <line x1="0" y1="720" x2="800" y2="720" stroke="#D9C8BF" strokeWidth="1" strokeDasharray="4 6" opacity="0.35" />

          {/* Soft Natural Shadow Cast over Foreground */}
          <path
            d="M 320,600 Q 520,750 800,820 L 800,1000 L 260,1000 Z"
            fill="#241A21"
            opacity="0.45"
          />

          {/* Fine Architectural Dimension Notation */}
          <text x="60" y="940" fill="#655B61" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="0.1em" opacity="0.7">
            R = 480mm · VOID ANGLE 34°
          </text>
        </svg>

        {/* Ambient Warm Gradient Overlay for Photographic Depth */}
        <div className={styles.vignette} aria-hidden="true" />
      </div>
    </div>
  );
}

