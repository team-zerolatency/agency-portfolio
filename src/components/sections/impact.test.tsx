import { render, screen } from "@testing-library/react";
import { Impact } from "./impact";
import { impactConfig } from "@/config/sections";

describe("Impact", () => {
  it("renders the numbered label and the #impact anchor", () => {
    const { container } = render(<Impact />);
    expect(screen.getByText("02 / Proven Impact")).toBeInTheDocument();
    expect(container.querySelector("#impact")).not.toBeNull();
  });

  it("renders the chart with an accessible summary", () => {
    render(<Impact />);
    expect(
      screen.getByRole("img", { name: new RegExp(`^${impactConfig.chart.title}:`) }),
    ).toBeInTheDocument();
  });

  it("renders every counter label and every stack item", () => {
    render(<Impact />);
    for (const c of impactConfig.counters) {
      expect(screen.getByText(c.label)).toBeInTheDocument();
    }
    for (const item of impactConfig.stack.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
