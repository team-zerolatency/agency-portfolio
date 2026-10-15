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
import { ReactIcon } from "@/components/icons/tech/react";
import { Android } from "@/components/icons/tech/android";
import { GraphQL } from "@/components/icons/tech/graphql";
import { Figma } from "@/components/icons/tech/figma";
import { Docker } from "@/components/icons/tech/docker";
import { Github } from "@/components/icons/tech/github";
import { Lighthouse } from "@/components/icons/tech/lighthouse";

const icons: Record<ServiceIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  palette: Palette,
  rocket: Rocket,
  lifebuoy: LifeBuoy,
  gauge: Gauge,
};

interface BgConfig {
  component: React.ComponentType<{ className?: string }>;
  className: string;
  wrapperClassName: string;
}

const bgIcons: Record<string, BgConfig> = {
  "Full-stack web apps": {
    component: ReactIcon,
    className:
      "h-52 w-52 sm:h-60 sm:w-60 lg:h-68 lg:w-68 -rotate-[35deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[30%] translate-x-[22%] select-none z-0",
  },
  "Android apps": {
    component: Android,
    className:
      "h-38 w-38 sm:h-46 sm:w-46 -rotate-[20deg] opacity-20 grayscale filter transition-all duration-300 ease-out text-[#3DDC84] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[32%] translate-x-[20%] select-none z-0",
  },
  "APIs & backends": {
    component: GraphQL,
    className:
      "h-36 w-36 sm:h-42 sm:w-42 -rotate-[35deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[30%] translate-x-[20%] select-none z-0",
  },
  "UI/UX design": {
    component: Figma,
    className:
      "h-26 w-26 sm:h-30 sm:w-30 -rotate-[45deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[20%] translate-x-[15%] select-none z-0",
  },
  "Deployment & DevOps": {
    component: Docker,
    className:
      "h-38 w-38 sm:h-46 sm:w-46 -rotate-[25deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[28%] translate-x-[20%] select-none z-0",
  },
  "Maintenance & support": {
    component: Github,
    className:
      "h-28 w-28 sm:h-34 sm:w-34 -rotate-[25deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-95 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[24%] translate-x-[16%] select-none z-0",
  },
  "Performance & SEO": {
    component: Lighthouse,
    className:
      "h-32 w-32 sm:h-38 sm:w-38 -rotate-[25deg] opacity-15 grayscale filter transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-115",
    wrapperClassName:
      "pointer-events-none absolute bottom-0 right-0 translate-y-[24%] translate-x-[16%] select-none z-0",
  },
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
            const bg = bgIcons[item.title];
            const BgComponent = bg?.component;
            const isAndroid = item.title === "Android apps";

            return (
              <BentoCell key={item.title} size={item.size}>
                {BgComponent && (
                  <div className={bg.wrapperClassName} aria-hidden="true">
                    {isAndroid ? (
                      <Android className={bg.className} interactiveWave />
                    ) : (
                      <BgComponent className={bg.className} />
                    )}
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">
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
