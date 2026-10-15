import React from "react";
import {
  TechJavaIcon,
  TechReactIcon,
  TechNextjsIcon,
  TechTypescriptIcon,
  TechTailwindIcon,
  TechAndroidIcon,
  TechKotlinIcon,
  TechFlutterIcon,
  TechNodejsIcon,
  TechPythonIcon,
  TechJavascriptIcon,
  TechVueIcon,
  TechPostgresIcon,
  TechDockerIcon,
  TechAwsIcon,
  TechRedisIcon,
  TechSupabaseIcon,
  TechGraphqlIcon,
  TechMongodbIcon,
  TechGitIcon,
  TechFigmaIcon,
  TechFirebaseIcon,
  TechPrismaIcon,
  TechLinuxIcon,
  TechCloudflareIcon,
  TechFramerMotionIcon,
  TechHtmlIcon,
  TechShadcnIcon,
  TechVsCodeIcon,
  TechWebsocketIcon,
  TechCIcon,
  TechCppIcon,
  TechCssIcon,
  TechGithubIcon,
  TechGithubActionsIcon,
  TechPostmanIcon,
  TechSassIcon,
  TechSqlIcon,
  TechViteIcon,
  TechWebpackIcon,
} from "@/components/icons/tech";

export interface TechnologyItem {
  name: string;
  category: string;
  icon: React.ReactNode;
}

/**
 * Technologies We Use configuration.
 * All SVG icon components are exported from "@/components/icons/tech".
 */
export const technologiesConfig: {
  heading: string;
  count: number;
  label: string;
  subtitle: string;
  items: TechnologyItem[];
} = {
  heading: "Technologies we use",
  count: 40,
  label: "",
  subtitle: "......production-ready ecosystem",
  items: [
    // --- ROW 1: Frontend, Mobile & Core Languages ---
    { name: "HTML", category: "Markup", icon: <TechHtmlIcon /> },
    { name: "CSS", category: "Styling", icon: <TechCssIcon /> },
    { name: "Sass", category: "Styling", icon: <TechSassIcon /> },
    { name: "C", category: "Systems", icon: <TechCIcon /> },
    { name: "C++", category: "Systems", icon: <TechCppIcon /> },
    { name: "React", category: "Frontend", icon: <TechReactIcon /> },
    { name: "Next.js", category: "Framework", icon: <TechNextjsIcon /> },
    { name: "TypeScript", category: "Language", icon: <TechTypescriptIcon /> },
    { name: "Framer Motion", category: "Animation", icon: <TechFramerMotionIcon /> },
    { name: "Java", category: "Backend & Android", icon: <TechJavaIcon /> },
    { name: "Tailwind CSS", category: "Styling", icon: <TechTailwindIcon /> },
    { name: "shadcn/ui", category: "Components", icon: <TechShadcnIcon /> },
    { name: "Android", category: "Mobile", icon: <TechAndroidIcon /> },
    { name: "Kotlin", category: "Android", icon: <TechKotlinIcon /> },
    { name: "Flutter", category: "Cross-Platform", icon: <TechFlutterIcon /> },
    { name: "Node.js", category: "Runtime", icon: <TechNodejsIcon /> },
    { name: "Python", category: "Backend & AI", icon: <TechPythonIcon /> },
    { name: "JavaScript", category: "Language", icon: <TechJavascriptIcon /> },
    { name: "Vue.js", category: "Frontend", icon: <TechVueIcon /> },

    // --- ROW 2: Backend, Database, Cloud & DevOps ---
    { name: "PostgreSQL", category: "Database", icon: <TechPostgresIcon /> },
    { name: "SQL", category: "Database", icon: <TechSqlIcon /> },
    { name: "Docker", category: "DevOps", icon: <TechDockerIcon /> },
    { name: "AWS", category: "Cloud", icon: <TechAwsIcon /> },
    { name: "Cloudflare", category: "Edge & Cloud", icon: <TechCloudflareIcon /> },
    { name: "Redis", category: "Caching", icon: <TechRedisIcon /> },
    { name: "Supabase", category: "Backend", icon: <TechSupabaseIcon /> },
    { name: "GraphQL", category: "API", icon: <TechGraphqlIcon /> },
    { name: "WebSocket", category: "Realtime", icon: <TechWebsocketIcon /> },
    { name: "MongoDB", category: "NoSQL", icon: <TechMongodbIcon /> },
    { name: "Git", category: "VCS", icon: <TechGitIcon /> },
    { name: "GitHub", category: "VCS & CI/CD", icon: <TechGithubIcon /> },
    { name: "GitHub Actions", category: "CI/CD", icon: <TechGithubActionsIcon /> },
    { name: "VS Code", category: "Editor", icon: <TechVsCodeIcon /> },
    { name: "Vite", category: "Build Tool", icon: <TechViteIcon /> },
    { name: "Webpack", category: "Bundler", icon: <TechWebpackIcon /> },
    { name: "Postman", category: "API Testing", icon: <TechPostmanIcon /> },
    { name: "Figma", category: "Design", icon: <TechFigmaIcon /> },
    { name: "Firebase", category: "Platform", icon: <TechFirebaseIcon /> },
    { name: "Prisma", category: "ORM", icon: <TechPrismaIcon /> },
    { name: "Linux", category: "OS & Server", icon: <TechLinuxIcon /> },
  ],
};
