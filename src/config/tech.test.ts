import { missingTech, techStack } from "./tech";

describe("techStack", () => {
  it("finds a logo for every entry in techList (a failure here lists the missing slugs)", () => {
    expect(missingTech).toEqual([]);
  });

  it("has a name, an svg path and a 6-digit hex color for every item", () => {
    expect(techStack.length).toBeGreaterThan(0);
    for (const t of techStack) {
      expect(t.name.length).toBeGreaterThan(0);
      expect(t.path.length).toBeGreaterThanOrEqual(20);
      expect(t.hex).toMatch(/^[0-9a-f]{6}$/i);
    }
  });

  it("has unique names", () => {
    const names = techStack.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("starts with the MERN stack", () => {
    expect(techStack.slice(0, 4).map((t) => t.name)).toEqual([
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ]);
  });

  it("shows Java and the mobile tools", () => {
    const names = techStack.map((t) => t.name);
    for (const n of ["Java", "Kotlin", "Android"]) expect(names).toContain(n);
  });
});
