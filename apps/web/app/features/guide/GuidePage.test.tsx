import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { GuidePage } from "./GuidePage";

describe("GuidePage", () => {
  it("lists the seven days and the signup form", () => {
    renderWithRouter(<GuidePage />);
    expect(screen.getAllByText(/^Día \d$/)).toHaveLength(7);
    expect(screen.getByRole("form", { name: "Pedir la guía gratis" })).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<GuidePage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
