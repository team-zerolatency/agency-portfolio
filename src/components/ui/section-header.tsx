import { cn } from "@/lib/cn";
import { SectionLabel } from "./section-label";

interface SectionHeaderProps {
  index: number;
  label: string;
  heading: { lead: string; accent: string };
  description?: string;
  className?: string;
}

export function SectionHeader({
  index,
  label,
  heading,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <SectionLabel index={index} label={label} />
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {heading.lead}{" "}
        <span className="bg-gradient-to-b from-accent-2 to-accent bg-clip-text text-transparent">
          {heading.accent}
        </span>
      </h2>
      {description && <p className="mt-4 text-fg-muted">{description}</p>}
    </header>
  );
}
