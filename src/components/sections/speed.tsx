"use client";
import { useRef } from "react";
import { speedConfig } from "@/config/story";
import { gsap, useGSAP } from "@/lib/gsap";
import { speedup, toPercent } from "@/lib/metrics";
import { cn } from "@/lib/cn";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function Speed() {
  const { label, heading, description, chart, rows, note } = speedConfig;
  const root = useRef<HTMLElement>(null);

  const max = Math.max(...rows.map((r) => r.days));
  const typical = rows.find((r) => !r.highlight) ?? rows[0];
  const ours = rows.find((r) => r.highlight) ?? rows[rows.length - 1];
  const factor = speedup(typical.days, ours.days);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.querySelectorAll("[data-bar]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: { trigger: el.querySelector("[data-bars]"), start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="speed" ref={root} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={5} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          <BentoCell size="lg">
            <h3 className="font-display text-xl font-semibold">{chart.title}</h3>
            <p className="mt-1 text-sm text-fg-muted">{chart.caption}</p>

            <div data-bars className="mt-8 space-y-8">
              {rows.map((row) => (
                <div key={row.label} data-row={row.label}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium">{row.label}</p>
                    <p className="font-display text-2xl font-semibold">
                      <span className="sr-only">{row.days} days</span>
                      <span aria-hidden>
                        <CountUp to={row.days} suffix=" days" />
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 h-12 overflow-hidden rounded-xl bg-bg-elevated">
                    <div
                      data-bar
                      style={{ width: `${toPercent(row.days, max)}%` }}
                      className="flex h-full"
                    >
                      {row.phases.map((p) => (
                        <div
                          key={p.name}
                          data-segment
                          title={`${p.name}: ${p.days} days`}
                          style={{ width: `${toPercent(p.days, row.days)}%` }}
                          className={cn(
                            "h-full border-r border-bg/60 last:border-r-0",
                            row.highlight ? "bg-gradient-to-r from-accent to-accent-2" : "bg-fg/15",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
                    {row.phases.map((p) => (
                      <li key={p.name}>
                        {p.name} · {p.days}d
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BentoCell>

          <BentoCell size="md">
            <div className="flex h-full flex-col justify-end">
              <p className="font-display text-5xl font-semibold">{factor}×</p>
              <p className="mt-2 text-sm text-fg-muted">faster to launch than a typical agency</p>
            </div>
          </BentoCell>

          <BentoCell size="md">
            <div className="flex h-full flex-col justify-end">
              <h3 className="font-display text-xl font-semibold">{note.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{note.text}</p>
            </div>
          </BentoCell>
        </BentoGrid>
      </Reveal>
    </section>
  );
}
