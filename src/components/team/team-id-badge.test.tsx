import { render, screen } from "@testing-library/react";
import { TeamIdBadge } from "./team-id-badge";
import { teamConfig } from "@/config/team";

describe("TeamIdBadge", () => {
  const member = teamConfig.members[0];

  it("renders the agency brand name and badge type", () => {
    render(<TeamIdBadge member={member} />);
    expect(screen.getByText("ZEROLATENCY")).toBeInTheDocument();
    expect(screen.getByText(member.badgeType)).toBeInTheDocument();
  });

  it("renders the member photo with proper alt text", () => {
    render(<TeamIdBadge member={member} />);
    const img = screen.getByRole("img", { name: member.name });
    expect(img).toBeInTheDocument();
  });

  it("renders the member name, role, subroles and ID", () => {
    render(<TeamIdBadge member={member} />);
    expect(screen.getByRole("heading", { level: 4, name: member.name })).toBeInTheDocument();
    expect(screen.getByText(member.role)).toBeInTheDocument();
    expect(screen.getByText(member.subroles)).toBeInTheDocument();
    expect(screen.getByText(member.id)).toBeInTheDocument();
  });
});
