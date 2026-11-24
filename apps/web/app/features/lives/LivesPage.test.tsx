import { screen, within } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { LivesPage } from "./LivesPage";

describe("LivesPage", () => {
  it("lists upcoming lives with their kind", () => {
    renderWithRouter(<LivesPage />);
    const agenda = screen.getByRole("region", { name: "Próximos vivos" });
    expect(within(agenda).getAllByRole("listitem")).toHaveLength(3);
    expect(within(agenda).getByText("Consultoría")).toBeInTheDocument();
  });

  it("includes the application form", () => {
    renderWithRouter(<LivesPage />);
    expect(screen.getByRole("form", { name: "Postulá tu negocio" })).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<LivesPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
