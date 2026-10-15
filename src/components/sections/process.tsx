"use client";
import { useRef } from "react";
import { processConfig } from "@/config/story";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";

const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  const { label, heading, description, steps } = processConfig;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el.querySelector("[data-line-fill]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.querySelector("[data-steps]"),
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );

        el.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            y: 32,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 60%",
            toggleClass: { targets: step, className: "is-active" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="process" ref={root} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={4} label={label} heading={heading} description={description} />

      <div data-steps className="relative mt-14">
        {/* progress line */}
        <div aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-border">
          <div
            data-line-fill
            className="h-full w-full origin-top bg-gradient-to-b from-accent-2 to-accent"
          />
        </div>

        <ol className="space-y-6 pl-14">
          {steps.map((step, i) => (
            <li key={step.title} data-step className="group relative">
              <span
                data-badge
                className="absolute top-6 -left-14 inline-flex size-10 items-center justify-center rounded-full border border-accent/40 bg-bg font-mono text-sm text-accent transition-colors group-[.is-active]:border-accent group-[.is-active]:bg-accent group-[.is-active]:text-white"
              >
                {pad(i + 1)}
              </span>

              <GlassCard className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                  <p className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">
                    {step.duration}
                  </p>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-fg-muted">{step.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
