import { render, screen } from "@testing-library/react";
import { TechLogo } from "./tech-logo";

const mongo = { name: "MongoDB", path: "M0 0h24v24H0z", hex: "47A248" };
const next = { name: "Next.js", path: "M0 0h24v24H0z", hex: "000000" };

describe("TechLogo", () => {
  it("renders the name and the svg path", () => {
    const { container } = render(<TechLogo tech={mongo} />);
    expect(screen.getByText("MongoDB")).toBeInTheDocument();
    expect(container.querySelector("svg path")).toHaveAttribute("d", mongo.path);
  });

  it("hides the decorative svg from assistive tech (the name is the label)", () => {
    const { container } = render(<TechLogo tech={mongo} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses a 24x24 viewBox unless the logo says otherwise", () => {
    const { container, rerender } = render(<TechLogo tech={mongo} />);
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 24 24");
    rerender(<TechLogo tech={{ ...mongo, viewBox: "0 0 100 100" }} />);
    expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 100 100");
  });

  it("is neutral by default and only takes the brand color on hover", () => {
    const { container } = render(<TechLogo tech={mongo} />);
    expect(container.firstChild).toHaveClass("text-fg-muted", "hover:text-[var(--brand)]");
  });

  it("exposes the brand color through a CSS variable", () => {
    const { container } = render(<TechLogo tech={mongo} />);
    expect((container.firstChild as HTMLElement).style.getPropertyValue("--brand")).toBe("#47A248");
  });

  it("uses the theme text color for near-black brands", () => {
    const { container } = render(<TechLogo tech={next} />);
    expect((container.firstChild as HTMLElement).style.getPropertyValue("--brand")).toBe(
      "var(--fg)",
    );
  });
});
