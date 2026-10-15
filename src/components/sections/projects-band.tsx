import { homeConfig } from "@/config/home";
import { CountUp } from "@/components/ui/count-up";
import { Marquee } from "@/components/ui/marquee";

export function ProjectsBand() {
  const { heading, total, label, items } = homeConfig.projects;

  // Two rows, alternating projects, scrolling in opposite directions
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)].filter(
    (row) => row.length > 0,
  );

  return (
    <section aria-labelledby="projects-heading" className="border-b border-border py-16">
      <div className="text-center">
        <h2
          id="projects-heading"
          className="font-mono text-xs tracking-[0.2em] text-fg-muted uppercase"
        >
          {heading}
        </h2>
        <p className="mt-4 font-display text-6xl font-semibold tracking-tight md:text-7xl">
          {/* screen readers get the final number, not the counting animation */}
          <span className="sr-only">{`${total}+`}</span>
          <span aria-hidden>
            <CountUp to={total} suffix="+" />
          </span>
        </p>
        <p className="mt-2 text-sm text-fg-muted">{label}</p>
      </div>

      <div className="mt-10 space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} duration={50 + r * 12} reverse={r === 1}>
            {row.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 whitespace-nowrap glass"
              >
                <span className="font-display text-base font-semibold">{p.name}</span>
                <span className="font-mono text-xs tracking-[0.15em] text-fg-muted uppercase">
                  {p.category}
                </span>
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
