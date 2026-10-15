import type { Heading } from "@/config/sections";

export type ChannelIcon = "mail" | "clock" | "pin";

export interface Channel {
  icon: ChannelIcon;
  label: string;
  value: string;
  href?: string;
}

export const contactConfig: {
  label: string;
  heading: Heading;
  description: string;
  form: { submitLabel: string; successTitle: string; successText: string; errorText: string };
  channels: Channel[];
  lead: { id: string; name: string; role: string; bio: string; initials: string };
  announcement: { id: string; message: string; cta: { label: string; href: string } };
} = {
  label: "Contact",
  heading: { lead: "Let's build", accent: "something great" },
  description: "Tell us about your project. We reply within one business day, usually sooner.",
  form: {
    submitLabel: "Send message",
    successTitle: "Message sent",
    successText: "Thanks! We'll reply within one business day.",
    errorText: "Something went wrong. Please try again, or email us directly.",
  },
  channels: [
    {
      icon: "mail",
      label: "Email",
      value: "hello@youragency.com",
      href: "mailto:hello@youragency.com",
    },
    { icon: "clock", label: "Response time", value: "Within one business day" },
    { icon: "pin", label: "Location", value: "Remote-first, working worldwide" },
  ],
  lead: {
    id: "AG-001",
    name: "Your Name",
    role: "Founder & Lead Engineer",
    bio: "Hands-on with every project, from the first call to production. Replace with your real bio.",
    initials: "YN",
  },
  announcement: {
    id: "nov-2026-slots",
    message: "Now booking projects for November.",
    cta: { label: "Book a call", href: "#contact" },
  },
};
