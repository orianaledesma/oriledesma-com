import { API_ROUTES } from "@oriledesma/schemas";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { api, server } from "../../../../test/msw";
import { renderWithRouter } from "../../../../test/render";
import { CourseSeatsMeter } from "../CourseSeatsMeter";

describe("CourseSeatsMeter", () => {
  it("starts from the configured seats and updates from the API", async () => {
    renderWithRouter(<CourseSeatsMeter />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "20");

    expect(await screen.findByText("Quedan 12 de 20 lugares")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "12");
  });

  it("flags simulated numbers", async () => {
    server.use(
      http.get(api(API_ROUTES.courseSeats), () =>
        HttpResponse.json({ total: 20, sold: 0, simulated: true }),
      ),
    );
    renderWithRouter(<CourseSeatsMeter />);
    expect(
      await screen.findByText("Quedan 20 de 20 lugares (contador simulado)"),
    ).toBeInTheDocument();
  });
});
