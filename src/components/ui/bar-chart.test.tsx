import { render, screen } from "@testing-library/react";
import { BarChart } from "./bar-chart";

const data = [
  { label: "2024", value: 10 },
  { label: "2025", value: 20 },
];

describe("BarChart", () => {
  it("exposes a text summary of the data to assistive tech", () => {
    render(<BarChart data={data} title="Projects per year" />);
    expect(
      screen.getByRole("img", { name: "Projects per year: 2024 10, 2025 20" }),
    ).toBeInTheDocument();
  });

  it("scales bar heights relative to the largest value", () => {
    const { container } = render(<BarChart data={data} title="Projects per year" />);
    const bars = container.querySelectorAll<HTMLElement>("[data-bar]");
    expect(bars[0]).toHaveStyle({ height: "50%" });
    expect(bars[1]).toHaveStyle({ height: "100%" });
  });

  it("renders every label and value", () => {
    render(<BarChart data={data} title="Projects per year" />);
    for (const d of data) {
      expect(screen.getByText(d.label)).toBeInTheDocument();
      expect(screen.getByText(String(d.value))).toBeInTheDocument();
    }
  });
});
