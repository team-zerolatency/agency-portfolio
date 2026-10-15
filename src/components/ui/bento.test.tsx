import { render, screen } from "@testing-library/react";
import { BentoCell, BentoGrid } from "./bento";

describe("Bento", () => {
  it("BentoGrid renders children inside a 12-column desktop grid", () => {
    render(
      <BentoGrid data-testid="g">
        <BentoCell>one</BentoCell>
      </BentoGrid>,
    );
    expect(screen.getByTestId("g")).toHaveClass("grid", "lg:grid-cols-12");
    expect(screen.getByText("one")).toBeInTheDocument();
  });

  it("BentoCell defaults to the md size", () => {
    render(<BentoCell data-testid="c">x</BentoCell>);
    const cell = screen.getByTestId("c");
    expect(cell).toHaveAttribute("data-size", "md");
    expect(cell).toHaveClass("lg:col-span-4");
  });

  it("BentoCell applies the requested size and keeps custom classes", () => {
    render(
      <BentoCell data-testid="c" size="lg" className="p-10">
        x
      </BentoCell>,
    );
    const cell = screen.getByTestId("c");
    expect(cell).toHaveClass("lg:col-span-8", "lg:row-span-2", "p-10");
  });
});
