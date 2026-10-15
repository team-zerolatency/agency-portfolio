import { validateContact } from "./contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  projectType: "Web app",
  message: "We need a customer portal built.",
};

describe("validateContact", () => {
  it("accepts valid input and trims whitespace", () => {
    const result = validateContact({
      ...valid,
      name: "  Ada Lovelace  ",
      email: " ada@example.com ",
    });
    expect(result).toEqual({ ok: true, data: { ...valid } });
  });

  it("treats company as optional", () => {
    expect(validateContact({ ...valid, company: undefined }).ok).toBe(true);
  });

  it("rejects a missing or too-short name", () => {
    const result = validateContact({ ...valid, name: "A" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeDefined();
  });

  it("rejects invalid emails, including ones with line breaks", () => {
    for (const email of ["", "nope", "a@b", "a@b.co\nBcc: x@y.z", "a b@c.de"]) {
      const result = validateContact({ ...valid, email });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.errors.email).toBeDefined();
    }
  });

  it("rejects a project type that is not in the list", () => {
    const result = validateContact({ ...valid, projectType: "Space station" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.projectType).toBeDefined();
  });

  it("enforces message length limits", () => {
    const short = validateContact({ ...valid, message: "too short" });
    const long = validateContact({ ...valid, message: "x".repeat(2001) });
    expect(short.ok).toBe(false);
    expect(long.ok).toBe(false);
  });

  it("reports every invalid field at once", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual([
        "email",
        "message",
        "name",
        "projectType",
      ]);
    }
  });

  it("ignores non-string values", () => {
    expect(validateContact({ ...valid, name: 123 }).ok).toBe(false);
  });
});
