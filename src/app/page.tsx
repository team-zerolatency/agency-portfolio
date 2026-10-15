import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Services } from "@/components/sections/services";
import { Impact } from "@/components/sections/impact";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Speed } from "@/components/sections/speed";
import { GlobeSection } from "@/components/sections/globe-section";
import { ContactSection } from "@/components/sections/contact-section";

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
      <ContactSection />
    </>
  );
}
