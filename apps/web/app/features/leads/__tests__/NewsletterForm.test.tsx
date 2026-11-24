import { API_ROUTES } from "@oriledesma/schemas";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { axe } from "../../../../test/axe";
import { api, server } from "../../../../test/msw";
import { renderWithRouter } from "../../../../test/render";
import { NewsletterForm } from "../NewsletterForm";

const setup = () => {
  const user = userEvent.setup();
  renderWithRouter(<NewsletterForm source="footer" />);
  return { user, email: screen.getByLabelText("Tu email") };
};

describe("NewsletterForm", () => {
  it("validates before sending and clears the error while typing", async () => {
    const { user, email } = setup();

    await user.type(email, "no-es-email");
    await user.click(screen.getByRole("button", { name: "Sumarme" }));

    expect(screen.getByText("Revisá el email: parece que le falta algo.")).toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveFocus();

    await user.type(email, "x");
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("subscribes, confirms and locks the form", async () => {
    let body: unknown;
    server.use(
      http.post(api(API_ROUTES.newsletter), async ({ request }) => {
        body = await request.json();
        return HttpResponse.json({ ok: true }, { status: 201 });
      }),
    );
    const { user, email } = setup();

    await user.type(email, "Ana@Example.com");
    await user.click(screen.getByRole("button", { name: "Sumarme" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Te sumaste a la newsletter");
    expect(body).toEqual({ email: "ana@example.com", source: "footer" });
    expect(email).toBeDisabled();
  });

  it("explains a rate limit", async () => {
    server.use(
      http.post(api(API_ROUTES.newsletter), () =>
        HttpResponse.json({ error: { code: "rate_limited", message: "" } }, { status: 429 }),
      ),
    );
    const { user, email } = setup();

    await user.type(email, "ana@example.com");
    await user.click(screen.getByRole("button", { name: "Sumarme" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Esperá un minuto");
    expect(email).toBeEnabled();
  });

  it("explains a network failure", async () => {
    server.use(http.post(api(API_ROUTES.newsletter), () => HttpResponse.error()));
    const { user, email } = setup();

    await user.type(email, "ana@example.com");
    await user.click(screen.getByRole("button", { name: "Sumarme" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Revisá tu conexión");
  });

  it("has no detectable a11y violations", async () => {
    setup();
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
