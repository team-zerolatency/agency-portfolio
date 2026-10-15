export const siteConfig = {
  name: "ZeroLatency",
  tagline: "We design, build and ship web & mobile products.",

  copyrightYear: 2026,
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Start a project", href: "#contact" },
  secondaryCta: { label: "Case studies", href: "#work" },
  footer: [
    {
      title: "Services",
      links: [
        { label: "Web apps (MERN)", href: "#services" },
        { label: "Android apps", href: "#services" },
        { label: "Full-stack builds", href: "#services" },
        { label: "Deployment & DevOps", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Team", href: "#team" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "#contact" },
      ],
    },

    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "WhatsApp", href: "https://wa.me/" },
  ],
} as const;
