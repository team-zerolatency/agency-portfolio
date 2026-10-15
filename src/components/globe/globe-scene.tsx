"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToVector3, greatCircleArc, getArcPoint, latLngArrayToPositions } from "@/lib/globe";
import { worldMapDots } from "@/lib/world-map-data";
import type { GlobeColors, GlobeLocation, GlobeConnection } from "@/config/globe";

const RADIUS = 1.9;
const T_CONNECT_PER_ARC = 1.5; // seconds per connection
const NUM_ARC_DOTS = 36;

/** Creates a smooth circular antialiased texture for steady, rounded dots. */
function createCircleTexture(): THREE.Texture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.55, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(16, 16, 15, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ---------- Atmosphere glow ----------
const AtmosphereGlow = ({ color }: { color: string }) => {
  return (
    <mesh scale={[1.14, 1.14, 1.14]}>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.BackSide} />
    </mesh>
  );
};

// ---------- Steady World Map Dots (no blinking, stable continent points) ----------
const WorldMapDots = ({
  color,
  circleTexture,
}: {
  color: string;
  circleTexture: THREE.Texture | null;
}) => {
  const positions = useMemo(() => latLngArrayToPositions(worldMapDots, RADIUS), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        map={circleTexture || undefined}
        color={color}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
};

// ---------- Connection Arc that connects with animation and STAYS VISIBLE ----------
interface ProgressiveArcProps {
  index: number;
  totalArcs: number;
  from: GlobeLocation;
  to: GlobeLocation;
  color: string;
  circleTexture: THREE.Texture | null;
}

const ProgressiveArc = ({
  index,
  totalArcs,
  from,
  to,
  color,
  circleTexture,
}: ProgressiveArcProps) => {
  // All 36 points along the full arc
  const fullArcPoints = useMemo(
    () => greatCircleArc(from.lat, from.lng, to.lat, to.lng, RADIUS + 0.02, NUM_ARC_DOTS, 0.25),
    [from, to],
  );

  const pointsRef = useRef<THREE.Points>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const startTime = index * T_CONNECT_PER_ARC;
    const endTime = startTime + T_CONNECT_PER_ARC;
    const initialCycleDuration = totalArcs * T_CONNECT_PER_ARC;

    if (t < startTime) {
      // Not yet connected
      if (pointsRef.current) pointsRef.current.visible = false;
      if (headRef.current) headRef.current.visible = false;
    } else if (t >= startTime && t < endTime) {
      // Actively animating and connecting!
      const progress = (t - startTime) / T_CONNECT_PER_ARC;

      if (pointsRef.current) {
        pointsRef.current.visible = true;
        const geom = pointsRef.current.geometry;
        geom.setDrawRange(0, Math.max(1, Math.floor(progress * NUM_ARC_DOTS)));
        (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.65;
      }

      if (headRef.current) {
        headRef.current.visible = true;
        const [hx, hy, hz] = getArcPoint(
          from.lat,
          from.lng,
          to.lat,
          to.lng,
          RADIUS + 0.02,
          progress,
          0.25,
        );
        headRef.current.position.set(hx, hy, hz);
      }
    } else {
      // Connected! Line stays permanently visible!
      if (pointsRef.current) {
        pointsRef.current.visible = true;
        pointsRef.current.geometry.setDrawRange(0, NUM_ARC_DOTS);
        (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.6;
      }

      // Check if subsequent looping transmission pulse is on this arc
      if (t > initialCycleDuration) {
        const loopTime = (t - initialCycleDuration) % (totalArcs * 2.2);
        const currentActiveIndex = Math.floor(loopTime / 2.2);
        const loopProgress = (loopTime % 2.2) / 2.2;

        if (currentActiveIndex === index && headRef.current) {
          headRef.current.visible = true;
          const [hx, hy, hz] = getArcPoint(
            from.lat,
            from.lng,
            to.lat,
            to.lng,
            RADIUS + 0.02,
            loopProgress,
            0.25,
          );
          headRef.current.position.set(hx, hy, hz);
        } else if (headRef.current) {
          headRef.current.visible = false;
        }
      } else if (headRef.current) {
        headRef.current.visible = false;
      }
    }
  });

  return (
    <group>
      {/* Dotted arc line that draws on connection and stays visible */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[fullArcPoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          map={circleTexture || undefined}
          color={color}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>

      {/* Traveling connection head pulse */}
      <mesh ref={headRef} visible={false}>
        <sphereGeometry args={[0.03, 14, 14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// ---------- All Connections Network ----------
const ConnectionsNetwork = ({
  locations,
  connections,
  color,
  circleTexture,
}: {
  locations: GlobeLocation[];
  connections: GlobeConnection[];
  color: string;
  circleTexture: THREE.Texture | null;
}) => {
  const validConnections = useMemo(() => {
    const map = new Map(locations.map((l) => [l.name, l]));
    return connections
      .map((c) => {
        const from = map.get(c.from);
        const to = map.get(c.to);
        if (!from || !to) return null;
        return { from, to };
      })
      .filter(Boolean) as { from: GlobeLocation; to: GlobeLocation }[];
  }, [locations, connections]);

  return (
    <>
      {validConnections.map((conn, i) => (
        <ProgressiveArc
          key={`arc-${conn.from.name}-${conn.to.name}-${i}`}
          index={i}
          totalArcs={validConnections.length}
          from={conn.from}
          to={conn.to}
          color={color}
          circleTexture={circleTexture}
        />
      ))}
    </>
  );
};

// ---------- Steady City Pin with Interactive Hover Tooltip ----------
interface CityMarkerProps {
  location: GlobeLocation;
  color: string;
  isHovered: boolean;
  onHover: (loc: GlobeLocation | null) => void;
}

const CityMarker = ({ location, color, isHovered, onHover }: CityMarkerProps) => {
  const position = useMemo(
    () => latLngToVector3(location.lat, location.lng, RADIUS + 0.02),
    [location.lat, location.lng],
  );

  return (
    <group position={position}>
      {/* Invisible hit sphere (radius 0.14) for effortless hovering */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(location);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Steady pin dot */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.045 : 0.03, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#ffffff" : color} />
      </mesh>

      {/* Subtle outer halo */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.075 : 0.052, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.55 : 0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Interactive Hover Card (visible ONLY when hovered, globe pauses) */}
      {isHovered && (
        <Html position={[0, 0.16, 0]} center style={{ pointerEvents: "none" }}>
          <div className="pointer-events-none min-w-[210px] -translate-y-2 transform rounded-xl border border-white/20 bg-black/92 px-3.5 py-2.5 text-left shadow-2xl backdrop-blur-md select-none">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="font-display text-xs font-semibold tracking-wide text-white">
                  {location.name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/60">{location.region}</span>
            </div>
            <p className="mt-1.5 font-sans text-[11px] leading-normal text-white/85">
              {location.detail}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
};

// ---------- Main Scene ----------
export interface GlobeSceneProps {
  locations: GlobeLocation[];
  connections?: GlobeConnection[];
  colors: GlobeColors;
  autoRotate: boolean;
}

export default function GlobeScene({
  locations,
  connections = [],
  colors,
  autoRotate,
}: GlobeSceneProps) {
  const circleTexture = useMemo(() => createCircleTexture(), []);
  const [hoveredCity, setHoveredCity] = useState<GlobeLocation | null>(null);

  // Globe stops moving when hovered so user can inspect details easily
  const isMoving = autoRotate && !hoveredCity;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.0], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Globe tilted and rotated to match reference image: India front-center, Europe top-left */}
      <group position={[0, 0, 0]} rotation={[0.32, -1.25, -0.08]}>
        {/* Atmosphere outer glow */}
        <AtmosphereGlow color={colors.glow} />

        {/* Occluder sphere: writes depth to hide back-facing dots naturally */}
        <mesh>
          <sphereGeometry args={[RADIUS - 0.02, 48, 48]} />
          <meshBasicMaterial colorWrite={false} depthWrite={true} />
        </mesh>

        {/* Dark body sphere (ocean background) */}
        <mesh>
          <sphereGeometry args={[RADIUS - 0.015, 64, 64]} />
          <meshBasicMaterial color={colors.glow} transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* Steady World Map Continent Dots (no blinking) */}
        <WorldMapDots color={colors.dots} circleTexture={circleTexture} />

        {/* Connections that animate to connect and STAY VISIBLE */}
        <ConnectionsNetwork
          locations={locations}
          connections={connections}
          color={colors.arc}
          circleTexture={circleTexture}
        />

        {/* Steady City Pins with hover tooltip and pause */}
        {locations.map((loc) => (
          <CityMarker
            key={loc.name}
            location={loc}
            color={colors.marker}
            isHovered={hoveredCity?.name === loc.name}
            onHover={setHoveredCity}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={isMoving}
        autoRotateSpeed={2.0}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
