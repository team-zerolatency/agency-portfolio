import { Hero } from "@/components/sections/hero";
import { ProjectsBand } from "@/components/sections/projects-band";
import { Services } from "@/components/sections/services";
import { Impact } from "@/components/sections/impact";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Speed } from "@/components/sections/speed";
import { GlobeSection } from "@/components/sections/globe-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 bottom-0 left-1/2 w-full max-w-[1360px] -translate-x-1/2 border-x border-t border-dashed border-border" />
      </div>

      <div className="relative z-10">
        <div className="w-full border-b border-border">
          <Hero />
        </div>
        <div className="w-full border-b border-border">
          <ProjectsBand />
        </div>
        <div className="w-full border-b border-border">
          <Services />
        </div>
        <div className="w-full border-b border-border">
          <Impact />
        </div>
        <div className="w-full border-b border-border">
          <CaseStudies />
        </div>
        <div className="w-full border-b border-border">
          <Process />
        </div>
        <div className="w-full border-b border-border">
          <Speed />
        </div>
        <div className="w-full border-b border-border">
          <GlobeSection />
        </div>
        <div className="w-full border-b border-border">
          <TeamSection />
        </div>
        <div className="w-full border-b border-border">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
