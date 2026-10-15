import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { SectionLabel } from "@/components/ui/section-label";
import { BentoCell, BentoGrid } from "@/components/ui/bento";

const placeholders = [
  { id: "work", label: "Work", index: 2 },
  { id: "process", label: "Process", index: 3 },
  { id: "contact", label: "Contact", index: 4 },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />

      {/* Phase 3 replaces this preview with the real services bento */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionLabel index={1} label="Services" />
        <h2 className="mt-3 font-display text-3xl font-semibold">Bento grid preview</h2>
        <BentoGrid className="mt-10">
          <BentoCell size="lg">Large (8 cols, 2 rows)</BentoCell>
          <BentoCell size="md">Medium</BentoCell>
          <BentoCell size="md">Medium</BentoCell>
          <BentoCell size="sm">Small</BentoCell>
          <BentoCell size="sm">Small</BentoCell>
          <BentoCell size="sm">Small</BentoCell>
          <BentoCell size="sm">Small</BentoCell>
        </BentoGrid>
      </section>

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
