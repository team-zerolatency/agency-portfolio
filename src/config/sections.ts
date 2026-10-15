import type { BentoSize } from "@/components/ui/bento";

export interface Heading {
  lead: string;
  accent: string;
}

/* ---------- Services ---------- */
export type ServiceIcon =
  "globe" | "smartphone" | "server" | "palette" | "rocket" | "lifebuoy" | "gauge";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  size: BentoSize;
  tags?: string[];
}

export const servicesConfig: {
  label: string;
  heading: Heading;
  description: string;
  items: Service[];
} = {
  label: "Services",
  heading: { lead: "Everything you need to", accent: "ship a product" },
  description:
    "Design, build, deploy and maintain, handled by one team so nothing gets lost between handoffs.",
  items: [
    {
      title: "Full-stack web apps",
      description:
        "Fast, scalable websites and web apps built on the MERN stack and Next.js, from the database to the pixel.",
      icon: "globe",
      size: "lg",
      tags: ["MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript"],
    },
    {
      title: "Android apps",
      description: "Native Android apps written in Kotlin and Java, published to the Play Store.",
      icon: "smartphone",
      size: "md",
      tags: ["Kotlin", "Java", "Jetpack Compose"],
    },
    {
      title: "APIs & backends",
      description: "Secure REST and GraphQL APIs, auth, payments and integrations.",
      icon: "server",
      size: "md",
      tags: ["REST", "GraphQL", "Auth"],
    },
    {
      title: "UI/UX design",
      description: "Clean interfaces and design systems that convert.",
      icon: "palette",
      size: "sm",
    },
    {
      title: "Deployment & DevOps",
      description: "CI/CD, hosting and monitoring set up properly.",
      icon: "rocket",
      size: "sm",
    },
    {
      title: "Maintenance & support",
      description: "Updates, fixes and a team you can reach.",
      icon: "lifebuoy",
      size: "sm",
    },
    {
      title: "Performance & SEO",
      description: "Core Web Vitals, accessibility and search visibility.",
      icon: "gauge",
      size: "sm",
    },
  ],
};

/* ---------- Impact ---------- */
export interface Counter {
  label: string;
  value: number;
  suffix?: string;
  size: BentoSize;
}

export const impactConfig: {
  label: string;
  heading: Heading;
  description: string;
  chart: { title: string; caption: string; data: { label: string; value: number }[] };
  counters: Counter[];
  stack: { title: string; items: string[] };
} = {
  label: "Proven Impact",
  heading: { lead: "Numbers that", accent: "speak for themselves" },
  description: "A small team with a steady track record of shipping on time.",
  chart: {
    title: "Projects shipped per year",
    caption: "Dummy data. Replace with your real numbers.",
    data: [
      { label: "2021", value: 6 },
      { label: "2022", value: 10 },
      { label: "2023", value: 16 },
      { label: "2024", value: 24 },
      { label: "2025", value: 34 },
      { label: "2026", value: 30 },
    ],
  },
  counters: [
    { label: "Projects shipped", value: 120, suffix: "+", size: "md" },
    { label: "Client retention", value: 98, suffix: "%", size: "md" },
    { label: "Countries served", value: 12, size: "sm" },
    { label: "Days to first prototype", value: 7, size: "sm" },
  ],
  stack: {
    title: "Our stack",
    items: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Next.js",
      "TypeScript",
      "Kotlin",
      "Java",
      "Tailwind",
      "Three.js",
      "Docker",
      "AWS",
    ],
  },
};

/* ---------- Case studies ---------- */
export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  description: string;
  result: { value: string; label: string };
  tags: string[];
  size: BentoSize;
  href: string;
}

export const caseStudiesConfig: {
  label: string;
  heading: Heading;
  description: string;
  items: CaseStudy[];
} = {
  label: "Selected Work",
  heading: { lead: "Products we're", accent: "proud of" },
  description: "A few recent builds. Replace with your real projects.",
  items: [
    {
      slug: "fintech-dashboard",
      title: "Fintech analytics dashboard",
      category: "Web app",
      description:
        "A real-time reporting dashboard for a payments startup, with role-based access and exportable reports.",
      result: { value: "3×", label: "faster reporting" },
      tags: ["React", "Node.js", "MongoDB"],
      size: "lg",
      href: "#contact",
    },
    {
      slug: "fleet-tracking",
      title: "Fleet tracking app",
      category: "Android",
      description: "Live vehicle tracking and driver check-ins for a logistics company.",
      result: { value: "50K+", label: "downloads in 6 months" },
      tags: ["Kotlin", "Firebase", "Maps"],
      size: "md",
      href: "#contact",
    },
    {
      slug: "marketplace-storefront",
      title: "Marketplace storefront",
      category: "E-commerce",
      description: "A fast, SEO-friendly storefront with a streamlined checkout.",
      result: { value: "+38%", label: "checkout conversion" },
      tags: ["Next.js", "Stripe", "Tailwind"],
      size: "md",
      href: "#contact",
    },
  ],
};
