import { render, screen } from "@testing-library/react";
import { ContactSection } from "./contact-section";
import { contactConfig } from "@/config/contact";

describe("ContactSection", () => {
  it("renders the numbered label, the heading and the #contact anchor", () => {
    const { container } = render(<ContactSection />);
    expect(screen.getByText("07 / Contact")).toBeInTheDocument();
    const { lead, accent } = contactConfig.heading;
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${lead} ${accent}`);
    expect(container.querySelector("#contact")).not.toBeNull();
  });

  it("includes the contact form", () => {
    render(<ContactSection />);
    expect(
      screen.getByRole("button", { name: contactConfig.form.submitLabel }),
    ).toBeInTheDocument();
  });

  it("renders the direct contact channels, with the email as a mailto link", () => {
    render(<ContactSection />);
    const email = contactConfig.channels.find((c) => c.icon === "mail")!;
    expect(screen.getByRole("link", { name: email.value })).toHaveAttribute("href", email.href);
    for (const c of contactConfig.channels) {
      expect(screen.getByText(c.value)).toBeInTheDocument();
    }
  });

  it("renders the team lead card", () => {
    render(<ContactSection />);
    expect(screen.getByText(contactConfig.lead.name)).toBeInTheDocument();
    expect(screen.getByText(contactConfig.lead.id)).toBeInTheDocument();
  });
});
