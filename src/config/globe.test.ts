import { globeColors, globeConfig } from "./globe";

describe("globe config", () => {
  it("has valid coordinates for every location", () => {
    for (const l of globeConfig.locations) {
      expect(l.lat).toBeGreaterThanOrEqual(-90);
      expect(l.lat).toBeLessThanOrEqual(90);
      expect(l.lng).toBeGreaterThanOrEqual(-180);
      expect(l.lng).toBeLessThanOrEqual(180);
    }
  });

  it("has unique location names", () => {
    const names = globeConfig.locations.map((l) => l.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("defines hex colors for both themes", () => {
    for (const theme of ["dark", "light"] as const) {
      expect(globeColors[theme].dots).toMatch(/^#[0-9a-f]{6}$/i);
      expect(globeColors[theme].marker).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});
