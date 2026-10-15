import { render, screen } from "@testing-library/react";
import TeamMemberPage, { generateMetadata, generateStaticParams } from "./page";
import { teamConfig } from "@/config/team";

const notFoundMock = vi.fn();
vi.mock("next/navigation", () => ({
  notFound: () => {
    notFoundMock();
    throw new Error("NEXT_NOT_FOUND");
  },
}));

describe("TeamMemberPage (/team/[slug])", () => {
  const founder = teamConfig.members[0];

  it("generates static params for all team members", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(teamConfig.members.length);
    for (const member of teamConfig.members) {
      expect(params).toContainEqual({ slug: member.slug });
    }
  });

  it("generates metadata with member name and role", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: founder.slug }) });
    expect(meta.title).toContain(founder.name);
    expect(meta.description).toBe(founder.resume.headline);
  });

  it("renders the resume page with header, metrics, competencies and booking link", async () => {
    const PageComponent = await TeamMemberPage({ params: Promise.resolve({ slug: founder.slug }) });
    render(PageComponent);

    // Name and role
    expect(screen.getByRole("heading", { level: 1, name: founder.name })).toBeInTheDocument();
    expect(screen.getAllByText(founder.role).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(founder.resume.headline)).toBeInTheDocument();

    // Metrics
    for (const metric of founder.resume.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }

    // Meeting link
    const bookingLinks = screen.getAllByRole("link", {
      name: new RegExp("Book Consultation|Open Calendar", "i"),
    });
    expect(bookingLinks.length).toBeGreaterThan(0);
    expect(bookingLinks[0]).toHaveAttribute("href", founder.meetingUrl);
    expect(bookingLinks[0]).toHaveAttribute("target", "_blank");
  });

  it("triggers notFound() when an invalid slug is supplied", async () => {
    await expect(
      TeamMemberPage({ params: Promise.resolve({ slug: "non-existent-member" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFoundMock).toHaveBeenCalled();
  });
});
