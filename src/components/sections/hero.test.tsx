import { render, screen } from "@testing-library/react";
import { Hero } from "./hero";
import { homeConfig } from "@/config/home";
import { siteConfig } from "@/config/site";

const renderHero = () => render(<Hero strip={<div data-testid="strip" />} />);

describe("Hero", () => {
  it("renders the headline with the accent phrase", () => {
    renderHero();
    const { lead, accent } = homeConfig.hero.headline;
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${lead} ${accent}`);
  });

  it("renders both calls to action with the right links", () => {
    renderHero();
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
    renderHero();
    for (const s of homeConfig.hero.stats) {
      expect(screen.getByText(s.label)).toBeInTheDocument();
    }
    expect(screen.getByRole("region", { name: /client testimonials/i })).toBeInTheDocument();
  });

  it("renders the strip passed in from the page", () => {
    renderHero();
    expect(screen.getByTestId("strip")).toBeInTheDocument();
  });

  it("keeps the background grid shifted so its lines meet the navbar and strip borders", () => {
    const { container } = renderHero();
    expect(container.querySelector('[class*="bg-[position:0_63px]"]')).not.toBeNull();
  });
});
