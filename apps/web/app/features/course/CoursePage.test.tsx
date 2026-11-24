import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { CoursePage } from "./CoursePage";

describe("CoursePage", () => {
  it("lists the seven stages in order", () => {
    renderWithRouter(<CoursePage />);
    const stages = screen.getAllByRole("heading", { level: 3 }).slice(0, 7);
    expect(stages[0]).toHaveTextContent("Identidad y promesa");
    expect(stages[6]).toHaveTextContent("Sistema y automatización");
  });

  it("says plainly that the checkout is simulated", () => {
    renderWithRouter(<CoursePage />);
    expect(screen.getByRole("link", { name: "Comprar el curso" })).toHaveAccessibleDescription(
      /Botón de pago simulado/,
    );
  });

  it("shows the live seat count", async () => {
    renderWithRouter(<CoursePage />);
    expect(await screen.findByText("Quedan 12 de 20 lugares")).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<CoursePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
