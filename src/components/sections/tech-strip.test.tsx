import { render, screen } from "@testing-library/react";
import { TechStrip } from "./tech-strip";
import { techStack } from "@/config/tech";

describe("TechStrip", () => {
  it("is labelled for assistive tech", () => {
    render(<TechStrip />);
    expect(screen.getByRole("group", { name: /technologies we build with/i })).toBeInTheDocument();
  });

  it("renders every technology (twice, for the seamless loop)", () => {
    render(<TechStrip />);
    for (const t of techStack) {
      expect(screen.getAllByText(t.name)).toHaveLength(2);
    }
  });

  it("is 96px tall (2 grid cells) so its border sits on a grid line", () => {
    render(<TechStrip />);
    const strip = screen.getByRole("group", { name: /technologies we build with/i });
    expect(strip).toHaveClass("h-24", "border-b");
  });
});
