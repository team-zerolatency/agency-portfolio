import type { Heading } from "@/config/sections";

export interface TeamResume {
  headline: string;
  location: string;
  experienceYears: number;
  availability: string;
  summary: string;
  metrics: { value: string; label: string }[];
  competencies: { category: string; skills: string[] }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    description: string;
    achievements: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications: string[];
}

export interface TeamMember {
  id: string;
  index: string;
  slug: string;
  tabTitle: string;
  category: string;
  name: string;
  role: string;
  badgeType: string;
  subroles: string;
  photo: string;
  meetingUrl: string;
  bio: string[];
  tags: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; isExternal?: boolean };
  resume: TeamResume;
}

export const teamConfig: {
  label: string;
  heading: Heading;
  description: string;
  members: TeamMember[];
} = {
  label: "Core Team",
  heading: { lead: "Minds driving the", accent: "ecosystem forward" },
  description:
    "Founders, systems engineers, and product designers with a proven track record of shipping zero-latency architectures and enterprise-grade products.",
  members: [
    {
      id: "ZL-001",
      index: "01",
      slug: "david-chen",
      tabTitle: "The Founder",
      category: "01 / FOUNDER & PRINCIPAL ARCHITECT",
      name: "David Chen",
      role: "FOUNDER & CHIEF ARCHITECT",
      badgeType: "FOUNDER",
      subroles: "DISTRIBUTED SYSTEMS / AI / FULL-STACK",
      photo: "/images/team/lead.jpg",
      meetingUrl: "https://zcal.co/zerolatency/david-chen",
      bio: [
        "David is the **Founder and Chief Architect at ZeroLatency**, with over a decade of experience designing and shipping mission-critical systems for high-growth tech startups.",
        "Previously serving as a **Principal Infrastructure Engineer**, he spearheaded real-time distributed pipelines handling **over 1.2 billion events daily** with sub-5ms p99 latency.",
        "Today, David leads product engineering and technical strategy, advising visionary founders on **scalable cloud foundations, AI pipelines, and zero-latency web applications**.",
      ],
      tags: ["CLOUD ARCHITECT", "SYSTEMS DESIGN", "ENTERPRISE SCALING"],
      primaryCta: { label: "Learn more", href: "/team/david-chen" },
      secondaryCta: {
        label: "Book a meeting",
        href: "https://zcal.co/zerolatency/david-chen",
        isExternal: true,
      },
      resume: {
        headline:
          "Principal Systems Architect & Founder specializing in sub-10ms distributed systems",
        location: "San Francisco, CA / Remote",
        experienceYears: 12,
        availability: "Available for Q4 Advisory & Architecture Sprints",
        summary:
          "David has spent the last 12 years building and scaling mission-critical distributed architectures. From bootstrapping high-frequency ingestion backends to leading technical teams across Series A through IPO ventures, David specializes in turning complex latency bottlenecks into competitive advantages.",
        metrics: [
          { value: "1.2B+", label: "Daily Ingestion Events" },
          { value: "4.2ms", label: "Global P99 Latency" },
          { value: "99.999%", label: "System Uptime Record" },
          { value: "$45M+", label: "Client Value Unlocked" },
        ],
        competencies: [
          {
            category: "Core Architecture",
            skills: [
              "Distributed Systems",
              "Low-Latency Event Streaming",
              "Multi-Region Replication",
              "Microservices Decomposition",
              "Consensus Protocols (Raft, Paxos)",
            ],
          },
          {
            category: "Cloud & Infrastructure",
            skills: [
              "Kubernetes / EKS",
              "Cloudflare Workers & Edge Compute",
              "Terraform & IaC",
              "Kafka & Redpanda",
              "CockroachDB & Redis",
            ],
          },
          {
            category: "Languages & Frameworks",
            skills: ["Go", "Rust", "TypeScript", "Next.js", "Python / C++"],
          },
        ],
        experience: [
          {
            role: "Founder & Chief Architect",
            organization: "ZeroLatency",
            period: "2023 — Present",
            description:
              "Founded ZeroLatency to deliver high-velocity architectural consulting, ultra-fast web platforms, and edge-native backends for venture-backed startups and enterprises.",
            achievements: [
              "Architected custom WebGL 3D globe and edge-cached state pipelines achieving sub-16ms frame times across 500k monthly visitors.",
              "Designed unified multi-tenant authentication and billing gateways for Series B fintech unicorns with zero downtime migration.",
              "Personally advised 18+ CTOs on transition from legacy monoliths to event-driven architectures.",
            ],
          },
          {
            role: "Principal Infrastructure Architect",
            organization: "Veloce Technologies",
            period: "2019 — 2023",
            description:
              "Led core data platform group managing high-throughput telemetry pipelines for global IoT and telemetry clients.",
            achievements: [
              "Engineered distributed stream-processing pipeline scaling from 100M to 1.2B records/day while reducing AWS infrastructure spend by 38%.",
              "Implemented automated zero-trust security mesh and canary deployments across 12 worldwide Kubernetes clusters.",
            ],
          },
          {
            role: "Senior Distributed Systems Engineer",
            organization: "Nexus Cloud Labs",
            period: "2015 — 2019",
            description:
              "Designed core consensus layer and transaction state machines for high-concurrency database engine.",
            achievements: [
              "Reduced write lock contention by 65% through custom lock-free memory rings.",
              "Maintained 100% on-call reliability record across four years of production operations.",
            ],
          },
        ],
        education: [
          {
            degree: "B.S. in Computer Science & Applied Mathematics",
            institution: "University of California, Berkeley",
            period: "2011 — 2015",
          },
        ],
        certifications: [
          "AWS Certified Solutions Architect — Professional",
          "Certified Kubernetes Administrator (CKA)",
          "HashiCorp Certified: Terraform Associate",
        ],
      },
    },
    {
      id: "ZL-002",
      index: "02",
      slug: "alex-rivera",
      tabTitle: "Head of Engineering",
      category: "02 / HEAD OF ENGINEERING",
      name: "Alex Rivera",
      role: "VP OF INFRASTRUCTURE & BACKEND",
      badgeType: "LEADERSHIP",
      subroles: "KUBERNETES / GO / CLOUD-NATIVE",
      photo: "/images/team/alex.jpg",
      meetingUrl: "https://zcal.co/zerolatency/alex-rivera",
      bio: [
        "Alex leads core platform engineering and distributed systems architecture, previously scaling high-throughput microservices for **Tier-1 fintech and cloud-native startups**.",
        "Specializing in **Kubernetes, Go, and resilient backend systems**, Alex has orchestrated multi-region deployments serving **millions of concurrent users** with 99.999% uptime.",
        "Alex mentors engineers across open-source communities and leads engineering delivery across our highest-velocity client projects.",
      ],
      tags: ["K8S SPECIALIST", "MICROSERVICES", "DEVOPS EXCELLENCE"],
      primaryCta: { label: "Learn more", href: "/team/alex-rivera" },
      secondaryCta: {
        label: "Book a meeting",
        href: "https://zcal.co/zerolatency/alex-rivera",
        isExternal: true,
      },
      resume: {
        headline: "VP of Engineering & Cloud-Native Infrastructure Specialist",
        location: "Austin, TX / Remote",
        experienceYears: 10,
        availability: "Available for Platform Audits & Technical Leadership",
        summary:
          "Alex brings a decade of hands-on leadership building rock-solid backend infrastructure, automated deployment pipelines, and high-velocity engineering organizations. With deep expertise in Go and Kubernetes, Alex transforms chaotic microservices into orderly, observable systems.",
        metrics: [
          { value: "99.999%", label: "Fleet Availability" },
          { value: "450k+", label: "Concurrent WebSockets" },
          { value: "3.2x", label: "Deployment Velocity Boost" },
          { value: "12+", label: "Multi-Region K8s Clusters" },
        ],
        competencies: [
          {
            category: "Infrastructure & Orchestration",
            skills: [
              "Kubernetes Cluster Design",
              "ArgoCD & GitOps",
              "Istio Service Mesh",
              "Prometheus & Grafana Observability",
              "AWS / GCP Multi-Cloud",
            ],
          },
          {
            category: "Backend & Systems",
            skills: [
              "High-Throughput Go",
              "gRPC & Protobuf",
              "PostgreSQL & CockroachDB",
              "Redis Caching Topologies",
              "Event Sourcing",
            ],
          },
          {
            category: "DevOps & SRE",
            skills: [
              "Chaos Engineering",
              "Automated Disaster Recovery",
              "SLO/SLA Definition",
              "Terraform Modules",
            ],
          },
        ],
        experience: [
          {
            role: "VP of Infrastructure & Platform",
            organization: "ZeroLatency",
            period: "2023 — Present",
            description:
              "Oversees backend engineering standards, deployment pipelines, and cloud security across client deliverables.",
            achievements: [
              "Designed declarative GitOps automation cutting client release cycles from 2 weeks to 18 minutes.",
              "Implemented distributed tracing with OpenTelemetry, cutting mean-time-to-detection (MTTD) by 72%.",
            ],
          },
          {
            role: "Staff Infrastructure Engineer",
            organization: "PayStream Global",
            period: "2018 — 2023",
            description:
              "Spearheaded multi-region payment gateway infrastructure handling $6B in annualized volume.",
            achievements: [
              "Achieved zero data loss during simulated data-center blackout exercises.",
              "Migrated 60+ containerized workloads to unified EKS with zero client interruption.",
            ],
          },
          {
            role: "Backend Infrastructure Engineer",
            organization: "AeroCloud",
            period: "2015 — 2018",
            description:
              "Built backend telemetry microservices in Go supporting real-time fleet analytics.",
            achievements: [
              "Scaled WebSocket hub to support 450,000 persistent concurrent connections.",
            ],
          },
        ],
        education: [
          {
            degree: "B.S. in Software Engineering",
            institution: "University of Texas at Austin",
            period: "2011 — 2015",
          },
        ],
        certifications: [
          "Certified Kubernetes Security Specialist (CKS)",
          "Google Cloud Professional Cloud Architect",
        ],
      },
    },
    {
      id: "ZL-003",
      index: "03",
      slug: "sophia-chen",
      tabTitle: "Lead Product Designer",
      category: "03 / PRODUCT & CREATIVE DIRECTOR",
      name: "Sophia Chen",
      role: "HEAD OF DESIGN & UX SYSTEMS",
      badgeType: "LEADERSHIP",
      subroles: "DESIGN SYSTEMS / 3D INTERFACES / MICRO-UX",
      photo: "/images/team/sophia.jpg",
      meetingUrl: "https://zcal.co/zerolatency/sophia-chen",
      bio: [
        "Sophia directs end-to-end product design, creative direction, and design systems for enterprise web applications and developer tools.",
        "With a background spanning award-winning digital studios, Sophia crafts **immersive, conversion-focused user interfaces** that blend micro-interactions, dark-mode ergonomics, and flawless accessibility.",
        "She has led product redesigns resulting in **over 45% increases in user engagement** and streamlined developer onboarding journeys.",
      ],
      tags: ["DESIGN SYSTEMS", "AWARDS RECIPIENT", "INTERACTION DESIGN"],
      primaryCta: { label: "Learn more", href: "/team/sophia-chen" },
      secondaryCta: {
        label: "Book a meeting",
        href: "https://zcal.co/zerolatency/sophia-chen",
        isExternal: true,
      },
      resume: {
        headline:
          "Creative Director & UX Architect specialized in developer platforms and modern dark-mode interfaces",
        location: "New York, NY / Remote",
        experienceYears: 9,
        availability: "Available for Design System Audits & Product Overhauls",
        summary:
          "Sophia bridges technical complexity and visual excellence. With near a decade of experience designing enterprise software and developer tooling, Sophia builds design systems that accelerate development speed while establishing indelible brand identities.",
        metrics: [
          { value: "45%+", label: "Engagement Lift" },
          { value: "3x", label: "UI Component Reusability" },
          { value: "4", label: "Awwwards & FWA Honors" },
          { value: "100%", label: "WCAG AAA Compliant Systems" },
        ],
        competencies: [
          {
            category: "Design Leadership & Strategy",
            skills: [
              "End-to-End Product Design",
              "Design Systems Architecture",
              "User Research & Usability Testing",
              "Conversion Optimization (CRO)",
              "Brand & Visual Identity",
            ],
          },
          {
            category: "Interaction & Craft",
            skills: [
              "Figma Tokens & Variants",
              "Framer Motion Prototyping",
              "Micro-Interactions & Animation",
              "Dark-Mode Ergonomics",
              "3D & Spatial UI (Spline, Three.js)",
            ],
          },
          {
            category: "Front-End Collaboration",
            skills: [
              "Tailwind CSS",
              "Semantic HTML5",
              "Design-to-Code Pipelines",
              "Radix UI & Shadcn",
            ],
          },
        ],
        experience: [
          {
            role: "Head of Design & UX Systems",
            organization: "ZeroLatency",
            period: "2023 — Present",
            description:
              "Leads product design practice, defining design languages, UI component libraries, and interactive prototypes for clients.",
            achievements: [
              "Crafted ZeroLatency's signature electric dark-glass design language with custom lanyard badge components.",
              "Spearheaded design system unification for 4 enterprise client apps, decreasing front-end implementation time by 60%.",
            ],
          },
          {
            role: "Lead Product Designer",
            organization: "Hyperion Studio",
            period: "2019 — 2023",
            description:
              "Led product design squad creating next-generation web applications for high-growth tech companies.",
            achievements: [
              "Won Site of the Day and Developer Award on Awwwards for interactive developer portal.",
              "Redesigned SaaS checkout funnel, driving a 28% increase in trial-to-paid conversion.",
            ],
          },
          {
            role: "Senior UX Designer",
            organization: "Monolith Creative",
            period: "2016 — 2019",
            description:
              "Designed responsive web interfaces and mobile applications for international brands.",
            achievements: [
              "Established design systems and responsive component tokens used across 14 product lines.",
            ],
          },
        ],
        education: [
          {
            degree: "B.F.A. in Communication Design & Interaction",
            institution: "Rhode Island School of Design (RISD)",
            period: "2012 — 2016",
          },
        ],
        certifications: [
          "Nielsen Norman Group (NN/g) UX Master Certified",
          "Interaction Design Foundation (IxDF) Design System Specialist",
        ],
      },
    },
    {
      id: "ZL-004",
      index: "04",
      slug: "marcus-vance",
      tabTitle: "Community & Ecosystem",
      category: "04 / HEAD OF DEVREL & PARTNERSHIPS",
      name: "Marcus Vance",
      role: "HEAD OF DEVREL & GROWTH",
      badgeType: "CORE TEAM",
      subroles: "DEVELOPER ECOSYSTEMS / ADVOCACY / GTM",
      photo: "/images/team/marcus.jpg",
      meetingUrl: "https://zcal.co/zerolatency/marcus-vance",
      bio: [
        "Marcus builds and empowers global builder communities, running developer programs and international hackathons connecting **over 100,000 developers worldwide**.",
        "Previously leading developer advocacy at enterprise tooling unicorns, Marcus bridges product engineers with executive stakeholders through high-impact technical workshops and open-source documentation.",
        "He specializes in developer go-to-market strategies, technical storytelling, and driving community-led product growth.",
      ],
      tags: ["DEV ADVOCATE", "COMMUNITY ARCHITECT", "GROWTH STRATEGY"],
      primaryCta: { label: "Learn more", href: "/team/marcus-vance" },
      secondaryCta: {
        label: "Book a meeting",
        href: "https://zcal.co/zerolatency/marcus-vance",
        isExternal: true,
      },
      resume: {
        headline: "Developer Relations Leader & Ecosystem Growth Strategist",
        location: "Seattle, WA / Remote",
        experienceYears: 8,
        availability: "Available for DevRel Strategy & Technical Community Building",
        summary:
          "Marcus has spent 8 years at the intersection of code, community, and commercial growth. Having organized global hackathons and built active developer ecosystems from zero to 100,000+ members, Marcus specializes in turning technical products into beloved industry standards.",
        metrics: [
          { value: "100k+", label: "Builders Mobilized" },
          { value: "24+", label: "International Hackathons" },
          { value: "4.8/5", label: "Developer Workshop Rating" },
          { value: "14x", label: "Community Inbound Growth" },
        ],
        competencies: [
          {
            category: "Ecosystem & DevRel",
            skills: [
              "Developer Advocacy",
              "Technical Documentation & Guides",
              "Global Hackathons & Keynotes",
              "Open-Source Community Management",
              "Developer Onboarding Optimization",
            ],
          },
          {
            category: "Technical Knowledge",
            skills: [
              "TypeScript & Node.js",
              "REST & GraphQL APIs",
              "GitHub Actions & Automation",
              "CLI Tooling Development",
            ],
          },
          {
            category: "Growth & Partnerships",
            skills: [
              "Technical Content Marketing",
              "Strategic Technology Partnerships",
              "Product-Led Growth (PLG)",
              "Developer Analytics",
            ],
          },
        ],
        experience: [
          {
            role: "Head of DevRel & Partnerships",
            organization: "ZeroLatency",
            period: "2023 — Present",
            description:
              "Leads ecosystem relationships, developer adoption, and technical partnerships for ZeroLatency and our partner startups.",
            achievements: [
              "Built global developer network spanning 18 tech hubs across North America, Europe, and Asia.",
              "Delivered 12 hands-on technical webinars on low-latency microservices with 94% retention rate.",
            ],
          },
          {
            role: "Senior Developer Advocate",
            organization: "ScaleMesh Inc",
            period: "2020 — 2023",
            description:
              "Managed developer experience and global advocacy programs for API gateway platform.",
            achievements: [
              "Grew active community from 8,000 to 110,000 developers across Discord and GitHub.",
              "Authored technical tutorials viewed over 2.4 million times across dev.to and Medium.",
            ],
          },
          {
            role: "Developer Evangelist",
            organization: "Krypton Systems",
            period: "2017 — 2020",
            description:
              "Conducted developer workshops and hackathons across university engineering departments.",
            achievements: [
              "Mentored 400+ student teams in building production-ready distributed applications.",
            ],
          },
        ],
        education: [
          {
            degree: "B.S. in Computer Science & Technical Communication",
            institution: "University of Washington",
            period: "2013 — 2017",
          },
        ],
        certifications: [
          "Developer Relations Foundation Certified (DevRelUni)",
          "GitHub Campus Advisor & Open Source Lead",
        ],
      },
    },
  ],
};
