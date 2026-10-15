import { render, screen } from "@testing-library/react";
import { ProjectsBand } from "./projects-band";
import { homeConfig } from "@/config/home";
import { facts } from "@/config/fact";

describe("ProjectsBand", () => {
  it("renders the heading and the final project count for screen readers", () => {
    render(<ProjectsBand />);
    expect(
      screen.getByRole("heading", { level: 2, name: homeConfig.projects.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(`${homeConfig.projects.total}+`)).toBeInTheDocument();
    expect(screen.getByText(homeConfig.projects.label)).toBeInTheDocument();
  });

  it("renders every project name (twice each, for the seamless loop)", () => {
    render(<ProjectsBand />);
    for (const p of homeConfig.projects.items) {
      expect(screen.getAllByText(p.name)).toHaveLength(2);
    }
  });

  it("scrolls rows across the band in alternating directions", () => {
    const { container } = render(<ProjectsBand />);
    const tracks = container.querySelectorAll("[data-marquee-track]");
    expect(tracks.length).toBeGreaterThanOrEqual(4);
    // Upper row (tracks 0 & 1) scrolls right to left
    expect(tracks[0]).not.toHaveClass("[animation-direction:reverse]");
    // Lower row (tracks 2 & 3) scrolls left to right
    expect(tracks[2]).toHaveClass("[animation-direction:reverse]");
  });

  it("never claims fewer projects than it lists", () => {
    expect(homeConfig.projects.total).toBeGreaterThanOrEqual(homeConfig.projects.items.length);
  });

  it("uses the shared project count", () => {
    expect(homeConfig.projects.total).toBe(facts.projectsShipped);
  });
});
