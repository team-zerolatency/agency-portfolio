import type { Heading } from "@/config/sections";

export interface GlobeLocation {
  name: string;
  region: string;
  detail: string;
  lat: number;
  lng: number;
}

/** Defines a dotted arc line between two location names. */
export interface GlobeConnection {
  from: string;
  to: string;
}

export interface GlobeColors {
  dots: string;
  marker: string;
  arc: string;
  glow: string;
}

/** Hex copies of --fg-muted/--accent-2 and --accent from globals.css (WebGL can't read CSS variables). */
export const globeColors: Record<"dark" | "light", GlobeColors> = {
  dark: { dots: "#a0b4c8", marker: "#2b8cff", arc: "#4da6ff", glow: "#1a3a5c" },
  light: { dots: "#5b6675", marker: "#0a7cff", arc: "#0a7cff", glow: "#d0e8ff" },
};

export const globeConfig: {
  label: string;
  heading: Heading;
  description: string;
  locations: GlobeLocation[];
  connections: GlobeConnection[];
  stats: { label: string; value: number; prefix?: string; suffix?: string }[];
} = {
  label: "Global Reach",
  heading: { lead: "Clients across", accent: "every timezone" },
  description:
    "Remote-first, with overlapping hours wherever your team is. Dummy locations, replace with your own.",
  locations: [
    {
      name: "San Francisco",
      region: "United States",
      detail: "AI startups and venture platforms",
      lat: 37.77,
      lng: -122.42,
    },
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
    {
      name: "Amsterdam",
      region: "Netherlands",
      detail: "Creative tech and design studios",
      lat: 52.37,
      lng: 4.9,
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
      name: "Bangalore",
      region: "India",
      detail: "AI labs and core engineering teams",
      lat: 12.97,
      lng: 77.59,
    },
    {
      name: "Singapore",
      region: "Singapore",
      detail: "Logistics and fintech",
      lat: 1.35,
      lng: 103.82,
    },
    {
      name: "Tokyo",
      region: "Japan",
      detail: "Robotics and consumer media",
      lat: 35.68,
      lng: 139.69,
    },
    {
      name: "Sydney",
      region: "Australia",
      detail: "Health and education apps",
      lat: -33.87,
      lng: 151.21,
    },
  ],
  connections: [
    { from: "San Francisco", to: "New York" },
    { from: "New York", to: "London" },
    { from: "Toronto", to: "New York" },
    { from: "New York", to: "São Paulo" },
    { from: "London", to: "Amsterdam" },
    { from: "Amsterdam", to: "Berlin" },
    { from: "Berlin", to: "Dubai" },
    { from: "Dubai", to: "Bangalore" },
    { from: "Bangalore", to: "Singapore" },
    { from: "Singapore", to: "Tokyo" },
    { from: "Singapore", to: "Sydney" },
    { from: "Tokyo", to: "San Francisco" },
  ],
  stats: [
    { label: "Timezones covered", value: 14 },
    { label: "Average response time", value: 2, prefix: "< ", suffix: " hrs" },
    { label: "Languages spoken", value: 5 },
  ],
};
