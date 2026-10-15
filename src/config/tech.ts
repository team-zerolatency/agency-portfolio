import * as simpleIcons from "simple-icons";

export interface TechItem {
  name: string;
  /** SVG path data (the `d` attribute) */
  path: string;
  /** brand color, 6-digit hex without # */
  hex: string;
  /** defaults to "0 0 24 24" */
  viewBox?: string;
}

interface Entry {
  /** simple-icons slug, or a list of slugs to try in order (the first one that exists is used) */
  slug: string | string[];
  /** overrides the library's name */
  name?: string;
}

/** Order matters: it is the order of the strip. MERN first, since it is the main specialty. */
export const techList: Entry[] = [
  // MERN / MEAN
  { slug: "mongodb" },
  { slug: "express" },
  { slug: "react" },
  { slug: "nodedotjs" },
  { slug: "angular" },
  // web
  { slug: "nextdotjs" },
  { slug: "typescript" },
  { slug: "javascript" },
  { slug: "html5" },
  { slug: ["css", "css3"], name: "CSS" },
  { slug: "tailwindcss" },
  { slug: "vuedotjs" },
  { slug: "redux" },
  { slug: "nestjs" },
  { slug: "graphql" },
  // databases
  { slug: "postgresql" },
  { slug: "mysql" },
  { slug: "firebase" },
  { slug: "redis" },
  // mobile
  { slug: "android" },
  { slug: "androidstudio" },
  { slug: "kotlin" },
  { slug: "openjdk", name: "Java" }, // Java's own logo was removed from the library; OpenJDK is the stand-in
  { slug: "jetpackcompose" },
  // 3D and motion
  { slug: "threedotjs" },
  { slug: "framer", name: "Framer Motion" },
  { slug: ["gsap", "greensock"], name: "GSAP" },
  // design and tooling
  { slug: "figma" },
  { slug: "docker" },
  { slug: "git" },
  { slug: "github" },
  { slug: "githubactions" },
  { slug: "vercel" },
  { slug: "nginx" },
  { slug: "linux" },
  { slug: "postman" },
  // testing
  { slug: "vitest" },
  { slug: "jest" },
];

/**
 * Logos that are not in simple-icons. Open the brand's SVG, copy the `d` attribute of its <path>
 * (and the viewBox if it is not 0 0 24 24), and add it here, e.g.
 * { name: "Example", hex: "ff6600", path: "M0 0h24v24H0z" }
 */
export const customTech: TechItem[] = [];

interface RawIcon {
  title: string;
  slug: string;
  path: string;
  hex: string;
}

const isIcon = (value: unknown): value is RawIcon => {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.title === "string" &&
    typeof v.slug === "string" &&
    typeof v.path === "string" &&
    typeof v.hex === "string"
  );
};

const bySlug = new Map<string, RawIcon>();
for (const value of Object.values(simpleIcons)) {
  if (isIcon(value)) bySlug.set(value.slug, value);
}

const resolved = techList.map((entry) => {
  const slugs = Array.isArray(entry.slug) ? entry.slug : [entry.slug];
  const icon = slugs.map((s) => bySlug.get(s)).find((i): i is RawIcon => Boolean(i));
  return { entry, slugs, icon };
});

/** First slug of every entry the library could not find. The test fails and lists them. */
export const missingTech: string[] = resolved.filter((r) => !r.icon).map((r) => r.slugs[0]);

export const techStack: TechItem[] = [
  ...resolved.flatMap(({ entry, icon }) =>
    icon ? [{ name: entry.name ?? icon.title, path: icon.path, hex: icon.hex }] : [],
  ),
  ...customTech,
];
