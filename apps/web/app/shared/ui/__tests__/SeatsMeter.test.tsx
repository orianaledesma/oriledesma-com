import { render, screen } from "@testing-library/react";
import { SeatsMeter } from "../SeatsMeter";

describe("SeatsMeter", () => {
  it("exposes remaining seats as an accessible progressbar", () => {
    render(
      <SeatsMeter
        total={20}
        remaining={12}
        label="Quedan 12 de 20 lugares"
        ariaLabel="Lugares disponibles"
      />,
    );
    const bar = screen.getByRole("progressbar", { name: "Lugares disponibles" });
    expect(bar).toHaveAttribute("aria-valuenow", "12");
    expect(bar).toHaveAttribute("aria-valuemax", "20");
    expect(bar).toHaveAttribute("aria-valuetext", "Quedan 12 de 20 lugares");
    expect(screen.getByText("Quedan 12 de 20 lugares")).toBeInTheDocument();
  });
});
