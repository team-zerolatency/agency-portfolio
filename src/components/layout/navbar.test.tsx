import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./navbar";
import { siteConfig } from "@/config/site";

describe("Navbar", () => {
  it("renders the brand, every nav link and the primary CTA", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: siteConfig.name })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const l of siteConfig.nav) {
      expect(within(nav).getByRole("link", { name: l.label })).toHaveAttribute("href", l.href);
    }
    expect(within(nav).getByRole("link", { name: siteConfig.cta.label })).toBeInTheDocument();
  });

  it("toggles the mobile menu and updates aria-expanded", async () => {
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: "Menu" });
    const panel = document.getElementById("mobile-menu")!;
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
  });

  it("switches to the scrolled state after scrolling", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header")!;
    expect(header).toHaveAttribute("data-scrolled", "false");
    Object.defineProperty(window, "scrollY", { value: 50, configurable: true });
    fireEvent.scroll(window);
    expect(header).toHaveAttribute("data-scrolled", "true");
  });
});
