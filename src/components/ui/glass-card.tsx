import { cn } from "@/lib/cn";

export function GlassCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl glass", className)} {...props} />;
}
