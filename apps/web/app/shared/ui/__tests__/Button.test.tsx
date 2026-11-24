import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/render";
import { Button } from "../Button";

describe("Button", () => {
  it("renders a router link for internal hrefs", () => {
    renderWithRouter(<Button href="/curso">Ver el curso</Button>);
    const link = screen.getByRole("link", { name: "Ver el curso" });
    expect(link).toHaveAttribute("href", "/curso");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens external links in a new tab without leaking the opener", () => {
    renderWithRouter(<Button href="https://www.youtube.com/@OriledesmaIA">Ir al canal</Button>);
    const link = screen.getByRole("link", { name: "Ir al canal" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("keeps mailto links in the same tab", () => {
    renderWithRouter(<Button href="mailto:hola@example.com">Escribime</Button>);
    expect(screen.getByRole("link", { name: "Escribime" })).not.toHaveAttribute("target");
  });

  it("renders a non-submitting button by default", () => {
    renderWithRouter(<Button>Abrir</Button>);
    expect(screen.getByRole("button", { name: "Abrir" })).toHaveAttribute("type", "button");
  });

  it("can be a submit button", () => {
    renderWithRouter(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toHaveAttribute("type", "submit");
  });
});
