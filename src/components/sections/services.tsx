import {
  Gauge,
  Globe,
  LifeBuoy,
  Palette,
  Rocket,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { servicesConfig, type ServiceIcon } from "@/config/sections";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const icons: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  palette: Palette,
  rocket: Rocket,
  lifebuoy: LifeBuoy,
  gauge: Gauge,
};

export function Services() {
  const { label, heading, description, items } = servicesConfig;

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={1} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <BentoCell key={item.title} size={item.size}>
                <div className="flex h-full flex-col">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{item.description}</p>
                  {item.tags && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </BentoCell>
            );
          })}
        </BentoGrid>
      </Reveal>
    </section>
  );
}
