import type { Heading } from "@/config/sections";

export interface GlobeLocation {
  name: string;
  region: string;
  detail: string;
  lat: number;
  lng: number;
}

export interface GlobeColors {
  dots: string;
  marker: string;
}

/** Hex copies of --fg-muted/--accent-2 and --accent from globals.css (WebGL can't read CSS variables). */
export const globeColors: Record<"dark" | "light", GlobeColors> = {
  dark: { dots: "#7cc0ff", marker: "#2b8cff" },
  light: { dots: "#5b6675", marker: "#0a7cff" },
};

export const globeConfig: {
  label: string;
  heading: Heading;
  description: string;
  locations: GlobeLocation[];
  stats: { label: string; value: number; prefix?: string; suffix?: string }[];
} = {
  label: "Global Reach",
  heading: { lead: "Clients across", accent: "every timezone" },
  description:
    "Remote-first, with overlapping hours wherever your team is. Dummy locations, replace with your own.",
  locations: [
    {
      name: "New York",
      region: "United States",
      detail: "Fintech and SaaS clients",
      lat: 40.71,
      lng: -74.0,
    },
    {
      name: "Toronto",
      region: "Canada",
      detail: "E-commerce and logistics",
      lat: 43.65,
      lng: -79.38,
    },
    {
      name: "São Paulo",
      region: "Brazil",
      detail: "Marketplace and mobile apps",
      lat: -23.55,
      lng: -46.63,
    },
    {
      name: "London",
      region: "United Kingdom",
      detail: "Startups and agencies",
      lat: 51.51,
      lng: -0.13,
    },
    { name: "Berlin", region: "Germany", detail: "B2B platforms", lat: 52.52, lng: 13.4 },
    {
      name: "Dubai",
      region: "United Arab Emirates",
      detail: "Real estate and travel",
      lat: 25.2,
      lng: 55.27,
    },
    {
      name: "Singapore",
      region: "Singapore",
      detail: "Logistics and fintech",
      lat: 1.35,
      lng: 103.82,
    },
    {
      name: "Sydney",
      region: "Australia",
      detail: "Health and education apps",
      lat: -33.87,
      lng: 151.21,
    },
  ],
  stats: [
    { label: "Timezones covered", value: 14 },
    { label: "Average response time", value: 2, prefix: "< ", suffix: " hrs" },
    { label: "Languages spoken", value: 5 },
  ],
};
