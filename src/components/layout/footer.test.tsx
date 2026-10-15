import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { siteConfig } from "@/config/site";

describe("Footer", () => {
  it("renders every column heading and its links", () => {
    render(<Footer />);
    for (const col of siteConfig.footer) {
      expect(screen.getByRole("heading", { name: col.title })).toBeInTheDocument();
      for (const l of col.links) {
        expect(screen.getAllByRole("link", { name: l.label }).length).toBeGreaterThan(0);
      }
    }
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it("opens social links safely in a new tab", () => {
    render(<Footer />);
    const gh = screen.getByRole("link", { name: "GitHub" });
    expect(gh).toHaveAttribute("target", "_blank");
    expect(gh).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });
});
