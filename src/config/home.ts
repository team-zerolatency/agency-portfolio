import { facts } from "./fact";

export interface ProjectItem {
  name: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export const homeConfig: {
  hero: {
    eyebrow: string;
    headline: { lead: string; accent: string };
    description: string;
    stats: Stat[];
  };
  testimonials: Testimonial[];
  projects: { heading: string; total: number; label: string; items: ProjectItem[] };
} = {
  hero: {
    eyebrow: "Web & mobile product studio",
    headline: { lead: "We build digital products that", accent: "ship fast." },
    description:
      "Full-stack websites and Android apps, from first sketch to production. One small team, end to end.",
    stats: [
      { label: "Projects shipped", value: facts.projectsShipped, suffix: "+" },
      { label: "Happy clients", value: 60, suffix: "+" },
      { label: "Countries served", value: 12 },
    ],
  },
  testimonials: [
    {
      quote:
        "They turned a rough idea into a polished product in weeks, and communication was excellent.",
      name: "Alex Morgan",
      role: "Founder",
      company: "Acme Labs",
    },
    {
      quote: "Our Android app launched on time and the backend has not gone down once.",
      name: "Priya Sharma",
      role: "Product Lead",
      company: "Northwind",
    },
    {
      quote: "Clean code, clear estimates and no surprises. Exactly what we needed from a partner.",
      name: "Jordan Lee",
      role: "CTO",
      company: "Globex",
    },
    {
      quote: "The new website doubled our demo requests within the first month.",
      name: "Sam Rivera",
      role: "Head of Growth",
      company: "Initech",
    },
    {
      quote: "Fast, honest and genuinely good at full-stack work. We keep coming back.",
      name: "Taylor Kim",
      role: "Operations Director",
      company: "Umbrella Co",
    },
  ],
  projects: {
    heading: "Projects delivered",
    total: facts.projectsShipped,
    label: "projects shipped and counting",
    items: [
      { name: "Fleet Tracker", category: "Android" },
      { name: "PayDash", category: "Web app" },
      { name: "ShopSphere", category: "E-commerce" },
      { name: "LearnLoop", category: "EdTech" },
      { name: "HealthBridge", category: "Health" },
      { name: "RentEasy", category: "Real estate" },
      { name: "QuickBite", category: "Food delivery" },
      { name: "StaffSync", category: "HR tool" },
      { name: "TripNest", category: "Travel" },
      { name: "InvoiceFlow", category: "SaaS" },
    ],
  },
};
