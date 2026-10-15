"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/config/home";
import { GlassCard } from "@/components/ui/glass-card";

const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  testimonials: Testimonial[];
  /** milliseconds between automatic slides */
  interval?: number;
}

export function TestimonialSlider({ testimonials, interval = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), interval);
    return () => clearInterval(id);
  }, [paused, total, interval]);

  if (total === 0) return null;
  const t = testimonials[index];

  return (
    <GlassCard
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="p-8"
    >
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-accent" aria-hidden />
        <p className="font-mono text-xs tracking-[0.2em] text-fg-muted">
          {pad(index + 1)} / {pad(total)}
        </p>
      </div>

      <motion.figure
        key={index}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mt-6 min-h-44"
      >
        <blockquote className="text-lg leading-relaxed text-fg">{t.quote}</blockquote>
        <figcaption className="mt-6">
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-sm text-fg-muted">
            {t.role}, {t.company}
          </p>
        </figcaption>
      </motion.figure>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full glass transition hover:bg-bg-elevated"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="inline-flex size-9 items-center justify-center rounded-full glass transition hover:bg-bg-elevated"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </GlassCard>
  );
}
