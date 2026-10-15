import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IO {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

// Component tests run in jsdom. API route tests run in node, which has no `window`.
if (typeof window !== "undefined") {
  // jsdom has no matchMedia / IntersectionObserver; GSAP and lazy-loaded sections need them.
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
  vi.stubGlobal("IntersectionObserver", IO);
}
