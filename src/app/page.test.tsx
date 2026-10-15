import { render } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({ gsap: {}, ScrollTrigger: {}, useGSAP: () => {} }));

import Home from "./page";
import { siteConfig } from "@/config/site";

it("has an anchor target for every nav link", () => {
  const { container } = render(<Home />);
  for (const l of siteConfig.nav) {
    expect(container.querySelector(l.href)).not.toBeNull();
  }
});
