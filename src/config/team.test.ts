import { teamConfig } from "./team";

describe("team config", () => {
  it("defines a valid heading and section description", () => {
    expect(teamConfig.label).toBeTruthy();
    expect(teamConfig.heading.lead).toBeTruthy();
    expect(teamConfig.heading.accent).toBeTruthy();
    expect(teamConfig.description).toBeTruthy();
  });

  it("contains at least 3 team members", () => {
    expect(teamConfig.members.length).toBeGreaterThanOrEqual(3);
  });

  it("has unique member IDs and indices", () => {
    const ids = teamConfig.members.map((m) => m.id);
    const indices = teamConfig.members.map((m) => m.index);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(indices).size).toBe(indices.length);
  });

  it("has unique member names", () => {
    const names = teamConfig.members.map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has valid photo paths starting with /images/team/", () => {
    for (const member of teamConfig.members) {
      expect(member.photo).toMatch(/^\/images\/team\/[a-z0-9_-]+\.(jpg|jpeg|png|webp)$/i);
    }
  });

  it("has valid tags, roles and bio content for every member", () => {
    for (const member of teamConfig.members) {
      expect(member.tags.length).toBeGreaterThanOrEqual(2);
      expect(member.bio.length).toBeGreaterThanOrEqual(1);
      expect(member.category).toBeTruthy();
      expect(member.tabTitle).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.badgeType).toBeTruthy();
      expect(member.subroles).toBeTruthy();
    }
  });

  it("has unique URL slugs and valid meeting URLs for every member", () => {
    const slugs = teamConfig.members.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const member of teamConfig.members) {
      expect(member.slug).toMatch(/^[a-z0-9-]+$/);
      expect(member.meetingUrl).toMatch(/^https:\/\/zcal\.co\/zerolatency\/[a-z0-9-]+$/);
      expect(member.primaryCta.href).toBe(`/team/${member.slug}`);
      expect(member.secondaryCta.href).toBe(member.meetingUrl);
      expect(member.secondaryCta.isExternal).toBe(true);
    }
  });

  it("has comprehensive client-ready resume data for every member", () => {
    for (const member of teamConfig.members) {
      const { resume } = member;
      expect(resume.headline).toBeTruthy();
      expect(resume.location).toBeTruthy();
      expect(resume.experienceYears).toBeGreaterThan(0);
      expect(resume.availability).toBeTruthy();
      expect(resume.summary.length).toBeGreaterThan(50);
      expect(resume.metrics.length).toBeGreaterThanOrEqual(3);
      expect(resume.competencies.length).toBeGreaterThanOrEqual(2);
      expect(resume.experience.length).toBeGreaterThanOrEqual(2);
      expect(resume.education.length).toBeGreaterThanOrEqual(1);
      expect(resume.certifications.length).toBeGreaterThanOrEqual(1);
    }
  });
});
