"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { teamConfig } from "@/config/team";
import { TeamIdBadge } from "@/components/team/team-id-badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

/** Parses and highlights **bold** keywords in the biography text */
function renderBioParagraph(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function TeamSection() {
  const { label, heading, description, members } = teamConfig;
  const [activeId, setActiveId] = useState<string>(members[0]?.id || "");
  const [direction, setDirection] = useState<number>(1);

  const activeIndex = members.findIndex((m) => m.id === activeId);
  const activeMember = members[activeIndex] || members[0];

  const handleSelectMember = (id: string) => {
    const newIndex = members.findIndex((m) => m.id === id);
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveId(id);
  };

  return (
    <section id="team" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeader index={7} label={label} heading={heading} description={description} />

      <Reveal className="mt-10">
        {/* Mobile Tab Selector (Visible on small screens) */}
        <div className="flex gap-2 overflow-x-auto pb-4 md:hidden">
          {members.map((m) => {
            const isActive = m.id === activeMember.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMember(m.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs transition-colors",
                  isActive
                    ? "border-accent/50 bg-accent/15 text-accent shadow-sm"
                    : "bg-surface border-border text-fg-muted hover:text-fg",
                )}
              >
                <span>{m.index}</span>
                <span>{m.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Deck with Smooth Slide Animation & Matching Website Colors */}
        <div className="relative min-h-[640px] w-full overflow-hidden rounded-3xl border border-border shadow-2xl glass md:flex md:h-[650px]">
          {/* Collapsed tab rails on the LEFT of the active member */}
          <div className="hidden md:flex">
            {members.slice(0, activeIndex).map((member) => (
              <button
                key={member.id}
                onClick={() => handleSelectMember(member.id)}
                className="group bg-surface/30 hover:bg-surface/80 relative flex w-16 shrink-0 flex-col items-center justify-between border-r border-border py-8 transition-all duration-300"
                title={`View ${member.name} - ${member.tabTitle}`}
              >
                <span className="font-mono text-xs font-semibold text-fg-muted transition-colors group-hover:text-accent">
                  {member.index}
                </span>
                <span className="rotate-180 font-mono text-xs tracking-widest text-fg-muted uppercase transition-colors [writing-mode:vertical-rl] group-hover:text-fg">
                  {member.tabTitle}
                </span>
                <span className="size-1.5 rounded-full bg-border transition-colors group-hover:bg-accent" />
              </button>
            ))}
          </div>

          {/* Active Card with Smooth Sliding Transition between members */}
          <div className="relative flex flex-1 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: direction * 32, scale: 0.99 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -direction * 32, scale: 0.99 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full w-full flex-col justify-between"
              >
                <div className="grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                  {/* Left Column: Member details, Bio, Tags, and Action CTAs */}
                  <div className="flex h-full flex-col justify-between py-1 lg:col-span-7">
                    <div>
                      {/* Category tag */}
                      <p className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                        {activeMember.category}
                      </p>

                      {/* Large Bold Name */}
                      <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
                        {activeMember.name}
                      </h3>

                      {/* Bio Paragraphs with highlighted keywords */}
                      <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                        {activeMember.bio.map((paragraph, idx) => (
                          <p key={idx}>{renderBioParagraph(paragraph)}</p>
                        ))}
                      </div>

                      {/* Credential Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeMember.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-surface rounded-md border border-border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-fg-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons with Website Theme Colors */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        href={activeMember.primaryCta.href}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 font-medium text-white shadow-lg shadow-accent/25 transition-all hover:opacity-95 active:scale-95"
                      >
                        <span>{activeMember.primaryCta.label}</span>
                        <ArrowUpRight className="size-4" />
                      </Link>
                      <Link
                        href={activeMember.secondaryCta.href}
                        target={activeMember.secondaryCta.isExternal ? "_blank" : undefined}
                        rel={
                          activeMember.secondaryCta.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-medium text-fg glass transition-all hover:border-accent/40 active:scale-95"
                      >
                        <span>{activeMember.secondaryCta.label}</span>
                        <ArrowUpRight className="size-4 text-fg-muted" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Cyber ID Badge Card with Lanyard */}
                  <div className="flex h-full items-center justify-center lg:col-span-5">
                    <TeamIdBadge member={activeMember} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Collapsed tab rails on the RIGHT of the active member */}
          <div className="hidden md:flex">
            {members.slice(activeIndex + 1).map((member) => (
              <button
                key={member.id}
                onClick={() => handleSelectMember(member.id)}
                className="group bg-surface/30 hover:bg-surface/80 relative flex w-16 shrink-0 flex-col items-center justify-between border-l border-border py-8 transition-all duration-300"
                title={`View ${member.name} - ${member.tabTitle}`}
              >
                <span className="font-mono text-xs font-semibold text-fg-muted transition-colors group-hover:text-accent">
                  {member.index}
                </span>
                <span className="rotate-180 font-mono text-xs tracking-widest text-fg-muted uppercase transition-colors [writing-mode:vertical-rl] group-hover:text-fg">
                  {member.tabTitle}
                </span>
                <span className="size-1.5 rounded-full bg-border transition-colors group-hover:bg-accent" />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
