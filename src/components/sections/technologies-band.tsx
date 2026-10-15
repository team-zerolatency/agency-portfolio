import { technologiesConfig } from "@/config/technologies";
import { CountUp } from "@/components/ui/count-up";
import { Marquee } from "@/components/ui/marquee";

export function TechnologiesBand() {
  const { heading, count, label, subtitle, items } = technologiesConfig;

  // Two rows of tech stack SVGs, alternating, scrolling in opposing directions
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)].filter(
    (row) => row.length > 0,
  );

  return (
    <section aria-labelledby="technologies-heading" className="overflow-hidden py-7 sm:py-8">
      <div className="mx-auto max-w-[1360px]">
        {/* Top Left Header Stack: aligned with the left vertical grid border */}
        <div className="mb-5 flex flex-col items-start px-6 sm:px-8">
          {/* Top Left: Technologies We Use heading */}
          <h2
            id="technologies-heading"
            className="font-mono text-[11px] font-semibold tracking-[0.2em] text-accent uppercase"
          >
            {heading}
          </h2>

          {/* Middle: 24+ in clean display font with subtitle label */}
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            {/* screen readers get the final number, not the counting animation */}
            <span className="sr-only">{`${count}+`}</span>
            <span aria-hidden>
              <CountUp to={count} suffix="+" />
            </span>
            {label ? (
              <span className="ml-2.5 font-sans text-base font-normal text-fg-muted sm:text-lg">
                {label}
              </span>
            ) : null}
          </p>

          {/* Bottom: Subtitle with live animated indicator dots */}
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted">
            <span>{subtitle}</span>
            <span className="inline-flex items-center gap-1 pl-0.5" aria-hidden="true">
              <span className="size-1 animate-pulse rounded-full bg-accent [animation-duration:900ms]" />
              <span className="size-1 animate-pulse rounded-full bg-accent [animation-delay:250ms] [animation-duration:900ms]" />
              <span className="size-1 animate-pulse rounded-full bg-accent-2 [animation-delay:500ms] [animation-duration:900ms]" />
            </span>
          </div>
        </div>

        {/* Marquee constrained strictly between the left and right vertical lines */}
        <div
          className="relative space-y-4 overflow-hidden py-2"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)",
          }}
        >
          {rows.map((row, r) => (
            <Marquee
              key={r}
              duration={54}
              reverse={r === 1}
              delay={r === 1 ? -4.5 : undefined}
              fadeEdges={false}
              pauseOnHover={true}
              className="[&_[data-marquee-track]]:gap-3 [&_[data-marquee-track]]:pr-3 sm:[&_[data-marquee-track]]:gap-5 sm:[&_[data-marquee-track]]:pr-5"
            >
              {row.map((tech) => (
                <div
                  key={tech.name}
                  className="group/tech relative flex h-10 w-11 cursor-pointer items-center justify-center select-none sm:h-12 sm:w-13"
                  title={tech.name}
                  aria-label={tech.name}
                >
                  {/*
                    Pure standalone logo with tighter spacing and refined sizing.
                    Size: size-8 to size-10 (~32px to 40px).
                    On hover: smoothly reveals authentic original brand colors!
                  */}
                  <span
                    className="flex size-8 shrink-0 items-center justify-center opacity-65 contrast-90 grayscale filter transition-all duration-300 ease-out group-hover/tech:opacity-100 group-hover/tech:contrast-100 group-hover/tech:grayscale-0 sm:size-10"
                    aria-hidden="true"
                  >
                    {tech.icon}
                  </span>
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
