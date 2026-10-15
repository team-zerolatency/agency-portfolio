import { homeConfig } from "@/config/home";
import { CountUp } from "@/components/ui/count-up";
import { Marquee } from "@/components/ui/marquee";

export function ProjectsBand() {
  const { heading, total, label, items } = homeConfig.projects;

  // Two rows, alternating projects, both scrolling right to left (starting at right vertical line and ending at left)
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)].filter(
    (row) => row.length > 0,
  );

  return (
    <section aria-labelledby="projects-heading" className="overflow-hidden py-7 sm:py-8">
      <div className="mx-auto max-w-[1360px]">
        {/* Top Left Header Stack: aligned with the left vertical grid border */}
        <div className="mb-5 flex flex-col items-start px-6 sm:px-8">
          {/* Top Left: Projects Delivered heading */}
          <h2
            id="projects-heading"
            className="font-mono text-[11px] font-semibold tracking-[0.2em] text-accent uppercase"
          >
            {heading}
          </h2>

          {/* Middle: 120+ in clean display font */}
          <p className="mt-1 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            {/* screen readers get the final number, not the counting animation */}
            <span className="sr-only">{`${total}+`}</span>
            <span aria-hidden>
              <CountUp to={total} suffix="+" />
            </span>
          </p>

          {/* Bottom: projects shipped and counting with live animated dots */}
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-fg-muted">
            <span>{label}</span>
            <span className="inline-flex items-center gap-1 pl-0.5" aria-hidden="true">
              <span className="size-1 animate-pulse rounded-full bg-accent [animation-duration:900ms]" />
              <span className="size-1 animate-pulse rounded-full bg-accent [animation-delay:250ms] [animation-duration:900ms]" />
              <span className="size-1 animate-pulse rounded-full bg-accent-2 [animation-delay:500ms] [animation-duration:900ms]" />
            </span>
          </div>
        </div>

        {/* Marquee constrained strictly between the left and right vertical lines */}
        <div
          className="relative space-y-3 overflow-hidden"
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
              duration={22}
              reverse={r === 1}
              delay={r === 1 ? -2.2 : undefined}
              fadeEdges={false}
            >
              {row.map((p) => (
                <span
                  key={p.name}
                  className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs whitespace-nowrap glass transition-all hover:border-accent/40 sm:text-sm"
                >
                  <span className="font-display font-medium text-fg">{p.name}</span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase sm:text-[11px]">
                    {p.category}
                  </span>
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}
