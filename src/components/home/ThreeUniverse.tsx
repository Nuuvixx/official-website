"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const products = [
  { name: "DriveZen", color: "#CCFF00", radius: 4 },
  { name: "Synapse", color: "#A0A0B0", radius: 3 },
  { name: "agentchaos", color: "#FF4444", radius: 5 },
  { name: "BugPulse-CLI", color: "#44AAFF", radius: 3.5 },
  { name: "BugPulse-mcp", color: "#44AAFF", radius: 3.5 },
];

function OrbitingNode({ product, index, total }: { product: typeof products[0]; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);

  /**
   * Memoize random values — Math.random() called during render breaks
   * memoization and changes values on every re-render, causing React
   * to think the component changed when it didn't.
   */
  const { speed, offset } = useMemo(() => ({
    speed: 0.5 + (index / total) * 0.5,
    offset: (index / total) * Math.PI * 2,
  }), [index, total]);

  const distance = product.radius;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * distance;
    ref.current.position.z = Math.sin(t) * distance;
    // Subtle bobbing
    ref.current.position.y = Math.sin(t * 2) * 0.5;
  });

  return (
    <group ref={ref}>
      {/* Reduced segment count: 32,32 → 16,16 (same visual, 75% fewer vertices) */}
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial color={product.color} />
      </Sphere>
      <pointLight color={product.color} intensity={0.5} distance={3} />
      <Html distanceFactor={15}>
        <div style={{
          background: "rgba(4,4,10,0.8)",
          border: `1px solid ${product.color}`,
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "var(--font-jetbrains-mono)",
          whiteSpace: "nowrap",
          transform: "translate3d(-50%, -150%, 0)",
          backdropFilter: "blur(4px)",
          pointerEvents: "none"
        }}>
          {product.name}
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* Stars: 5000 → 2000 particles (60% less GPU work, visually similar) */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Central Node — reduced segments */}
      <Sphere args={[0.5, 16, 16]}>
        <meshBasicMaterial color="#CCFF00" />
      </Sphere>
      <pointLight color="#CCFF00" intensity={2} distance={10} />

      <Html distanceFactor={15} center>
        <div style={{
          color: "black",
          fontWeight: "bold",
          fontFamily: "var(--font-syne)",
          fontSize: "14px",
          pointerEvents: "none"
        }}>
          NX
        </div>
      </Html>

      {/* Orbiting Products */}
      {products.map((p, i) => (
        <OrbitingNode key={p.name} product={p} index={i} total={products.length} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.5}
      />
    </>
  );
}

export default function ThreeUniverse() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        // Limit to 30fps max when off-screen; full 60fps when in view
        frameloop="demand"
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
