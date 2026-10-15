import { processConfig, speedConfig } from "./story";

describe("story config", () => {
  it("has phase days that add up to each row's total", () => {
    for (const row of speedConfig.rows) {
      const sum = row.phases.reduce((acc, p) => acc + p.days, 0);
      expect(sum).toBe(row.days);
    }
  });

  it("highlights exactly one row", () => {
    expect(speedConfig.rows.filter((r) => r.highlight)).toHaveLength(1);
  });

  it("has uniquely titled process steps that each list a deliverable", () => {
    const titles = processConfig.steps.map((s) => s.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const step of processConfig.steps) {
      expect(step.deliverables.length).toBeGreaterThan(0);
    }
  });
});
