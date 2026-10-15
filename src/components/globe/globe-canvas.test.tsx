import { render, screen } from "@testing-library/react";

const { state } = vi.hoisted(() => ({
  state: { inView: false, webgl: true, reduce: false, theme: "dark" },
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useInView: () => state.inView, useReducedMotion: () => state.reduce };
});
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: state.theme }) }));
vi.mock("@/lib/webgl", () => ({ hasWebGL: () => state.webgl }));
vi.mock("./globe-scene", () => ({
  default: (props: { autoRotate: boolean; colors: { marker: string } }) => (
    <div
      data-testid="scene"
      data-rotate={String(props.autoRotate)}
      data-marker={props.colors.marker}
    />
  ),
}));

import { GlobeCanvas } from "./globe-canvas";
import { globeColors, globeConfig } from "@/config/globe";

describe("GlobeCanvas", () => {
  beforeEach(() => {
    state.inView = false;
    state.webgl = true;
    state.reduce = false;
    state.theme = "dark";
  });

  it("does not load the scene until it is near the viewport", () => {
    render(<GlobeCanvas locations={globeConfig.locations} />);
    expect(screen.getByRole("img", { name: /globe/i })).toBeInTheDocument();
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
  });

  it("loads the scene once it is near the viewport", async () => {
    state.inView = true;
    render(<GlobeCanvas locations={globeConfig.locations} />);
    expect(await screen.findByTestId("scene")).toBeInTheDocument();
  });

  it("passes the light theme colors and stops auto-rotation for reduced motion", async () => {
    state.inView = true;
    state.theme = "light";
    state.reduce = true;
    render(<GlobeCanvas locations={globeConfig.locations} />);
    const scene = await screen.findByTestId("scene");
    expect(scene).toHaveAttribute("data-marker", globeColors.light.marker);
    expect(scene).toHaveAttribute("data-rotate", "false");
  });

  it("shows a fallback and never loads the scene when WebGL is unavailable", () => {
    state.inView = true;
    state.webgl = false;
    render(<GlobeCanvas locations={globeConfig.locations} />);
    expect(screen.getByText(/unavailable/i)).toBeInTheDocument();
    expect(screen.queryByTestId("scene")).not.toBeInTheDocument();
  });
});
