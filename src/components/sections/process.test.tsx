import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({ gsap: {}, ScrollTrigger: {}, useGSAP: () => {} }));

import { Process } from "./process";
import { processConfig } from "@/config/story";

describe("Process", () => {
  it("renders the numbered label and heading", () => {
    render(<Process />);
    expect(screen.getByText("04 / How We Work")).toBeInTheDocument();
    const { lead, accent } = processConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
  });

  it("renders every step in order with a zero-padded number", () => {
    render(<Process />);
    const items = screen.getAllByRole("listitem").filter((li) => li.hasAttribute("data-step"));
    expect(items).toHaveLength(processConfig.steps.length);
    processConfig.steps.forEach((step, i) => {
      expect(screen.getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
      expect(items[i]).toHaveTextContent(String(i + 1).padStart(2, "0"));
    });
  });

  it("exposes the #process anchor used by the navbar", () => {
    const { container } = render(<Process />);
    expect(container.querySelector("#process")).not.toBeNull();
  });
});
