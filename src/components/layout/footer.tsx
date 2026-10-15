import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ZeroLatencyLogo } from "@/components/ui/logo";
import { TerminalRain } from "@/components/ui/terminal-rain";

function GithubIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.55a1.64 1.64 0 0 0-1.66 1.64 1.64 1.64 0 0 0 1.66 1.64 1.64 1.64 0 0 0 1.65-1.64 1.64 1.64 0 0 0-1.65-1.64" />
    </svg>
  );
}

function XIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsappIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: XIcon,
  WhatsApp: WhatsappIcon,
};

export function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-border bg-bg">
      {/* Background terminal rain effect: multiple soft blurred blue falling dotted lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft atmospheric ambient glow from top */}
        <div className="absolute -top-28 left-1/2 h-44 w-full max-w-4xl -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        {/* Hacker terminal falling dotted blue streams: soft, blurred, ambient */}
        <TerminalRain
          className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_85%,transparent)]"
          columnSpacing={30}
        />

        {/* Continuing the two outer vertical frame lines from the top of the page */}
        <div className="absolute top-0 bottom-0 left-1/2 w-full max-w-[1360px] -translate-x-1/2 border-x border-dashed border-border" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Columns Grid: 4 equal columns with symmetrical spacing */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Logo + Tagline + Social Icons */}
          <div>
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="group relative inline-flex items-center py-1 transition-transform duration-200 active:scale-95"
            >
              <ZeroLatencyLogo idPrefix="footer-brand" className="h-9 w-auto select-none sm:h-10" />
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              {siteConfig.tagline}
            </p>

            <ul className="mt-5 flex items-center gap-2">
              {siteConfig.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="hover:bg-surface inline-flex size-8 items-center justify-center rounded-md text-fg-muted transition hover:text-fg"
                    >
                      {Icon ? (
                        <Icon className="size-4.5" />
                      ) : (
                        <span className="text-sm">{s.label}</span>
                      )}
                      <span className="sr-only">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation Columns (Services, Company, Legal) with exact typography */}
          {siteConfig.footer.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-fg">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-fg-muted transition hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Horizontal Divider Line above copyright */}
        <div className="border-t border-border">
          <div className="flex flex-col gap-4 py-5 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <span className="cursor-pointer transition hover:text-fg">Cookie preferences</span>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1 transition hover:text-fg"
              >
                <span>Privacy Policy</span>
                <span aria-hidden="true" className="text-[10px]">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
