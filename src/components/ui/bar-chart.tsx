"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface BarDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarDatum[];
  title: string;
  className?: string;
}

export function BarChart({ data, title, className }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const summary = data.map((d) => `${d.label} ${d.value}`).join(", ");

  return (
    <div
      role="img"
      aria-label={`${title}: ${summary}`}
      className={cn("flex items-end gap-3", className)}
    >
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-2">
          <span className="text-center font-mono text-xs text-fg">{d.value}</span>
          <div className="flex min-h-0 flex-1 items-end">
            <div data-bar style={{ height: `${(d.value / max) * 100}%` }} className="w-full">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                style={{ transformOrigin: "bottom" }}
                className="h-full w-full rounded-t-lg bg-gradient-to-t from-accent to-accent-2"
              />
            </div>
          </div>
          <span className="text-center font-mono text-xs text-fg-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
