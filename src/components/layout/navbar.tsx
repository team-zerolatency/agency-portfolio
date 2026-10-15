"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-scrolled={scrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        scrolled || open ? "border-x-0 border-t-0 glass" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="group relative inline-flex items-center py-1 transition-transform duration-200 active:scale-95"
        >
          {/* Hand-rubbed paint swipe splash logo */}
          <svg
            viewBox="0 0 205 38"
            className="h-9 w-auto select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Soft bright gradient for Zero */}
              <linearGradient id="zero-soft-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              {/* Vibrant deep electric blue specifically for Latency */}
              <linearGradient id="latency-deep-blue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="45%" stopColor="#2b8cff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Hand-rubbed paint smear gradient extending across both Zero and Latency */}
              <linearGradient
                id="paint-smear-grad"
                x1="0"
                y1="18"
                x2="200"
                y2="18"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#2b8cff" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#2b8cff" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#2563eb" stopOpacity="0.6" />
                <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>

              {/* Secondary paint dry-brush gradient */}
              <linearGradient id="paint-streak-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2b8cff" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2b8cff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Hand-rubbed painting brush swipe - lower opacity, extended across Zero & Latency, NO dots */}
            <g className="opacity-45 transition-opacity duration-300 group-hover:opacity-70">
              {/* Primary broad hand swipe starting right at the beginning of Zero */}
              <path
                d="M2 24 C 25 21, 65 25, 110 21 C 145 18, 175 22, 202 18 C 182 26, 138 27, 95 28 C 55 30, 20 28, 2 24 Z"
                fill="url(#paint-smear-grad)"
              />
              {/* Upper trailing dry-brush stroke across Zero and Latency */}
              <path
                d="M8 16 C 45 14, 90 17, 138 13 C 165 11, 186 14, 200 11 C 178 16, 140 18, 102 19 C 65 20, 32 18, 8 16 Z"
                fill="url(#paint-streak-grad)"
              />
              {/* Trailing flick */}
              <path
                d="M125 14 C 150 12, 178 15, 202 12 C 185 17, 155 16, 125 14 Z"
                fill="#38bdf8"
                fillOpacity="0.4"
              />
            </g>

            {/* Bold italic ZeroLatency wordmark */}
            <text
              x="6"
              y="26"
              style={{
                fontFamily: "var(--font-space), var(--font-inter), sans-serif",
                fontSize: "23px",
                fontStyle: "italic",
                fontWeight: "900",
                letterSpacing: "-0.04em",
              }}
            >
              <tspan
                fill="url(#zero-soft-grad)"
                className="transition-colors group-hover:fill-white"
              >
                Zero
              </tspan>
              <tspan fill="url(#latency-deep-blue)" className="font-black">
                Latency
              </tspan>
            </text>
          </svg>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="text-sm text-fg-muted transition hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <ButtonLink href={siteConfig.secondaryCta.href} variant="ghost">
            {siteConfig.secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={siteConfig.cta.href}>{siteConfig.cta.label}</ButtonLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-full glass"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border px-4 pt-4 pb-6 md:hidden"
      >
        <ul className="flex flex-col gap-4">
          {siteConfig.nav.map((l) => (
            <li key={l.label}>
              <Link href={l.href} onClick={() => setOpen(false)} className="text-base">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink
          href={siteConfig.cta.href}
          className="mt-6 w-full"
          onClick={() => setOpen(false)}
        >
          {siteConfig.cta.label}
        </ButtonLink>
      </div>
    </motion.header>
  );
}
