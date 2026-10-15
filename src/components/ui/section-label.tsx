import { cn } from "@/lib/cn";

/** Numbered eyebrow like "02 / Proven Impact" (same pattern as the reference site) */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index: number;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.2em] text-fg-muted uppercase", className)}>
      {String(index).padStart(2, "0")} / {label}
    </p>
  );
}
