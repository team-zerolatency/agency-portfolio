import * as React from "react";
import { SVGProps } from "react";

export const Lighthouse = ({ className = "size-full", ...props }: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" className={className} {...props}>
    {/* Ambient light beam radiating outwards */}
    <path d="M64 26 L124 2 L128 50 Z" fill="#FEE140" opacity="0.35" />
    <path d="M64 26 L4 2 L0 50 Z" fill="#FEE140" opacity="0.35" />

    {/* Radiant central glow around lantern */}
    <circle cx="64" cy="26" r="14" fill="#FFC107" opacity="0.4" filter="blur(2px)" />

    {/* Base foundation / rocks */}
    <path d="M24 116 h80 l-6 10 H30 Z" fill="#263238" />

    {/* Tower Base */}
    <path d="M32 100 h64 l-4 16 H36 Z" fill="#37474F" />

    {/* Lower tower section (Orange/Red) */}
    <path d="M36 82 h56 l-4 18 H40 Z" fill="#FF5722" />

    {/* Middle tower stripe (White/Silver) */}
    <path d="M40 64 h48 l-4 18 H44 Z" fill="#ECEFF1" />

    {/* Upper tower section (Orange/Red) */}
    <path d="M44 46 h40 l-4 18 H48 Z" fill="#FF5722" />

    {/* Gallery balcony */}
    <path d="M42 42 h44 v4 H42 Z" fill="#263238" />

    {/* Lantern glass chamber with glowing beacon */}
    <path d="M46 22 h36 v20 H46 Z" fill="#FFF9C4" />
    {/* Bright bulb */}
    <circle cx="64" cy="32" r="7" fill="#FFD600" />
    <circle cx="64" cy="32" r="3.5" fill="#FFFFFF" />

    {/* Lantern window frames */}
    <path
      d="M46 22 h36 v3 H46 Z M46 39 h36 v3 H46 Z M57 22 v20 h2 V22 Z M69 22 v20 h2 V22 Z"
      fill="#263238"
    />

    {/* Roof Dome */}
    <path d="M48 22 Q64 10 80 22 Z" fill="#1A237E" />
    {/* Dome pinnacle / spire */}
    <path d="M62 8 h4 v6 h-4 Z M64 4 a2 2 0 1 0 0.001 0" fill="#1A237E" />

    {/* Tower window */}
    <rect x="61" y="68" width="6" height="9" rx="3" fill="#263238" />
  </svg>
);

export { Lighthouse as LighthouseIcon };
