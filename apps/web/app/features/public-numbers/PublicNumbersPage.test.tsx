import { screen, within } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { PublicNumbersPage } from "./PublicNumbersPage";

describe("PublicNumbersPage", () => {
  it("shows the four revenue milestones in order", () => {
    renderWithRouter(<PublicNumbersPage />);
    const timeline = screen.getByRole("region", { name: "De la primera venta a €5.000 por mes" });
    const titles = within(timeline)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual([
      "Primera venta",
      "€1.000 acumulados",
      "€1.000 por mes",
      "€5.000 por mes",
    ]);
  });

  it("renders the hours table with row headers and a total", () => {
    renderWithRouter(<PublicNumbersPage />);
    const table = screen.getByRole("table", { name: "Tabla de ejemplo · placeholder" });
    expect(within(table).getAllByRole("rowheader")).toHaveLength(8);
    expect(within(table).getByRole("rowheader", { name: "Total" })).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<PublicNumbersPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
