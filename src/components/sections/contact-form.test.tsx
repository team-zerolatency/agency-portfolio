import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./contact-form";
import { contactConfig } from "@/config/contact";

const fetchMock = vi.fn<typeof fetch>();

async function fillValid() {
  await userEvent.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
  await userEvent.selectOptions(screen.getByLabelText("Project type"), "Web app");
  await userEvent.type(screen.getByLabelText("Message"), "We need a customer portal built.");
}

const submit = () =>
  userEvent.click(screen.getByRole("button", { name: contactConfig.form.submitLabel }));

describe("ContactForm", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows validation errors and does not call the API for an empty form", async () => {
    render(<ContactForm />);
    await submit();
    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("clears a field's error as soon as the user edits it", async () => {
    render(<ContactForm />);
    await submit();
    await userEvent.type(screen.getByLabelText("Name"), "A");
    expect(screen.queryByText("Please enter your name.")).not.toBeInTheDocument();
  });

  it("submits valid data to the API and shows the success message", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    render(<ContactForm />);
    await fillValid();
    await submit();

    expect(await screen.findByRole("status")).toHaveTextContent(contactConfig.form.successTitle);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(init?.body as string)).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      projectType: "Web app",
      website: "",
    });
  });

  it("shows field errors returned by the server", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: false, errors: { email: "That email looks wrong." } }), {
        status: 422,
      }),
    );
    render(<ContactForm />);
    await fillValid();
    await submit();
    expect(await screen.findByText("That email looks wrong.")).toBeInTheDocument();
  });

  it("shows a generic error when the server fails, and keeps the form", async () => {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 502 }));
    render(<ContactForm />);
    await fillValid();
    await submit();
    expect(await screen.findByRole("alert")).toHaveTextContent(contactConfig.form.errorText);
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
  });

  it("shows a generic error when the network request throws", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    render(<ContactForm />);
    await fillValid();
    await submit();
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("keeps the honeypot out of the tab order", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector<HTMLInputElement>('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});
