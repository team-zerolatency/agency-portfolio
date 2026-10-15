import { render, screen } from "@testing-library/react";
import { TechnologiesBand } from "./technologies-band";
import { technologiesConfig } from "@/config/technologies";

describe("TechnologiesBand", () => {
  it("renders the heading and technology count", () => {
    render(<TechnologiesBand />);
    expect(
      screen.getByRole("heading", { level: 2, name: /technologies we use/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${technologiesConfig.count}+`)).toBeInTheDocument();
    if (technologiesConfig.label) {
      expect(screen.getByText(technologiesConfig.label)).toBeInTheDocument();
    }
    if (technologiesConfig.subtitle) {
      expect(screen.getByText(technologiesConfig.subtitle)).toBeInTheDocument();
    }
  });

  it("renders every technology item for the seamless marquee loop", () => {
    render(<TechnologiesBand />);
    for (const tech of technologiesConfig.items) {
      expect(screen.getAllByLabelText(tech.name).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("scrolls rows across the strip in alternating directions", () => {
    const { container } = render(<TechnologiesBand />);
    const tracks = container.querySelectorAll("[data-marquee-track]");
    expect(tracks.length).toBeGreaterThanOrEqual(4);
    // Upper row (tracks 0 & 1) scrolls right to left
    expect(tracks[0]).not.toHaveClass("[animation-direction:reverse]");
    // Lower row (tracks 2 & 3) scrolls left to right
    expect(tracks[2]).toHaveClass("[animation-direction:reverse]");
  });
});
