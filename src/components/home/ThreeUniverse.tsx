"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const products = [
  { name: "DriveZen", color: "#FF6B2C", radius: 4 },
  { name: "Synapse", color: "#A0A0B0", radius: 3 },
  { name: "agentchaos", color: "#FF4444", radius: 5 },
  { name: "BugPulse-CLI", color: "#7ecff4", radius: 3.5 },
  { name: "BugPulse-mcp", color: "#7ecff4", radius: 3.5 },
];

function OrbitingNode({ product, index, total }: { product: any; index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);
  
  // Distribute nodes in orbit
  const angle = (index / total) * Math.PI * 2;
  const distance = product.radius;
  const speed = 0.5 + Math.random() * 0.5;
  const offset = Math.random() * Math.PI * 2;
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * distance;
    ref.current.position.z = Math.sin(t) * distance;
    // Add some bobbing
    ref.current.position.y = Math.sin(t * 2) * 0.5;
  });

  return (
    <group ref={ref}>
      <Sphere args={[0.2, 32, 32]}>
        <meshBasicMaterial color={product.color} />
      </Sphere>
      <pointLight color={product.color} intensity={0.5} distance={3} />
      <Html distanceFactor={15}>
        <div style={{
          background: "rgba(4,4,10,0.85)",
          border: `1px solid ${product.color}`,
          color: "white",
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono), monospace",
          whiteSpace: "nowrap",
          transform: "translate3d(-50%, -150%, 0)",
          backdropFilter: "blur(8px)",
          pointerEvents: "none",
          letterSpacing: "0.05em"
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
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Central Node */}
      <Sphere args={[0.5, 32, 32]}>
        <meshBasicMaterial color="#FF6B2C" />
      </Sphere>
      <pointLight color="#FF6B2C" intensity={2} distance={10} />
      
      <Html distanceFactor={15} center>
        <div style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "14px",
          pointerEvents: "none",
          textShadow: "0 0 10px rgba(255,107,44,0.5)"
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
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
