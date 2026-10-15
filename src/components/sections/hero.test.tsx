import { render, screen } from "@testing-library/react";
import { Hero } from "./hero";
import { homeConfig } from "@/config/home";
import { siteConfig } from "@/config/site";

describe("Hero", () => {
  it("renders the headline with the accent phrase", () => {
    render(<Hero />);
    const { lead, accent } = homeConfig.hero.headline;
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${lead} ${accent}`);
  });

  it("renders both calls to action with the right links", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: siteConfig.cta.label })).toHaveAttribute(
      "href",
      siteConfig.cta.href,
    );
    expect(screen.getByRole("link", { name: siteConfig.secondaryCta.label })).toHaveAttribute(
      "href",
      siteConfig.secondaryCta.href,
    );
  });

  it("renders every stat label and the testimonial slider", () => {
    render(<Hero />);
    for (const s of homeConfig.hero.stats) {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
    expect(screen.getByRole("region", { name: /client testimonials/i })).toBeInTheDocument();
  });
});
