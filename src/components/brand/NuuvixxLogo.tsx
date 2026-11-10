"use client";

import React from "react";
import Image from "next/image";
import styles from "./nuuvixx-logo.module.css";

interface NuuvixxLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showSymbol?: boolean;
}

export default function NuuvixxLogo({
  size = "md",
  className = "",
  showSymbol = true,
}: NuuvixxLogoProps) {
  return (
    <div className={`${styles.logoLockup} ${styles[size]} ${className}`}>
      {showSymbol && (
        <span className={styles.symbolWrapper} aria-hidden="true">
          <Image
            src="/brand/nuuvixx-symbol.png"
            alt=""
            width={32}
            height={22}
            priority
            className={styles.symbolImg}
          />
        </span>
      )}
      <span className={styles.wordmark}>
        NUUVIXX
        <span className={styles.registeredMark}>®</span>
      </span>
    </div>
  );
}

