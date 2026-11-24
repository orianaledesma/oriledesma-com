import { API_ROUTES } from "@oriledesma/schemas";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { axe } from "../../../../test/axe";
import { api, server } from "../../../../test/msw";
import { renderWithRouter } from "../../../../test/render";
import { GuideForm } from "../GuideForm";
import { ImplementationForm } from "../ImplementationForm";
import { LiveApplicationForm } from "../LiveApplicationForm";

describe("GuideForm", () => {
  it("asks for the name first", async () => {
    const user = userEvent.setup();
    renderWithRouter(<GuideForm source="home" />);

    await user.click(screen.getByRole("button", { name: "Quiero la guía" }));

    expect(screen.getByLabelText("Tu nombre")).toHaveFocus();
    expect(screen.getByLabelText("Tu nombre")).toHaveAccessibleDescription("Completá este campo.");
  });
});

describe("ImplementationForm", () => {
  it("speaks English on the English page and sends the locale", async () => {
    let body: Record<string, unknown> = {};
    server.use(
      http.post(api(API_ROUTES.implementation), async ({ request }) => {
        body = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({ ok: true }, { status: 201 });
      }),
    );
    const user = userEvent.setup();
    renderWithRouter(<ImplementationForm />, { locale: "en" });

    await user.type(screen.getByLabelText("Your name"), "Ana");
    await user.type(screen.getByLabelText("Your email"), "ana@example.com");
    await user.type(screen.getByLabelText("Which process do you want to solve?"), "Orders");
    await user.type(screen.getByLabelText("Which tools do you use today?"), "Shopify");
    await user.selectOptions(screen.getByLabelText("When do you need it?"), "This month");
    await user.click(screen.getByRole("button", { name: "Send" }));

    expect(await screen.findByRole("status")).toHaveTextContent("I got your message");
    expect(body).toMatchObject({ cuando: "this-month", locale: "en" });
  });
});

describe("LiveApplicationForm", () => {
  it("shows field errors coming back from the API", async () => {
    server.use(
      http.post(api(API_ROUTES.liveApplications), () =>
        HttpResponse.json(
          {
            error: {
              code: "validation_error",
              message: "Invalid request body",
              fields: { web: "too_long" },
            },
          },
          { status: 422 },
        ),
      ),
    );
    const user = userEvent.setup();
    renderWithRouter(<LiveApplicationForm />);

    await user.type(screen.getByLabelText("Tu nombre"), "Ana");
    await user.type(screen.getByLabelText("Tu email"), "ana@example.com");
    await user.type(screen.getByLabelText("Nombre del negocio"), "Heladería Ana");
    await user.selectOptions(screen.getByLabelText("Rubro"), "Gastronomía");
    await user.type(screen.getByLabelText("Web o Instagram"), "@heladeria");
    await user.type(screen.getByLabelText("País"), "Argentina");
    await user.type(screen.getByLabelText(/qué proceso te quita/i), "Pedidos");
    await user.click(screen.getByRole("button", { name: "Enviar postulación" }));

    expect(await screen.findByText("Es demasiado largo. Resumilo un poco.")).toBeInTheDocument();
    expect(screen.getByLabelText("Web o Instagram")).toHaveAttribute("aria-invalid", "true");
  });

  it("has no detectable a11y violations", async () => {
    const { container } = renderWithRouter(<LiveApplicationForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
