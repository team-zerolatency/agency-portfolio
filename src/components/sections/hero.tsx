"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { homeConfig } from "@/config/home";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { CountUp } from "@/components/ui/count-up";
import { TestimonialSlider } from "./testimonial-slider";

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
});

export function Hero() {
  const { eyebrow, headline, description, strip, stats } = homeConfig.hero;

  return (
    <section className="relative overflow-hidden pt-16">
      {/* background: glow + faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--glow),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] bg-[size:48px_48px]"
      />

      {/* top strip */}
      <div className="border-b border-border py-3">
        <Marquee duration={35}>
          {strip.map((item) => (
            <span
              key={item}
              className="font-mono text-xs tracking-[0.2em] whitespace-nowrap text-fg-muted uppercase"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
        <div>
          <motion.p
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-fg-muted glass"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {eyebrow}
          </motion.p>

          <motion.h1
            {...reveal(1)}
            className="mt-6 font-display text-5xl leading-[1.05] font-semibold tracking-tight md:text-6xl lg:text-7xl"
          >
            {headline.lead}{" "}
            <span className="bg-gradient-to-b from-accent-2 to-accent bg-clip-text text-transparent">
              {headline.accent}
            </span>
          </motion.h1>

          <motion.p {...reveal(2)} className="mt-6 max-w-xl text-lg text-fg-muted">
            {description}
          </motion.p>

          <motion.div {...reveal(3)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.cta.href}>
              {siteConfig.cta.label}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={siteConfig.secondaryCta.href} variant="ghost">
              {siteConfig.secondaryCta.label}
            </ButtonLink>
          </motion.div>

          <motion.dl {...reveal(4)} className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs text-fg-muted">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...reveal(3)}>
          <TestimonialSlider testimonials={homeConfig.testimonials} />
        </motion.div>
      </div>
    </section>
  );
}
