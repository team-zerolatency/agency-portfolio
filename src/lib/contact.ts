export const PROJECT_TYPES = ["Website", "Web app", "Android app", "Something else"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ContactData {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType;
  message: string;
}

export type ContactField = "name" | "email" | "company" | "projectType" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactResult = { ok: true; data: ContactData } | { ok: false; errors: ContactErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export function validateContact(input: Partial<Record<ContactField, unknown>>): ContactResult {
  const name = text(input.name);
  const email = text(input.email);
  const company = text(input.company);
  const projectType = text(input.projectType);
  const message = text(input.message);
  const errors: ContactErrors = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 80) errors.name = "Name is too long (max 80 characters).";

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (company.length > 100) errors.company = "Company name is too long (max 100 characters).";

  if (!(PROJECT_TYPES as readonly string[]).includes(projectType)) {
    errors.projectType = "Please choose a project type.";
  }

  if (message.length < 10) errors.message = "Please tell us a bit more (at least 10 characters).";
  else if (message.length > 2000) errors.message = "Message is too long (max 2000 characters).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: { name, email, company, projectType: projectType as ProjectType, message },
  };
}
