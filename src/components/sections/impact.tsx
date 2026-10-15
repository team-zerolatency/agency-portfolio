import { impactConfig } from "@/config/sections";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { BarChart } from "@/components/ui/bar-chart";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function Impact() {
  const { label, heading, description, chart, counters, stack } = impactConfig;

  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={2} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          <BentoCell size="lg">
            <div className="flex h-full flex-col">
              <h3 className="font-display text-xl font-semibold">{chart.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{chart.caption}</p>
              <BarChart data={chart.data} title={chart.title} className="mt-6 min-h-56 flex-1" />
            </div>
          </BentoCell>

          {counters.map((c) => (
            <BentoCell key={c.label} size={c.size}>
              <div className="flex h-full flex-col justify-end">
                <p className="font-display text-5xl font-semibold">
                  <CountUp to={c.value} suffix={c.suffix} />
                </p>
                <p className="mt-2 text-sm text-fg-muted">{c.label}</p>
              </div>
            </BentoCell>
          ))}

          <BentoCell size="wide">
            <h3 className="font-display text-xl font-semibold">{stack.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-sm text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </BentoCell>
        </BentoGrid>
      </Reveal>
    </section>
  );
}
