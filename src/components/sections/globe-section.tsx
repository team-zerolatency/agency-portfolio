import { globeConfig } from "@/config/globe";
import { GlobeCanvas } from "@/components/globe/globe-canvas";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export function GlobeSection() {
  const { label, heading, description, locations, connections, stats } = globeConfig;

  return (
    <section id="reach" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        {/* 2-Column Split matching reference: Heading on Left, Globe on Right */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headline and Description */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <SectionHeader index={6} label={label} heading={heading} description={description} />
          </div>

          {/* Right Column: Globe positioned cleanly on the right like ref img */}
          <div className="relative flex w-full items-center justify-center lg:col-span-7 lg:justify-end">
            {/* Accessible list for screen readers and SEO */}
            <ul className="sr-only" aria-label="Client locations directory">
              {locations.map((l) => (
                <li key={l.name}>
                  <span>{l.name}</span>: {l.region} - {l.detail}
                </li>
              ))}
            </ul>

            <GlobeCanvas
              locations={locations}
              connections={connections}
              className="h-[24rem] w-full sm:h-[28rem] md:h-[34rem] lg:h-[38rem]"
            />
          </div>
        </div>

        {/* Global Reach Stats Grid below */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col justify-end rounded-2xl p-6 glass transition-transform hover:-translate-y-0.5"
            >
              <p className="font-display text-3xl font-semibold text-fg sm:text-4xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-fg-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
