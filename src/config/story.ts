import type { Heading } from "@/config/sections";

/* ---------- Process ---------- */
export interface ProcessStep {
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const processConfig: {
  label: string;
  heading: Heading;
  description: string;
  steps: ProcessStep[];
} = {
  label: "How We Work",
  heading: { lead: "A clear path from", accent: "idea to launch" },
  description: "Five steps, weekly demos, and no surprises on the invoice.",
  steps: [
    {
      title: "Discover",
      duration: "1 week",
      description:
        "We learn your goals, users and constraints, then agree on scope, timeline and a fixed estimate.",
      deliverables: ["Scope document", "Timeline", "Fixed estimate"],
    },
    {
      title: "Design",
      duration: "1 to 2 weeks",
      description:
        "Wireframes and a clickable prototype so you can react to the product before we build it.",
      deliverables: ["Wireframes", "UI kit", "Clickable prototype"],
    },
    {
      title: "Build",
      duration: "2 to 4 weeks",
      description:
        "Full-stack development in weekly sprints, with a working demo at the end of every week.",
      deliverables: ["Web / Android app", "API", "Weekly demos"],
    },
    {
      title: "Launch",
      duration: "1 week",
      description:
        "Testing, deployment, store submission and monitoring, so launch day is uneventful.",
      deliverables: ["QA report", "Production deploy", "Monitoring"],
    },
    {
      title: "Support",
      duration: "Ongoing",
      description: "Bug fixes, updates and new features after launch, with a team you can reach.",
      deliverables: ["Maintenance plan", "Priority support"],
    },
  ],
};

/* ---------- Delivery speed ---------- */
export interface SpeedRow {
  label: string;
  days: number;
  highlight?: boolean;
  phases: { name: string; days: number }[];
}

export const speedConfig: {
  label: string;
  heading: Heading;
  description: string;
  chart: { title: string; caption: string };
  rows: SpeedRow[];
  note: { title: string; text: string };
} = {
  label: "Delivery Speed",
  heading: { lead: "From idea to launch in", accent: "weeks, not months" },
  description: "Small team, no handoffs, no waiting on approvals from five departments.",
  chart: {
    title: "Time to launch an MVP",
    caption: "Dummy data. Replace with your real timelines.",
  },
  rows: [
    {
      label: "Typical agency",
      days: 90,
      phases: [
        { name: "Discovery", days: 15 },
        { name: "Design", days: 25 },
        { name: "Build", days: 40 },
        { name: "QA & launch", days: 10 },
      ],
    },
    {
      label: "With us",
      days: 28,
      highlight: true,
      phases: [
        { name: "Discovery", days: 3 },
        { name: "Design", days: 5 },
        { name: "Build", days: 16 },
        { name: "QA & launch", days: 4 },
      ],
    },
  ],
  note: {
    title: "Weekly demos",
    text: "You see working software every week, so there are no surprises at the end.",
  },
};
