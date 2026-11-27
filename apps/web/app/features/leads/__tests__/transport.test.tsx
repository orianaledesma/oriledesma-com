import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { afterEach, beforeEach, vi } from "vitest";
import { CourseSeatsMeter } from "~/features/course/CourseSeatsMeter";
import { server } from "../../../../test/msw";
import { renderWithRouter } from "../../../../test/render";
import { NewsletterForm } from "../NewsletterForm";
import { submitLead } from "../transport";

const ML_URL = "https://assets.mailerlite.com/jsonp/111/forms/:formId/subscribe";

/** Modo MVP: sin API, con los IDs de MailerLite configurados. */
const useMailerLiteMode = () => {
  vi.stubEnv("VITE_API_URL", "");
  vi.stubEnv("VITE_MAILERLITE_ACCOUNT_ID", "111");
  vi.stubEnv("VITE_MAILERLITE_FORM_NEWSLETTER", "201");
  vi.stubEnv("VITE_MAILERLITE_FORM_IMPLEMENTATION", "203");
};

const captureMailerLite = () => {
  const calls: { formId: string; fields: Record<string, string> }[] = [];
  server.use(
    http.post(ML_URL, async ({ request, params }) => {
      const body = new URLSearchParams(await request.text());
      const fields: Record<string, string> = {};
      body.forEach((value, key) => {
        const match = /^fields\[(.+)\]$/.exec(key);
        if (match?.[1]) fields[match[1]] = value;
      });
      calls.push({ formId: String(params.formId), fields });
      return HttpResponse.json({ success: true });
    }),
  );
  return calls;
};

describe("lead transport without a backend", () => {
  beforeEach(useMailerLiteMode);
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("sends an inquiry to its own MailerLite form with custom fields", async () => {
    const calls = captureMailerLite();
    await submitLead("implementation", {
      nombre: "Ana",
      email: "ana@example.com",
      proceso: "Pedidos de WhatsApp",
      herramientas: "WhatsApp",
      cuando: "asap",
      locale: "es",
    });
    expect(calls).toEqual([
      {
        formId: "203",
        fields: {
          email: "ana@example.com",
          name: "Ana",
          proceso: "Pedidos de WhatsApp",
          herramientas: "WhatsApp",
          cuando: "asap",
          idioma: "es",
        },
      },
    ]);
  });

  it("treats a MailerLite rejection as a failure", async () => {
    server.use(http.post(ML_URL, () => HttpResponse.json({ success: false, errors: {} })));
    await expect(
      submitLead("newsletter", { email: "a@b.co", source: "footer" }),
    ).rejects.toMatchObject({ failure: { kind: "server" } });
  });

  it("fails loudly when a form id is missing", async () => {
    await expect(
      submitLead("guide", { nombre: "Ana", email: "a@b.co", source: "home" }),
    ).rejects.toThrow(/VITE_MAILERLITE_FORM_GUIDE/);
  });

  it("subscribes from the footer form end to end", async () => {
    const calls = captureMailerLite();
    const user = userEvent.setup();
    renderWithRouter(<NewsletterForm source="footer" />);

    await user.type(screen.getByLabelText("Tu email"), "ana@example.com");
    await user.click(screen.getByRole("button", { name: "Sumarme" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Te sumaste a la newsletter");
    expect(calls[0]).toEqual({
      formId: "201",
      fields: { email: "ana@example.com", origen: "footer" },
    });
  });

  it("shows seats from the site config without calling any API", () => {
    // Una request no mockeada haría fallar el test (onUnhandledFrame: "error").
    renderWithRouter(<CourseSeatsMeter />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuetext",
      "Quedan 20 de 20 lugares",
    );
  });
});
