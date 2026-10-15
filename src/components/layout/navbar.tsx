"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { ZeroLatencyLogo } from "@/components/ui/logo";

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
        "fixed inset-x-0 top-0 z-50 border-x-0 border-t border-b border-dashed border-border transition-all duration-200",
        scrolled || open ? "bg-[var(--surface)] shadow-sm backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:h-[68px] sm:px-6"
      >
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="group relative inline-flex items-center py-1 transition-transform duration-200 active:scale-95"
        >
          <ZeroLatencyLogo idPrefix="nav" className="h-8.5 w-auto select-none sm:h-9" />
        </Link>

        <ul className="hidden items-center gap-7 md:flex lg:gap-8">
          {siteConfig.nav.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-sm font-medium text-fg-muted transition hover:text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 sm:gap-3.5 md:flex">
          <ThemeToggle className="size-9" />
          <ButtonLink
            href={siteConfig.secondaryCta.href}
            variant="ghost"
            className="px-4 py-2 text-sm"
          >
            {siteConfig.secondaryCta.label}
          </ButtonLink>
          <ButtonLink href={siteConfig.cta.href} className="px-5 py-2 text-sm font-medium">
            {siteConfig.cta.label}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle className="size-9" />
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
