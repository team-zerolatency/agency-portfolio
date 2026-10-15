import * as React from "react";
import { useId } from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  idPrefix?: string;
  className?: string;
}

export function ZeroLatencyLogo({
  idPrefix,
  className = "h-8.5 w-auto select-none sm:h-9",
  ...props
}: LogoProps) {
  const generatedId = useId().replace(/:/g, "");
  const prefix = idPrefix || `zl-${generatedId}`;

  const latencyBlueId = `${prefix}-latency-deep-blue`;
  const smearGradId = `${prefix}-paint-smear-grad`;
  const streakGradId = `${prefix}-paint-streak-grad`;
  const glassSheenId = `${prefix}-glass-light-sheen`;
  const glassClipId = `${prefix}-zero-latency-glass-clip`;

  return (
    <svg
      viewBox="0 0 205 38"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Vibrant deep electric blue specifically for Latency */}
        <linearGradient id={latencyBlueId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="45%" stopColor="#2b8cff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Hand-rubbed paint smear gradient extending across both Zero and Latency */}
        <linearGradient
          id={smearGradId}
          x1="0"
          y1="18"
          x2="200"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2b8cff" stopOpacity="0.3" />
          <stop offset="30%" stopColor="#2b8cff" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#2563eb" stopOpacity="0.6" />
          <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
        </linearGradient>

        {/* Secondary paint dry-brush gradient */}
        <linearGradient id={streakGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2b8cff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2b8cff" stopOpacity="0.1" />
        </linearGradient>

        {/* Glass lighting sheen beam */}
        <linearGradient id={glassSheenId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#7cc0ff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Clip path matching the wordmark text so light shines precisely across the letters */}
        <clipPath id={glassClipId}>
          <text
            x="6"
            y="26"
            style={{
              fontFamily: "var(--font-space), var(--font-inter), sans-serif",
              fontSize: "23px",
              fontStyle: "italic",
              fontWeight: "900",
              letterSpacing: "-0.04em",
            }}
          >
            <tspan>Zero</tspan>
            <tspan>Latency</tspan>
          </text>
        </clipPath>
      </defs>

      {/* Hand-rubbed painting brush swipe - lower opacity, extended across Zero & Latency, NO dots */}
      <g className="opacity-45 transition-opacity duration-300 group-hover:opacity-70">
        {/* Primary broad hand swipe starting right at the beginning of Zero */}
        <path
          d="M2 24 C 25 21, 65 25, 110 21 C 145 18, 175 22, 202 18 C 182 26, 138 27, 95 28 C 55 30, 20 28, 2 24 Z"
          fill={`url(#${smearGradId})`}
        />
        {/* Upper trailing dry-brush stroke across Zero and Latency */}
        <path
          d="M8 16 C 45 14, 90 17, 138 13 C 165 11, 186 14, 200 11 C 178 16, 140 18, 102 19 C 65 20, 32 18, 8 16 Z"
          fill={`url(#${streakGradId})`}
        />
        {/* Trailing flick */}
        <path
          d="M125 14 C 150 12, 178 15, 202 12 C 185 17, 155 16, 125 14 Z"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
      </g>

      {/* Bold italic ZeroLatency wordmark */}
      <text
        x="6"
        y="26"
        style={{
          fontFamily: "var(--font-space), var(--font-inter), sans-serif",
          fontSize: "23px",
          fontStyle: "italic",
          fontWeight: "900",
          letterSpacing: "-0.04em",
        }}
      >
        <tspan className="fill-fg transition-colors">Zero</tspan>
        <tspan fill={`url(#${latencyBlueId})`} className="font-black">
          Latency
        </tspan>
      </text>

      {/* Glass lighting reflection sweep animation from left to right */}
      <g clipPath={`url(#${glassClipId})`} className="pointer-events-none">
        <rect
          x="0"
          y="-10"
          width="46"
          height="58"
          fill={`url(#${glassSheenId})`}
          className="animate-glass-sweep"
        />
      </g>
    </svg>
  );
}
