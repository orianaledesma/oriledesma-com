import { screen, within } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { LinksPage } from "./LinksPage";

describe("LinksPage", () => {
  it("lists the main links with the course first", () => {
    renderWithRouter(<LinksPage />);
    const links = within(
      screen.getByRole("navigation", { name: "Links principales" }),
    ).getAllByRole("link");
    expect(links).toHaveLength(6);
    expect(links[0]).toHaveAttribute("href", "/curso");
  });

  it("opens YouTube in a new tab but not the email", () => {
    renderWithRouter(<LinksPage />);
    expect(screen.getByRole("link", { name: "Último video en YouTube" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "Contacto" })).not.toHaveAttribute("target");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<LinksPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
