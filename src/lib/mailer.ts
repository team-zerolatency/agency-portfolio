import type { ContactData } from "./contact";

export interface MailerEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface Options {
  env?: MailerEnv | NodeJS.ProcessEnv;
  fetchFn?: typeof fetch;
  isProduction?: boolean;
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function buildEmail(data: ContactData) {
  const subject = `New enquiry: ${oneLine(data.projectType)} from ${oneLine(data.name)}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "-"}`,
    `Project type: ${data.projectType}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
  return { subject, text: body };
}

export async function sendContactEmail(
  data: ContactData,
  {
    env = process.env,
    fetchFn = fetch,
    isProduction = process.env.NODE_ENV === "production",
  }: Options = {},
): Promise<void> {
  const { subject, text } = buildEmail(data);
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (isProduction) throw new Error("Email delivery is not configured");
    console.info(
      `[contact] Email delivery not configured. Message would have been sent:\n${subject}\n\n${text}`,
    );
    return;
  }

  const res = await fetchFn("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!res.ok) throw new Error(`Email provider responded with ${res.status}`);
}
