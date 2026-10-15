import { render, screen } from "@testing-library/react";

vi.mock("@/lib/gsap", () => ({ gsap: {}, ScrollTrigger: {}, useGSAP: () => {} }));

import { Speed } from "./speed";
import { speedConfig } from "@/config/story";
import { speedup, toPercent } from "@/lib/metrics";

describe("Speed", () => {
  it("renders the numbered label, the heading and the #speed anchor", () => {
    const { container } = render(<Speed />);
    expect(screen.getByText("05 / Delivery Speed")).toBeInTheDocument();
    const { lead, accent } = speedConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
    expect(container.querySelector("#speed")).not.toBeNull();
  });

  it("renders each row with its final total available to screen readers", () => {
    render(<Speed />);
    for (const row of speedConfig.rows) {
      expect(screen.getByText(row.label)).toBeInTheDocument();
      expect(screen.getByText(`${row.days} days`)).toBeInTheDocument();
    }
  });

  it("sizes each phase segment as a share of its row", () => {
    const { container } = render(<Speed />);
    for (const row of speedConfig.rows) {
      const segments = container.querySelectorAll<HTMLElement>(
        `[data-row="${row.label}"] [data-segment]`,
      );
      expect(segments).toHaveLength(row.phases.length);
      row.phases.forEach((p, i) => {
        expect(segments[i]).toHaveStyle({ width: `${toPercent(p.days, row.days)}%` });
      });
    }
  });

  it("shows the speed-up factor between the two rows", () => {
    render(<Speed />);
    const typical = speedConfig.rows.find((r) => !r.highlight)!;
    const ours = speedConfig.rows.find((r) => r.highlight)!;
    expect(screen.getByText(`${speedup(typical.days, ours.days)}×`)).toBeInTheDocument();
  });
});
