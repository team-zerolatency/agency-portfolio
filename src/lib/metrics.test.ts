import { speedup, toPercent } from "./metrics";

describe("toPercent", () => {
  it("converts a share of the total to a percentage", () => {
    expect(toPercent(25, 100)).toBe(25);
  });
  it("rounds to two decimals", () => {
    expect(toPercent(1, 3)).toBe(33.33);
  });
  it("returns 0 for a non-positive total or value", () => {
    expect(toPercent(5, 0)).toBe(0);
    expect(toPercent(-5, 10)).toBe(0);
  });
  it("never exceeds 100", () => {
    expect(toPercent(150, 100)).toBe(100);
  });
});

describe("speedup", () => {
  it("divides and rounds to one decimal", () => {
    expect(speedup(90, 28)).toBe(3.2);
    expect(speedup(10, 10)).toBe(1);
  });
  it("returns 0 when the fast value is not positive", () => {
    expect(speedup(90, 0)).toBe(0);
  });
});
