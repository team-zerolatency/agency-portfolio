import { hasWebGL, resetWebGLCache } from "./webgl";

describe("hasWebGL", () => {
  beforeEach(() => resetWebGLCache());
  afterEach(() => vi.restoreAllMocks());

  it("is true when a context can be created", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({} as never);
    expect(hasWebGL()).toBe(true);
  });

  it("is false when no context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    expect(hasWebGL()).toBe(false);
  });

  it("is false when creating a context throws", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(hasWebGL()).toBe(false);
  });

  it("only probes the browser once", () => {
    const spy = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({} as never);
    hasWebGL();
    hasWebGL();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
