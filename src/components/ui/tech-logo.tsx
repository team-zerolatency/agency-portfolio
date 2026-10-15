import type { TechItem } from "@/config/tech";
import { brandColor } from "@/lib/brand";
import { cn } from "@/lib/cn";

interface TechLogoProps {
  tech: TechItem;
  className?: string;
}

/** Neutral by default (follows the theme), original brand color on hover. */
export function TechLogo({ tech, className }: TechLogoProps) {
  return (
    <span
      data-tech={tech.name}
      style={{ "--brand": brandColor(tech.hex) } as React.CSSProperties}
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap text-fg-muted transition-colors duration-200 hover:text-[var(--brand)]",
        className,
      )}
    >
      <svg
        viewBox={tech.viewBox ?? "0 0 24 24"}
        aria-hidden="true"
        className="size-5 shrink-0 fill-current"
      >
        <path d={tech.path} />
      </svg>
      <span className="font-mono text-xs tracking-[0.2em] uppercase">{tech.name}</span>
    </span>
  );
}
