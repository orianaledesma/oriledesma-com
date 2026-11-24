import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../../../../test/axe";
import { renderWithRouter } from "../../../../test/render";
import { Header } from "../Header";

describe("Header", () => {
  it("opens the menu, focuses the first link and closes it with Escape", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    const button = screen.getByRole("button", { name: "Menú" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Curso" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("closes the menu after navigating", async () => {
    const user = userEvent.setup();
    renderWithRouter(<Header />);

    await user.click(screen.getByRole("button", { name: "Menú" }));
    await user.click(screen.getByRole("link", { name: "Talleres" }));

    expect(screen.getByRole("button", { name: "Menú" })).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the current page", () => {
    renderWithRouter(<Header />, { route: "/vivos" });
    expect(screen.getByRole("link", { name: "Vivos" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Curso" })).not.toHaveAttribute("aria-current");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<Header />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
