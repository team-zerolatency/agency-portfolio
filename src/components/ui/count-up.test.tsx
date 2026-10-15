import { render, screen } from "@testing-library/react";

const { state } = vi.hoisted(() => ({ state: { inView: false } }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useInView: () => state.inView,
    useReducedMotion: () => false,
    animate: (_from: number, to: number, opts: { onUpdate?: (v: number) => void }) => {
      opts.onUpdate?.(to);
      return { stop: () => {} };
    },
  };
});

import { CountUp } from "./count-up";

describe("CountUp", () => {
  it("shows 0 until it scrolls into view", () => {
    state.inView = false;
    render(<CountUp to={200} suffix="K+" />);
    expect(screen.getByText("0K+")).toBeInTheDocument();
  });

  it("shows the final value with prefix and suffix once in view", () => {
    state.inView = true;
    render(<CountUp to={200} prefix="~" suffix="K+" />);
    expect(screen.getByText("~200K+")).toBeInTheDocument();
  });
});
