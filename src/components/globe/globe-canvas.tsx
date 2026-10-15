"use client";
import { lazy, Suspense, useRef, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { globeColors, type GlobeLocation, type GlobeConnection } from "@/config/globe";
import { hasWebGL } from "@/lib/webgl";
import { cn } from "@/lib/cn";

// The Three.js code only downloads when this chunk is first rendered.
const GlobeScene = lazy(() => import("./globe-scene"));

const subscribe = () => () => {};

function Placeholder() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 m-auto aspect-square h-3/4 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--glow),transparent_70%)] opacity-60"
    />
  );
}

interface GlobeCanvasProps {
  locations: GlobeLocation[];
  connections?: GlobeConnection[];
  className?: string;
}

export function GlobeCanvas({ locations, connections = [], className }: GlobeCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  // start loading a little before the section scrolls into view
  const nearViewport = useInView(ref, { once: true, margin: "300px" });
  // server snapshot is `true` so the markup matches; the browser then corrects it if needed
  const supported = useSyncExternalStore(subscribe, hasWebGL, () => true);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const colors = globeColors[resolvedTheme === "light" ? "light" : "dark"];

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Interactive globe showing client locations"
      className={cn("relative w-full", className)}
    >
      {!supported ? (
        <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-fg-muted">
          Interactive globe unavailable on this device.
        </p>
      ) : nearViewport ? (
        <Suspense fallback={<Placeholder />}>
          <GlobeScene
            locations={locations}
            connections={connections}
            colors={colors}
            autoRotate={!reduceMotion}
          />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
