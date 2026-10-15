import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  it("renders the numbered label, the heading with its accent, and the description", () => {
    render(
      <SectionHeader
        index={1}
        label="Services"
        heading={{ lead: "Build", accent: "faster" }}
        description="A short intro"
      />,
    );
    expect(screen.getByText("01 / Services")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Build faster");
    expect(screen.getByText("A short intro")).toBeInTheDocument();
  });

  it("omits the description paragraph when none is given", () => {
    const { container } = render(
      <SectionHeader index={2} label="Impact" heading={{ lead: "A", accent: "B" }} />,
    );
    // only the label paragraph exists
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });
});
