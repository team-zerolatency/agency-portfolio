import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudiesConfig } from "@/config/sections";
import { BentoCell, BentoGrid } from "@/components/ui/bento";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

export function CaseStudies() {
  const { label, heading, description, items } = caseStudiesConfig;

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader index={3} label={label} heading={heading} description={description} />

      <Reveal className="mt-12">
        <BentoGrid>
          {items.map((item, i) => (
            <BentoCell key={item.slug} size={item.size} className="p-0">
              <div className="flex h-full flex-col">
                {/* Thumbnail placeholder: replace with an <Image fill className="object-cover" /> later */}
                <div
                  aria-hidden
                  className={cn(
                    "relative border-b border-border bg-gradient-to-br from-accent/25 via-accent-2/10 to-transparent",
                    item.size === "lg" ? "min-h-48 flex-1" : "h-32",
                  )}
                >
                  <span className="absolute right-5 bottom-3 font-display text-6xl font-semibold text-fg/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-6">
                  <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{item.description}</p>

                  <p className="mt-4 text-sm">
                    <span className="font-display text-2xl font-semibold">{item.result.value}</span>{" "}
                    <span className="text-fg-muted">{item.result.label}</span>
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={item.href}
                    aria-label={`View case study: ${item.title}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    View case study
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </BentoCell>
          ))}
        </BentoGrid>
      </Reveal>
    </section>
  );
}
