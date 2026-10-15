import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { teamConfig } from "@/config/team";
import { TeamIdBadge } from "@/components/team/team-id-badge";

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamConfig.members.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamConfig.members.find((m) => m.slug === slug);

  if (!member) {
    return { title: "Team Member Not Found" };
  }

  return {
    title: `${member.name} — ${member.role} | ZeroLatency`,
    description: member.resume.headline,
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;
  const member = teamConfig.members.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const { resume } = member;

  return (
    <div className="relative min-h-screen pt-28 pb-24">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute top-[600px] right-10 h-[400px] w-[500px] rounded-full bg-accent-2/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/#team"
            className="group bg-surface/60 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 font-mono text-xs font-medium text-fg-muted backdrop-blur-md transition-all hover:border-accent/50 hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Team & Overview</span>
          </Link>
        </div>

        {/* Hero Dossier Header */}
        <section className="relative overflow-hidden rounded-3xl border border-border p-6 shadow-2xl glass sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Bio, verification, and CTAs */}
            <div className="lg:col-span-7">
              {/* Clearance / Category Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-accent uppercase">
                  <ShieldCheck className="size-3.5" />
                  <span>{`${member.badgeType} // ${member.id}`}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span>{resume.availability}</span>
                </span>
              </div>

              {/* Name & Official Title */}
              <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-5xl">
                {member.name}
              </h1>
              <p className="mt-2 font-mono text-sm tracking-wider text-accent uppercase">
                {member.role}
              </p>

              {/* Headline */}
              <p className="mt-5 text-base leading-relaxed font-normal text-fg-muted sm:text-lg">
                {resume.headline}
              </p>

              {/* Meta Chips: Location, Experience, Subroles */}
              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-fg-muted">
                <div className="bg-surface flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5">
                  <MapPin className="size-3.5 text-accent" />
                  <span>{resume.location}</span>
                </div>
                <div className="bg-surface flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5">
                  <Clock className="size-3.5 text-accent" />
                  <span>{resume.experienceYears}+ Years Experience</span>
                </div>
                <div className="bg-surface flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5">
                  <Globe className="size-3.5 text-accent" />
                  <span>ZeroLatency Core Team</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={member.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 transition-all hover:opacity-95 active:scale-95"
                >
                  <Calendar className="size-4" />
                  <span>Book Consultation with {member.name.split(" ")[0]}</span>
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-fg glass transition-all hover:border-accent/40 active:scale-95"
                >
                  <Mail className="size-4 text-fg-muted" />
                  <span>Inquire with Agency</span>
                </Link>
              </div>
            </div>

            {/* Right: Hanging ID Badge */}
            <div className="flex items-center justify-center lg:col-span-5">
              <TeamIdBadge member={member} />
            </div>
          </div>
        </section>

        {/* Impact Metrics Bento */}
        <section className="mt-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {resume.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border p-6 glass transition-all hover:border-accent/40"
              >
                <div className="bg-gradient-to-br from-fg to-accent-2 bg-clip-text font-display text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-2 font-mono text-xs tracking-wider text-fg-muted uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Summary */}
        <section className="mt-12 rounded-3xl border border-border p-8 glass sm:p-10">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <Sparkles className="size-4" />
            <span>Executive Dossier & Philosophy</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
            About {member.name}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            {resume.summary}
          </p>
        </section>

        {/* Core Competencies & Skills */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
            Technical Competencies & Systems Expertise
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {resume.competencies.map((comp, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border p-6 glass transition-all hover:border-accent/30"
              >
                <h3 className="font-mono text-sm font-semibold tracking-wider text-accent uppercase">
                  {comp.category}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {comp.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 text-sm text-fg-muted">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent/80" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Career Experience & Notable Impact */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-fg">
            Professional Track Record & Delivered Systems
          </h2>
          <div className="mt-6 space-y-6">
            {resume.experience.map((exp, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border p-6 glass transition-all hover:border-accent/40 sm:p-8"
              >
                <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-fg">{exp.role}</h3>
                    <p className="font-mono text-sm text-accent">{exp.organization}</p>
                  </div>
                  <span className="bg-surface w-fit rounded-md border border-border px-3 py-1 font-mono text-xs tracking-wider text-fg-muted">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-fg-muted">{exp.description}</p>

                <div className="mt-4 space-y-2">
                  <p className="font-mono text-xs font-semibold tracking-wider text-fg uppercase">
                    Key Outcomes & Architecture Deliverables:
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-sm text-fg-muted">
                        <span className="font-mono font-bold text-accent">›</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Education */}
          <div className="rounded-2xl border border-border p-6 glass sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
              <GraduationCap className="size-4" />
              <span>Education</span>
            </div>
            <div className="mt-4 space-y-4">
              {resume.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-display text-lg font-bold text-fg">{edu.degree}</h3>
                  <p className="text-sm text-accent">{edu.institution}</p>
                  <p className="mt-1 font-mono text-xs text-fg-muted">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-2xl border border-border p-6 glass sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
              <ShieldCheck className="size-4" />
              <span>Verified Certifications</span>
            </div>
            <ul className="mt-4 space-y-3">
              {resume.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm font-medium text-fg">
                  <div className="size-1.5 rounded-full bg-accent" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final Consultation Booking Banner */}
        <section className="from-surface mt-16 overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br to-accent/10 p-8 text-center shadow-2xl sm:p-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-fg sm:text-4xl">
            Schedule an Architecture Sprint with {member.name.split(" ")[0]}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-fg-muted sm:text-base">
            Directly reserve a 30-minute discovery call or full technical architecture consultation.
            Open slots are synchronized in real-time via Google Meet.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={member.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 text-base font-medium text-white shadow-xl shadow-accent/30 transition-all hover:opacity-95 active:scale-95"
            >
              <Calendar className="size-5" />
              <span>Open Calendar & Book Call</span>
              <ArrowUpRight className="size-5" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-fg glass transition-all hover:border-accent/40 active:scale-95"
            >
              <Mail className="size-5 text-fg-muted" />
              <span>Contact ZeroLatency</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
