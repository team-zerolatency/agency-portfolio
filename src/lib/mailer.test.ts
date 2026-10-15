// @vitest-environment node
import { buildEmail, sendContactEmail } from "./mailer";
import type { ContactData } from "./contact";

const data: ContactData = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  projectType: "Web app",
  message: "We need a customer portal built.",
};

const env = {
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "owner@example.com",
  CONTACT_FROM_EMAIL: "Site <site@example.com>",
};

describe("buildEmail", () => {
  it("builds a readable subject and body", () => {
    const { subject, text } = buildEmail(data);
    expect(subject).toBe("New enquiry: Web app from Ada Lovelace");
    expect(text).toContain("Email: ada@example.com");
    expect(text).toContain("Company: Analytical Engines");
    expect(text).toContain("We need a customer portal built.");
  });

  it("keeps the subject on one line even if the name contains line breaks", () => {
    const { subject } = buildEmail({ ...data, name: "Eve\r\nBcc: attacker@example.com" });
    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("shows a dash when company is empty", () => {
    expect(buildEmail({ ...data, company: "" }).text).toContain("Company: -");
  });
});

describe("sendContactEmail", () => {
  afterEach(() => vi.restoreAllMocks());

  it("posts to Resend with the key, recipient and reply-to", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));
    await sendContactEmail(data, { env, fetchFn, isProduction: true });

    expect(fetchFn).toHaveBeenCalledTimes(1);
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init?.body as string)).toMatchObject({
      from: "Site <site@example.com>",
      to: ["owner@example.com"],
      reply_to: "ada@example.com",
    });
  });

  it("throws when the provider rejects the request", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 422 }));
    await expect(sendContactEmail(data, { env, fetchFn, isProduction: true })).rejects.toThrow(
      "422",
    );
  });

  it("throws in production when email is not configured", async () => {
    const fetchFn = vi.fn<typeof fetch>();
    await expect(sendContactEmail(data, { env: {}, fetchFn, isProduction: true })).rejects.toThrow(
      /not configured/,
    );
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("logs instead of sending in development when email is not configured", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const fetchFn = vi.fn<typeof fetch>();
    await sendContactEmail(data, { env: {}, fetchFn, isProduction: false });
    expect(fetchFn).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalled();
  });
});
