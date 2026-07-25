"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const NODE_COLORS = ["#1672B8", "#8FBFE0", "#F97316"];

interface NeuralNetworkSceneProps {
  nodeCount?: number;
  spread?: [number, number, number];
  connectionDistance?: number;
  reactToPointer?: boolean;
}

export default function NeuralNetworkScene({
  nodeCount = 46,
  spread = [11, 7, 5],
  connectionDistance = 3.2,
  reactToPointer = true,
}: NeuralNetworkSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);
    const color = new THREE.Color();
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread[0];
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
      color.set(NODE_COLORS[i % NODE_COLORS.length]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [nodeCount, spread]);

  const linePositions = useMemo(() => {
    const segments: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < nodeCount; j++) {
        const jx = j * 3;
        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < connectionDistance) {
          segments.push(
            positions[ix], positions[ix + 1], positions[ix + 2],
            positions[jx], positions[jx + 1], positions[jx + 2]
          );
        }
      }
    }
    return new Float32Array(segments);
  }, [positions, nodeCount, connectionDistance]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x += delta * 0.008;

    if (reactToPointer) {
      const { pointer } = state;
      groupRef.current.rotation.y += pointer.x * 0.0006;
      groupRef.current.rotation.x += -pointer.y * 0.0004;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4FA3D8" transparent opacity={0.18} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          map={glowTexture}
          transparent
          opacity={0.9}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
