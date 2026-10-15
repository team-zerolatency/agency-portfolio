import { render, screen } from "@testing-library/react";

const { state } = vi.hoisted(() => ({ state: { reduce: false } }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: () => state.reduce };
});

import { Reveal } from "./reveal";

describe("Reveal", () => {
  it("renders its children and className when animation is enabled", () => {
    state.reduce = false;
    const { container } = render(
      <Reveal className="mt-4">
        <p>hello</p>
      </Reveal>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("mt-4");
  });

  it("renders a plain element with no inline animation styles for reduced motion", () => {
    state.reduce = true;
    const { container } = render(
      <Reveal>
        <p>hello</p>
      </Reveal>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(container.firstChild).not.toHaveAttribute("style");
  });
});
