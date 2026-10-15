import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnnouncementBar } from "./announcement-bar";

const props = {
  id: "test-1",
  message: "Now booking projects.",
  cta: { label: "Book a call", href: "#contact" },
};

describe("AnnouncementBar", () => {
  beforeEach(() => localStorage.clear());

  it("shows the message and a link to the call to action", () => {
    render(<AnnouncementBar {...props} />);
    expect(screen.getByText(props.message)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "#contact");
  });

  it("hides when dismissed and remembers the choice", async () => {
    render(<AnnouncementBar {...props} />);
    await userEvent.click(screen.getByRole("button", { name: /dismiss announcement/i }));
    expect(screen.queryByText(props.message)).not.toBeInTheDocument();
    expect(localStorage.getItem("announcement:test-1")).toBe("1");
  });

  it("stays hidden when it was dismissed on a previous visit", () => {
    localStorage.setItem("announcement:test-1", "1");
    render(<AnnouncementBar {...props} />);
    expect(screen.queryByText(props.message)).not.toBeInTheDocument();
  });

  it("shows again when the announcement id changes", () => {
    localStorage.setItem("announcement:test-1", "1");
    render(<AnnouncementBar {...props} id="test-2" message="A new announcement." />);
    expect(screen.getByText("A new announcement.")).toBeInTheDocument();
  });
});
