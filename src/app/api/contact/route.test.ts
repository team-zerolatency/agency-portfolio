// @vitest-environment node
import { sendContactEmail } from "@/lib/mailer";
import { POST } from "./route";

vi.mock("@/lib/mailer", () => ({ sendContactEmail: vi.fn() }));

const send = vi.mocked(sendContactEmail);

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  projectType: "Web app",
  message: "We need a customer portal built.",
  website: "",
};

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

describe("POST /api/contact", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue(undefined);
  });

  it("sends the email and returns ok for valid input", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com" });
  });

  it("returns 422 with field errors for invalid input and sends nothing", async () => {
    const res = await post({ ...valid, name: "", email: "nope" });
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.errors.name).toBeDefined();
    expect(json.errors.email).toBeDefined();
    expect(send).not.toHaveBeenCalled();
  });

  it("silently accepts but does not send when the honeypot is filled", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON and for non-object bodies", async () => {
    expect((await post("{not json")).status).toBe(400);
    expect((await post("null")).status).toBe(400);
    expect((await post("5")).status).toBe(400);
  });

  it("returns 413 for oversized bodies", async () => {
    const res = await post({ ...valid, message: "x".repeat(11_000) });
    expect(res.status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns 502 when the email provider fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockRejectedValue(new Error("provider down"));
    const res = await post(valid);
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });
});
