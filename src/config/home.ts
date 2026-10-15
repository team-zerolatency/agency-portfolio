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
    strip: string[];
    stats: Stat[];
  };
  testimonials: Testimonial[];
  clients: { heading: string; names: string[] };
} = {
  hero: {
    eyebrow: "Web & mobile product studio",
    headline: { lead: "We build digital products that", accent: "ship fast." },
    description:
      "Full-stack websites and Android apps, from first sketch to production. One small team, end to end.",
    strip: [
      "Websites",
      "MERN stack",
      "Android apps",
      "Kotlin",
      "Next.js",
      "APIs",
      "DevOps",
      "UI/UX",
    ],
    stats: [
      { label: "Projects shipped", value: 120, suffix: "+" },
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
  clients: {
    heading: "Trusted by 100+ teams",
    names: [
      "Acme Labs",
      "Northwind",
      "Globex",
      "Initech",
      "Umbrella Co",
      "Hooli",
      "Stark Works",
      "Wayne Tech",
      "Soylent",
      "Vandelay",
    ],
  },
};
