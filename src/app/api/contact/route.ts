import { validateContact } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mailer";

const MAX_BODY_CHARS = 10_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return Response.json({ ok: false, error: "Request too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  // Hidden honeypot field: real visitors never fill it. Pretend success so bots learn nothing.
  if (typeof record.website === "string" && record.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const result = validateContact(record);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  try {
    await sendContactEmail(result.data);
  } catch (error) {
    console.error("[contact] failed to send email", error);
    return Response.json({ ok: false, error: "Could not send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
