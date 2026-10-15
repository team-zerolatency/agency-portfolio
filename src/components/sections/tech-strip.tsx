import { techStack } from "@/config/tech";
import { Marquee } from "@/components/ui/marquee";
import { TechLogo } from "@/components/ui/tech-logo";

/**
 * h-24 = 96px = exactly 2 cells of the 48px hero grid, so the bottom border
 * lands on a grid line. If you change this height, keep it a multiple of 48px.
 */
export function TechStrip() {
  return (
    <div
      role="group"
      aria-label="Technologies we build with"
      className="flex h-24 items-center border-b border-border"
    >
      <Marquee duration={Math.max(30, Math.round(techStack.length * 1.6))} className="w-full">
        {techStack.map((t) => (
          <TechLogo key={t.name} tech={t} className="px-4" />
        ))}
      </Marquee>
    </div>
  );
}
