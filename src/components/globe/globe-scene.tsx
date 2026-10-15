"use client";
import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { fibonacciSphere, latLngToVector3 } from "@/lib/globe";
import type { GlobeColors, GlobeLocation } from "@/config/globe";

const RADIUS = 2;

export interface GlobeSceneProps {
  locations: GlobeLocation[];
  colors: GlobeColors;
  autoRotate: boolean;
}

export default function GlobeScene({ locations, colors, autoRotate }: GlobeSceneProps) {
  const positions = useMemo(() => fibonacciSphere(1800, RADIUS), []);
  const markers = useMemo(
    () =>
      locations.map((l) => ({
        name: l.name,
        position: latLngToVector3(l.lat, l.lng, RADIUS + 0.02),
      })),
    [locations],
  );

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <group rotation={[0.35, 0, 0]}>
        {/* invisible sphere: writes depth only, so dots on the far side are hidden */}
        <mesh>
          <sphereGeometry args={[RADIUS - 0.02, 48, 48]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color={colors.dots}
            sizeAttenuation
            transparent
            opacity={0.85}
          />
        </points>

        {markers.map((m) => (
          <group key={m.name} position={m.position}>
            <mesh>
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshBasicMaterial color={colors.marker} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshBasicMaterial color={colors.marker} transparent opacity={0.25} />
            </mesh>
          </group>
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
