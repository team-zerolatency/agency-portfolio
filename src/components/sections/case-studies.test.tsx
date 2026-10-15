import { render, screen } from "@testing-library/react";
import { CaseStudies } from "./case-studies";
import { caseStudiesConfig } from "@/config/sections";

describe("CaseStudies", () => {
  it("renders the numbered label and the #work anchor used by the navbar", () => {
    const { container } = render(<CaseStudies />);
    expect(screen.getByText("03 / Selected Work")).toBeInTheDocument();
    expect(container.querySelector("#work")).not.toBeNull();
  });

  it("renders every case study with its result", () => {
    render(<CaseStudies />);
    for (const item of caseStudiesConfig.items) {
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.result.value)).toBeInTheDocument();
    }
  });

  it("links each case study to its href", () => {
    render(<CaseStudies />);
    for (const item of caseStudiesConfig.items) {
      expect(screen.getByRole("link", { name: `View case study: ${item.title}` })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });
});
