import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("introduces Ori and links to the course and email", () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Hola, soy Ori" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver el curso" })).toHaveAttribute("href", "/curso");
    expect(screen.getByRole("link", { name: "Escribime" })).toHaveAttribute(
      "href",
      "mailto:oriledesmaia@gmail.com",
    );
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<AboutPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
