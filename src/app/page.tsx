import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Impact } from "@/components/sections/impact";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Speed } from "@/components/sections/speed";
import { GlobeSection } from "@/components/sections/globe-section";
import { SectionLabel } from "@/components/ui/section-label";

// A later phase replaces Contact with the real section.
export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Services />
      <Impact />
      <CaseStudies />
      <Process />
      <Speed />
      <GlobeSection />

      <section
        id="contact"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
      >
        <SectionLabel index={7} label="Contact" />
        <h2 className="font-display text-3xl font-semibold">Contact</h2>
      </section>
    </>
  );
}
