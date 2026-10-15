import { globeConfig } from "@/config/globe";
import { GlobeCanvas } from "@/components/globe/globe-canvas";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function GlobeSection() {
  const { label, heading, description, locations, stats } = globeConfig;

  return (
    <section id="reach" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={6} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          <BentoCell size="lg" className="p-0">
            <GlobeCanvas locations={locations} className="h-[22rem] md:h-[32rem]" />
          </BentoCell>

          <BentoCell size="tall">
            <h3 className="font-display text-xl font-semibold">Where our clients are</h3>
            <ul className="mt-4 divide-y divide-border">
              {locations.map((l) => (
                <li key={l.name} className="py-3">
                  <p className="text-sm font-medium">{l.name}</p>
                  <p className="text-xs text-fg-muted">
                    {l.region} · {l.detail}
                  </p>
                </li>
              ))}
            </ul>
          </BentoCell>

          {stats.map((s) => (
            <BentoCell key={s.label} size="md">
              <div className="flex h-full flex-col justify-end">
                <p className="font-display text-4xl font-semibold">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
              </div>
            </BentoCell>
          ))}
        </BentoGrid>
      </Reveal>
    </section>
  );
}
