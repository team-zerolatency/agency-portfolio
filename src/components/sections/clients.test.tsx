import { render, screen } from "@testing-library/react";
import { Clients } from "./clients";
import { homeConfig } from "@/config/home";

describe("Clients", () => {
  it("renders the section heading", () => {
    render(<Clients />);
    expect(screen.getByRole("heading", { name: homeConfig.clients.heading })).toBeInTheDocument();
  });

  it("renders every client name (twice, for the loop)", () => {
    render(<Clients />);
    for (const name of homeConfig.clients.names) {
      expect(screen.getAllByText(name)).toHaveLength(2);
    }
  });
});
