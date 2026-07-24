"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralNetworkScene from "./NeuralNetworkScene";
import FloatingShapes from "./FloatingShapes";

interface Hero3DBackgroundProps {
  variant?: "full" | "compact";
  className?: string;
}

export default function Hero3DBackground({ variant = "full", className = "" }: Hero3DBackgroundProps) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Delay mounting the WebGL canvas until after the page's entrance
    // animations (Framer Motion) have finished — starting the render loop
    // immediately competes with those animations for the main thread and
    // can visibly stall them, especially without GPU acceleration.
    const timer = setTimeout(() => setCanRender(true), 900);
    return () => clearTimeout(timer);
  }, []);

  if (!canRender) return null;

  const isFull = variant === "full";

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        dpr={1}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 4, 6]} intensity={40} color="#8B6CF1" />
        <pointLight position={[-6, -4, 4]} intensity={30} color="#0EA5E9" />

        <NeuralNetworkScene
          nodeCount={isFull ? 30 : 18}
          spread={isFull ? [11, 7, 5] : [9, 5, 4]}
          connectionDistance={isFull ? 3 : 2.8}
        />
        <FloatingShapes variant={variant} />
      </Canvas>
    </div>
  );
}
