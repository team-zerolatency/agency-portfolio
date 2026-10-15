import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = React.ComponentProps<typeof Link> & { variant?: "primary" | "ghost" };

export function ButtonLink({ variant = "primary", className, ...props }: Props) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition",
        variant === "primary"
          ? "bg-gradient-to-b from-accent-2 to-accent text-white shadow-[0_0_24px_var(--glow)] hover:brightness-110"
          : "text-fg glass hover:bg-bg-elevated",
        className,
      )}
      {...props}
    />
  );
}
