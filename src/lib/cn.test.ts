import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy classes and drops falsy ones", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
  it("lets later Tailwind classes win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
