import { render, screen } from "@testing-library/react";
import { Marquee } from "./marquee";

describe("Marquee", () => {
  it("renders its children twice for a seamless loop", () => {
    render(
      <Marquee>
        <span>Acme</span>
      </Marquee>,
    );
    expect(screen.getAllByText("Acme")).toHaveLength(2);
  });

  it("hides the duplicate track from assistive tech", () => {
    const { container } = render(
      <Marquee>
        <span>Acme</span>
      </Marquee>,
    );
    const tracks = container.querySelectorAll("[data-marquee-track]");
    expect(tracks[0]).not.toHaveAttribute("aria-hidden");
    expect(tracks[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the duration variable and reverse direction", () => {
    const { container } = render(
      <Marquee duration={20} reverse>
        <span>Acme</span>
      </Marquee>,
    );
    expect((container.firstChild as HTMLElement).getAttribute("style")).toContain(
      "--marquee-duration: 20s",
    );
    expect(container.querySelector("[data-marquee-track]")).toHaveClass(
      "[animation-direction:reverse]",
    );
  });

  it("applies animationDelay style when delay prop is specified", () => {
    const { container } = render(
      <Marquee delay={-2.5}>
        <span>Acme</span>
      </Marquee>,
    );
    const track = container.querySelector("[data-marquee-track]") as HTMLElement;
    expect(track.style.animationDelay).toBe("-2.5s");
  });
});
