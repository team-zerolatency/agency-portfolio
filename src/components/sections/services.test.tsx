import { render, screen } from "@testing-library/react";
import { Services } from "./services";
import { servicesConfig } from "@/config/sections";

describe("Services", () => {
  it("renders the numbered label and heading", () => {
    render(<Services />);
    expect(screen.getByText("01 / Services")).toBeInTheDocument();
    const { lead, accent } = servicesConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
  });

  it("renders a card for every service", () => {
    render(<Services />);
    for (const item of servicesConfig.items) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
    }
  });

  it("exposes the #services anchor used by the navbar", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("#services")).not.toBeNull();
  });
});
