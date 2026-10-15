import { cn } from "@/lib/cn";

interface MarqueeProps {
  children: React.ReactNode;
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
  /** initial delay in seconds (negative value advances animation timeline) */
  delay?: number;
}

/** Endless horizontal loop. Content is rendered twice; the copy is hidden from screen readers. */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  className,
  fadeEdges = true,
  delay,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          data-marquee-track
          aria-hidden={copy === 1 ? true : undefined}
          style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
          className={cn(
            "flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 pr-8",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
