"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts from 0 to `to` once, when scrolled into view. Shows the final value for reduced-motion users. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: (v) => setValue(v) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : value;
  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(shown)}
      {suffix}
    </span>
  );
}
