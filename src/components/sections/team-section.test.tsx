import { render, screen, fireEvent } from "@testing-library/react";
import { TeamSection } from "./team-section";
import { teamConfig } from "@/config/team";

describe("TeamSection", () => {
  it("renders the numbered label, heading and section anchor #team", () => {
    const { container } = render(<TeamSection />);
    expect(screen.getByText("07 / Core Team")).toBeInTheDocument();
    const { lead, accent } = teamConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
    expect(container.querySelector("#team")).not.toBeNull();
  });

  it("renders a tab button for every team member", () => {
    render(<TeamSection />);
    for (const member of teamConfig.members) {
      const buttons = screen.getAllByRole("button", { name: new RegExp(member.tabTitle, "i") });
      expect(buttons.length).toBeGreaterThan(0);
    }
  });

  it("renders the founder by default with his name, tags and CTAs", () => {
    render(<TeamSection />);
    const founder = teamConfig.members[0];
    expect(screen.getByRole("heading", { level: 3, name: founder.name })).toBeInTheDocument();
    for (const tag of founder.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
    expect(screen.getByText(founder.id)).toBeInTheDocument();
    const primaryLink = screen.getByRole("link", {
      name: new RegExp(founder.primaryCta.label, "i"),
    });
    expect(primaryLink).toHaveAttribute("href", `/team/${founder.slug}`);

    const meetingLink = screen.getByRole("link", {
      name: new RegExp(founder.secondaryCta.label, "i"),
    });
    expect(meetingLink).toHaveAttribute("href", founder.meetingUrl);
    expect(meetingLink).toHaveAttribute("target", "_blank");
  });

  it("switches to another member when clicking their tab", async () => {
    render(<TeamSection />);
    const secondMember = teamConfig.members[1];
    const buttons = screen.getAllByRole("button", { name: new RegExp(secondMember.tabTitle, "i") });
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);

    expect(
      await screen.findByRole("heading", { level: 3, name: secondMember.name }),
    ).toBeInTheDocument();
    expect(await screen.findByText(secondMember.id)).toBeInTheDocument();
  });
});
