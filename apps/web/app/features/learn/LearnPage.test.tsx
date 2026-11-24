import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "../../../test/axe";
import { renderWithRouter } from "../../../test/render";
import { LearnPage } from "./LearnPage";

const cards = () =>
  within(screen.getByRole("region", { name: "Contenido filtrable" })).queryAllByRole("heading", {
    level: 3,
  });

describe("LearnPage", () => {
  it("shows every piece by default", () => {
    renderWithRouter(<LearnPage />, { route: "/aprende" });
    expect(screen.getByText("7 piezas")).toBeInTheDocument();
    expect(cards()).toHaveLength(7);
  });

  it("filters by pillar and level and announces the count", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LearnPage />, { route: "/aprende" });

    await user.click(screen.getByRole("button", { name: "IA desde cero · niveles 0-1" }));
    expect(screen.getByText("3 piezas")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "1 · La uso un poco" }));
    expect(screen.getByText("2 piezas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1 · La uso un poco" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("restores filters from a shared link", () => {
    renderWithRouter(<LearnPage />, { route: "/aprende?numeros=si" });
    expect(screen.getByText("1 pieza")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Solo casos con números" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("offers a way out of an empty result", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LearnPage />, { route: "/aprende?pilar=desde-cero&nivel=3" });

    expect(screen.getByText("No hay piezas con esos filtros todavía.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ver todo" }));
    expect(screen.getByText("7 piezas")).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<LearnPage />, { route: "/aprende" });
    expect(await axe(container)).toHaveNoViolations();
  });
});
