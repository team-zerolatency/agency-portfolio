import { render, screen } from "@testing-library/react";

vi.mock("@/components/globe/globe-canvas", () => ({
  GlobeCanvas: () => <div data-testid="globe" />,
}));

import { GlobeSection } from "./globe-section";
import { globeConfig } from "@/config/globe";

describe("GlobeSection", () => {
  it("renders the numbered label, the heading and the #reach anchor", () => {
    const { container } = render(<GlobeSection />);
    expect(screen.getByText("06 / Global Reach")).toBeInTheDocument();
    const { lead, accent } = globeConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
    expect(container.querySelector("#reach")).not.toBeNull();
  });

  it("renders the globe and every location in the list", () => {
    render(<GlobeSection />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
    for (const l of globeConfig.locations) {
      expect(screen.getByText(l.name)).toBeInTheDocument();
    }
  });

  it("renders every stat label", () => {
    render(<GlobeSection />);
    for (const s of globeConfig.stats) {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
  });
});
