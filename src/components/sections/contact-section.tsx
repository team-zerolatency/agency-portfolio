import { Clock, Mail, MapPin, type LucideIcon } from "lucide-react";
import { contactConfig, type ChannelIcon } from "@/config/contact";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "./contact-form";

const icons: Record<ChannelIcon, LucideIcon> = { mail: Mail, clock: Clock, pin: MapPin };

export function ContactSection() {
  const { label, heading, description, channels, lead } = contactConfig;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={7} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          <BentoCell size="lg" className="p-8">
            <ContactForm />
          </BentoCell>

          <BentoCell size="md">
            <h3 className="font-display text-xl font-semibold">Reach us directly</h3>
            <ul className="mt-5 space-y-4">
              {channels.map((c) => {
                const Icon = icons[c.icon];
                return (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs text-fg-muted">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-sm font-medium hover:text-accent">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{c.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </BentoCell>

          {/* ID-card style team lead, modeled on the reference site's founder card */}
          <BentoCell
            size="md"
            className="bg-gradient-to-br from-accent/15 via-transparent to-transparent"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em] text-fg-muted uppercase">
                <span>Team lead</span>
                <span>{lead.id}</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-b from-accent-2 to-accent font-display text-lg font-semibold text-white"
                >
                  {lead.initials}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{lead.name}</p>
                  <p className="text-sm text-fg-muted">{lead.role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-fg-muted">{lead.bio}</p>
            </div>
          </BentoCell>
        </BentoGrid>
      </Reveal>
    </section>
  );
}
