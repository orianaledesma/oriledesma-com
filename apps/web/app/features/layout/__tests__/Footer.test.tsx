import { screen, within } from "@testing-library/react";
import { LocaleProvider } from "~/i18n";
import { axe } from "../../../../test/axe";
import { renderWithRouter } from "../../../../test/render";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("links to every section of the site and to the contact email", () => {
    renderWithRouter(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Pie de página" });
    expect(within(nav).getAllByRole("link")).toHaveLength(8);
    expect(screen.getByRole("link", { name: "oriledesmaia@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:oriledesmaia@gmail.com",
    );
  });

  it("renders the newsletter slot", () => {
    renderWithRouter(<Footer newsletter={<form aria-label="Newsletter" />} />);
    expect(screen.getByRole("form", { name: "Newsletter" })).toBeInTheDocument();
  });

  it("speaks English under the English locale", () => {
    renderWithRouter(
      <LocaleProvider locale="en">
        <Footer />
      </LocaleProvider>,
    );
    expect(screen.getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    expect(screen.getByText("I test it, you apply it.")).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
