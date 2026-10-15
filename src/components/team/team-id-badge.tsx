"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/config/team";

interface TeamIdBadgeProps {
  member: TeamMember;
}

export function TeamIdBadge({ member }: TeamIdBadgeProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Lanyard hanging strap from top */}
      <div className="h-6 w-4 rounded-t-sm bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 shadow-inner" />

      {/* Cyber ID Badge with Metallic Clamp physically attached directly to top edge */}
      {/* On hover: Smooth, organic pendulum sway anchored from the lanyard clamp */}
      <motion.div
        className="relative w-full max-w-[280px] cursor-pointer"
        style={{ transformOrigin: "top center" }}
        whileHover={{
          rotate: [0, -2.2, 1.8, -1.0, 0.4, 0],
          x: [0, -1.2, 1.0, -0.5, 0],
          transition: {
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      >
        {/* Metallic clamp clasp gripping directly onto the badge border - ZERO gap, overlapping */}
        <div className="pointer-events-none absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
          <div className="flex h-5 w-8 items-center justify-center rounded-[3px] border border-neutral-400/80 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-500 shadow-lg">
            {/* Clasp center rivet/grip hole */}
            <div className="flex h-2 w-3.5 items-center justify-center rounded-sm border border-neutral-700 bg-neutral-900/90">
              <div className="size-1 rounded-full bg-neutral-400 shadow-inner" />
            </div>
          </div>
        </div>

        {/* Badge Card Container */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-border p-4 pt-5 shadow-2xl backdrop-blur-xl glass transition-all duration-300 hover:border-accent/50 hover:shadow-accent/20">
          {/* Lanyard slot punch-hole directly under the clamp */}
          <div className="bg-surface-elevated mx-auto -mt-2 mb-3 h-1.5 w-7 rounded-full border border-border/80 shadow-inner" />

          {/* Top badge banner */}
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-xs font-bold tracking-wider text-fg">ZEROLATENCY</span>
            <div className="flex items-center gap-2">
              <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-accent">
                {member.badgeType}
              </span>
              <span className="bg-surface flex size-6 items-center justify-center rounded border border-border font-mono text-xs text-fg-muted">
                &lt;&gt;
              </span>
            </div>
          </div>

          {/* Member photo with uniform framing and gradient fade */}
          <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-xl border border-border bg-bg-elevated">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="280px"
              priority
            />
            {/* Subtle bottom shadow overlay to blend with card */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-transparent to-transparent opacity-80" />
          </div>

          {/* Name and Role */}
          <div className="mt-3">
            <h4 className="font-display text-xl font-bold tracking-tight text-fg">{member.name}</h4>
            <p className="mt-0.5 font-mono text-[11px] tracking-wider text-fg-muted uppercase">
              {member.role}
            </p>
          </div>

          {/* Secondary role tags */}
          <div className="mt-3 border-t border-border pt-2.5">
            <p className="font-mono text-[9px] tracking-[0.2em] text-fg-muted uppercase">
              {member.subroles}
            </p>
          </div>

          {/* Barcode and ID footer */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
            <span className="font-mono text-xs font-bold tracking-widest text-accent">
              {member.id}
            </span>

            {/* SVG barcode */}
            <svg
              className="h-5 w-24 text-fg-muted"
              viewBox="0 0 100 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="3" height="24" />
              <rect x="5" y="0" width="1" height="24" />
              <rect x="8" y="0" width="4" height="24" />
              <rect x="14" y="0" width="2" height="24" />
              <rect x="18" y="0" width="1" height="24" />
              <rect x="21" y="0" width="3" height="24" />
              <rect x="26" y="0" width="1" height="24" />
              <rect x="29" y="0" width="5" height="24" />
              <rect x="36" y="0" width="2" height="24" />
              <rect x="40" y="0" width="1" height="24" />
              <rect x="43" y="0" width="3" height="24" />
              <rect x="48" y="0" width="2" height="24" />
              <rect x="52" y="0" width="4" height="24" />
              <rect x="58" y="0" width="1" height="24" />
              <rect x="61" y="0" width="3" height="24" />
              <rect x="66" y="0" width="2" height="24" />
              <rect x="70" y="0" width="1" height="24" />
              <rect x="73" y="0" width="5" height="24" />
              <rect x="80" y="0" width="2" height="24" />
              <rect x="84" y="0" width="3" height="24" />
              <rect x="89" y="0" width="1" height="24" />
              <rect x="92" y="0" width="3" height="24" />
              <rect x="97" y="0" width="3" height="24" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
