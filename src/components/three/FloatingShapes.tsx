"use client";

import { Float } from "@react-three/drei";

interface ShapeDef {
  position: [number, number, number];
  scale: number;
  color: string;
  geometry: "icosahedron" | "torusKnot" | "octahedron" | "torus" | "dodecahedron";
  wireframe?: boolean;
  speed?: number;
}

const FULL_SHAPES: ShapeDef[] = [
  { position: [-5.5, 2.2, -2], scale: 1, color: "#F97316", geometry: "icosahedron", wireframe: true, speed: 1.1 },
  { position: [5.8, -1.8, -1.5], scale: 1.3, color: "#1672B8", geometry: "torusKnot", wireframe: false, speed: 0.8 },
  { position: [4.4, 2.6, -3], scale: 0.7, color: "#EAB308", geometry: "octahedron", wireframe: true, speed: 1.4 },
  { position: [-4.8, -2.4, -2.5], scale: 0.9, color: "#606062", geometry: "torus", wireframe: false, speed: 1 },
  { position: [0, 3.4, -4], scale: 0.6, color: "#F97316", geometry: "dodecahedron", wireframe: true, speed: 1.2 },
];

const COMPACT_SHAPES: ShapeDef[] = [
  { position: [-4.5, 1.4, -2], scale: 0.7, color: "#F97316", geometry: "icosahedron", wireframe: true, speed: 1.1 },
  { position: [4.6, -1.2, -1.5], scale: 0.9, color: "#1672B8", geometry: "torusKnot", wireframe: false, speed: 0.8 },
  { position: [3.6, 1.8, -2.5], scale: 0.5, color: "#EAB308", geometry: "octahedron", wireframe: true, speed: 1.3 },
];

function ShapeMesh({ shape }: { shape: ShapeDef }) {
  return (
    <Float speed={shape.speed} rotationIntensity={1.2} floatIntensity={1.6}>
      <mesh position={shape.position} scale={shape.scale}>
        {shape.geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {shape.geometry === "torusKnot" && <torusKnotGeometry args={[0.7, 0.22, 48, 8]} />}
        {shape.geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {shape.geometry === "torus" && <torusGeometry args={[0.8, 0.28, 16, 48]} />}
        {shape.geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        {shape.wireframe ? (
          <meshBasicMaterial color={shape.color} wireframe transparent opacity={0.5} />
        ) : (
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.22}
            roughness={0.2}
            metalness={0.3}
            emissive={shape.color}
            emissiveIntensity={0.25}
          />
        )}
      </mesh>
    </Float>
  );
}

export default function FloatingShapes({ variant = "full" }: { variant?: "full" | "compact" }) {
  const shapes = variant === "full" ? FULL_SHAPES : COMPACT_SHAPES;
  return (
    <>
      {shapes.map((shape, i) => (
        <ShapeMesh key={i} shape={shape} />
      ))}
    </>
  );
}
