import { API_ROUTES } from "@oriledesma/schemas";
import { afterEach, describe, expect, it } from "vitest";
import { IntegrationError } from "../integrations/errors";
import { setup } from "./helpers";

type App = Awaited<ReturnType<typeof setup>>["app"];
let app: App | undefined;
afterEach(async () => {
  await app?.close();
});

describe("POST newsletter", () => {
  it("subscribes a normalized email and answers 201", async () => {
    const ctx = await setup();
    app = ctx.app;
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.newsletter,
      payload: { email: " Ana@Example.com ", source: "footer" },
    });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toEqual({ ok: true });
    expect(ctx.emailList.subscribers).toEqual([
      { email: "ana@example.com", list: "newsletter", source: "footer" },
    ]);
  });

  it("returns field error codes the web can translate", async () => {
    ({ app } = await setup());
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.newsletter,
      payload: { email: "no-es-email", source: "footer" },
    });
    expect(res.statusCode).toBe(422);
    expect(res.json()).toEqual({
      error: {
        code: "validation_error",
        message: "Invalid request body",
        fields: { email: "invalid_email" },
      },
    });
  });

  it("does not duplicate a repeated subscription", async () => {
    const ctx = await setup();
    app = ctx.app;
    const payload = { email: "ana@example.com", source: "footer" };
    await app.inject({ method: "POST", url: API_ROUTES.newsletter, payload });
    await app.inject({ method: "POST", url: API_ROUTES.newsletter, payload });
    expect(ctx.emailList.subscribers).toHaveLength(1);
  });

  it("answers 502 without leaking details when the provider fails", async () => {
    ({ app } = await setup({
      emailList: { subscribe: () => Promise.reject(new IntegrationError("mailerlite", 500)) },
    }));
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.newsletter,
      payload: { email: "ana@example.com", source: "footer" },
    });
    expect(res.statusCode).toBe(502);
    expect(res.json()).toEqual({
      error: { code: "upstream_error", message: "A downstream service failed" },
    });
  });
});

describe("POST guide", () => {
  it("adds the person to the guide list with their name", async () => {
    const ctx = await setup();
    app = ctx.app;
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.guide,
      payload: { nombre: "Ana", email: "ana@example.com", source: "guide-page" },
    });
    expect(res.statusCode).toBe(201);
    expect(ctx.emailList.subscribers[0]).toMatchObject({ list: "guide", name: "Ana" });
  });
});

describe("POST implementation inquiry", () => {
  it("notifies Ori with a reply-to the person", async () => {
    const ctx = await setup();
    app = ctx.app;
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.implementation,
      payload: {
        nombre: "Ana",
        email: "ana@example.com",
        proceso: "Pedidos de WhatsApp",
        herramientas: "WhatsApp",
        cuando: "asap",
        locale: "es",
      },
    });
    expect(res.statusCode).toBe(201);
    expect(ctx.notifier.sent).toHaveLength(1);
    expect(ctx.notifier.sent[0]).toMatchObject({
      subject: "Implementación: Ana",
      replyTo: "ana@example.com",
    });
  });
});

describe("POST live application", () => {
  it("rejects an incomplete application listing every missing field", async () => {
    const ctx = await setup();
    app = ctx.app;
    const res = await app.inject({
      method: "POST",
      url: API_ROUTES.liveApplications,
      payload: { nombre: "Ana" },
    });
    expect(res.statusCode).toBe(422);
    const { fields } = res.json<{ error: { fields: Record<string, string> } }>().error;
    expect(Object.keys(fields).sort()).toEqual(
      ["email", "negocio", "pais", "proceso", "rubro", "web"].sort(),
    );
    expect(ctx.notifier.sent).toHaveLength(0);
  });
});
