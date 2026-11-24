import { render, screen } from "@testing-library/react";
import { axe } from "../../test/axe";
import Home from "./home";

describe("Home", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("has no detectable a11y violations", async () => {
    const { container } = render(<Home />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
