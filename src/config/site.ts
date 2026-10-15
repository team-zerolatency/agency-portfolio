export const siteConfig = {
  name: "YourAgency", // TODO: real company name
  tagline: "We design, build and ship web & mobile products.",
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
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
  ],
} as const;
