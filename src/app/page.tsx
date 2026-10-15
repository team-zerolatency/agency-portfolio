import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Impact } from "@/components/sections/impact";
import { CaseStudies } from "@/components/sections/case-studies";
import { SectionLabel } from "@/components/ui/section-label";

// Phase 4 replaces Process; a later phase replaces Contact.
const placeholders = [
  { id: "process", label: "Process", index: 4 },
  { id: "contact", label: "Contact", index: 5 },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Impact />
      <CaseStudies />

      {placeholders.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
        >
          <SectionLabel index={s.index} label={s.label} />
          <h2 className="font-display text-3xl font-semibold">{s.label}</h2>
        </section>
      ))}
    </>
  );
}
