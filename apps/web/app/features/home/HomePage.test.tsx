import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("leads with the brand promise", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Lo que la IA puede hacer por tu negocio, probado primero en el mío.",
    );
  });

  it("names every section by its heading", () => {
    renderWithRouter(<HomePage />);
    const regions = screen.getAllByRole("region").map((r) => r.getAttribute("aria-labelledby"));
    expect(regions).toHaveLength(12);
    for (const id of regions) expect(document.getElementById(id ?? "")).not.toBeNull();
  });

  it("links each workshop card to its anchor", () => {
    renderWithRouter(<HomePage />);
    expect(
      screen.getByRole("link", { name: "Ver taller: Automatizá un proceso de tu negocio" }),
    ).toHaveAttribute("href", "/talleres#automatiza");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<HomePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
