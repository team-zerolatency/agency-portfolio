import { render, screen } from "@testing-library/react";
import { GlassCard } from "./glass-card";
import { SectionLabel } from "./section-label";
import { ButtonLink } from "./button";

describe("ui primitives", () => {
  it("GlassCard applies the glass class and merges custom classes", () => {
    render(<GlassCard data-testid="c" className="p-4" />);
    expect(screen.getByTestId("c")).toHaveClass("glass", "rounded-3xl", "p-4");
  });

  it("SectionLabel zero-pads the index", () => {
    render(<SectionLabel index={2} label="Proven Impact" />);
    expect(screen.getByText("02 / Proven Impact")).toBeInTheDocument();
  });

  it("ButtonLink renders an anchor with href and variant styles", () => {
    render(
      <ButtonLink href="#contact" variant="ghost">
        Talk
      </ButtonLink>,
    );
    const a = screen.getByRole("link", { name: "Talk" });
    expect(a).toHaveAttribute("href", "#contact");
    expect(a).toHaveClass("glass");
  });
});
