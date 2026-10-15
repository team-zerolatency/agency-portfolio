import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { setTheme, state } = vi.hoisted(() => ({ setTheme: vi.fn(), state: { theme: "dark" } }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: state.theme, setTheme }),
}));

import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => setTheme.mockClear());

  it("switches dark to light", async () => {
    state.theme = "dark";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });

  it("switches light to dark", async () => {
    state.theme = "light";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
