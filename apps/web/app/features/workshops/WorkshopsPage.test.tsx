import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { WorkshopsPage } from "./WorkshopsPage";

describe("WorkshopsPage", () => {
  it("renders each workshop as an anchor target named by its title", () => {
    renderWithRouter(<WorkshopsPage />);
    const card = screen.getByRole("article", { name: "Automatizá un proceso de tu negocio" });
    expect(card).toHaveAttribute("id", "automatiza");
  });

  it("prefills the email subject for each workshop", () => {
    renderWithRouter(<WorkshopsPage />);
    expect(
      screen.getByRole("link", { name: "Consultar por el taller Las redes de tu negocio con IA" }),
    ).toHaveAttribute(
      "href",
      "mailto:oriledesmaia@gmail.com?subject=Taller%3A%20Las%20redes%20de%20tu%20negocio%20con%20IA",
    );
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<WorkshopsPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
