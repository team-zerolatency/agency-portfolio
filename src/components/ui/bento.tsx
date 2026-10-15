import { cn } from "@/lib/cn";

// Full class names must appear in the source so Tailwind can detect them.
const sizes = {
  sm: "md:col-span-3 lg:col-span-3",
  md: "md:col-span-3 lg:col-span-4",
  wide: "md:col-span-6 lg:col-span-6",
  tall: "md:col-span-3 md:row-span-2 lg:col-span-4 lg:row-span-2",
  lg: "md:col-span-6 lg:col-span-8 lg:row-span-2",
  full: "md:col-span-6 lg:col-span-12",
} as const;

export type BentoSize = keyof typeof sizes;

export function BentoGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}

type CellProps = React.HTMLAttributes<HTMLDivElement> & { size?: BentoSize };

export function BentoCell({ size = "md", className, children, ...props }: CellProps) {
  return (
    <div
      data-size={size}
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 glass transition-colors hover:border-accent/40",
        sizes[size],
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--glow),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
