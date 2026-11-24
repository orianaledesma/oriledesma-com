import { screen } from "@testing-library/react";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { ImplementationPage } from "./ImplementationPage";

describe("ImplementationPage", () => {
  it("renders in Spanish and links to the English version", () => {
    renderWithRouter(<ImplementationPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Un sistema con IA a medida",
    );
    const link = screen.getByRole("link", { name: "See this page in English" });
    expect(link).toHaveAttribute("href", "/en/implementation");
    expect(link).toHaveAttribute("lang", "en");
  });

  it("renders in English and links back to Spanish", () => {
    renderWithRouter(<ImplementationPage />, { locale: "en", route: "/en/implementation" });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A custom AI system");
    expect(screen.getByRole("link", { name: "Ver esta página en español" })).toHaveAttribute(
      "href",
      "/implementacion",
    );
    expect(screen.getByRole("form", { name: "Tell me about your business" })).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<ImplementationPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
