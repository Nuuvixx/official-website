"use client";
import { motion } from "framer-motion";
import styles from "./home.module.css";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeUniverse = dynamic(() => import("./ThreeUniverse"), { ssr: false });

const products = [
  { name: "DriveZen", x: -200, y: -150 },
  { name: "Synapse", x: 200, y: -180 },
  { name: "agentchaos", x: -280, y: 100 },
  { name: "BugPulse-CLI", x: 250, y: 120 },
  { name: "BugPulse-mcp", x: 0, y: 250 },
];

export default function ProductUniverse() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section className={styles.universeSection} style={{ minHeight: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative' }}>
      <h2 style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", fontSize: "clamp(1.75rem, 4vw, var(--font-size-4xl))", fontWeight: 700, marginBottom: "var(--space-20)", position: "relative", zIndex: 10 }}>The Nuuvixx Ecosystem</h2>
      <div style={{ position: "relative", width: "100%", height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {isDesktop ? (
          <ThreeUniverse />
        ) : (
          <>
            {/* Central Node */}
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "var(--color-volt)", boxShadow: "var(--shadow-volt)", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#fff", fontSize: "var(--font-size-xl)" }}>NX</div>

            {/* Orbiting Products */}
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", delay: i * 0.1, stiffness: 80, damping: 15 }}
                whileHover={{ scale: 1.05, zIndex: 20, borderColor: "var(--color-volt)", boxShadow: "var(--shadow-lg)" }}
                style={{
                  position: "absolute",
                  x: product.x,
                  y: product.y,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "var(--space-6)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                  backdropFilter: "blur(10px)",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
              >
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", color: "var(--color-volt)", fontSize: "var(--font-size-xs)", marginBottom: "var(--space-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Active</div>
                <div style={{ fontWeight: 600, fontSize: "var(--font-size-lg)" }}>{product.name}</div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
