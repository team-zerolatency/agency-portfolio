import { homeConfig } from "@/config/home";
import { Marquee } from "@/components/ui/marquee";

export function Clients() {
  const { heading, names } = homeConfig.clients;

  return (
    <section aria-labelledby="clients-heading" className="border-b border-border py-12">
      <h2
        id="clients-heading"
        className="text-center font-mono text-xs tracking-[0.2em] text-fg-muted uppercase"
      >
        {heading}
      </h2>
      <Marquee className="mt-8" duration={45}>
        {names.map((name) => (
          <span
            key={name}
            className="font-display text-xl font-semibold whitespace-nowrap text-fg-muted/70"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
