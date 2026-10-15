import { brandColor, luminance } from "./brand";

describe("luminance", () => {
  it("is 0 for black and about 1 for white", () => {
    expect(luminance("000000")).toBe(0);
    expect(luminance("ffffff")).toBeCloseTo(1, 3);
  });

  it("accepts a leading # and 3-digit hex", () => {
    expect(luminance("#fff")).toBeCloseTo(1, 3);
  });

  it("treats invalid input as black", () => {
    expect(luminance("not-a-color")).toBe(0);
  });
});

describe("brandColor", () => {
  it("returns the brand color with a leading #", () => {
    expect(brandColor("47A248")).toBe("#47A248");
    expect(brandColor("#47A248")).toBe("#47A248");
  });

  it("falls back to the theme text color for near-black brands", () => {
    expect(brandColor("000000")).toBe("var(--fg)");
    expect(brandColor("0a1f44")).toBe("var(--fg)");
  });

  it("falls back to the theme text color for invalid input", () => {
    expect(brandColor("oops")).toBe("var(--fg)");
  });
});
