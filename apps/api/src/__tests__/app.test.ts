import { API_ROUTES } from "@oriledesma/schemas";
import { afterEach, describe, expect, it } from "vitest";
import { setup } from "./helpers";

type App = Awaited<ReturnType<typeof setup>>["app"];
let app: App | undefined;
afterEach(async () => {
  await app?.close();
});

describe("app", () => {
  it("reports health", async () => {
    ({ app } = await setup());
    const res = await app.inject({ url: API_ROUTES.health });
    expect(res.json()).toEqual({ status: "ok" });
  });

  it("serves course seats with a short public cache", async () => {
    ({ app } = await setup());
    const res = await app.inject({ url: API_ROUTES.courseSeats });
    expect(res.json()).toEqual({ total: 20, sold: 3, simulated: true });
    expect(res.headers["cache-control"]).toContain("max-age=60");
  });

  it("sends security headers", async () => {
    ({ app } = await setup());
    const res = await app.inject({ url: API_ROUTES.health });
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["strict-transport-security"]).toBeDefined();
  });

  it("rate-limits form submissions", async () => {
    const ctx = await setup({}, 2);
    app = ctx.app;
    const send = () =>
      ctx.app.inject({
        method: "POST",
        url: API_ROUTES.newsletter,
        payload: { email: "ana@example.com", source: "footer" },
      });
    await send();
    await send();
    const third = await send();
    expect(third.statusCode).toBe(429);
    expect(third.json()).toMatchObject({ error: { code: "rate_limited" } });
  });

  it("answers unknown routes with the error shape", async () => {
    ({ app } = await setup());
    const res = await app.inject({ url: "/nope" });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({ error: { code: "not_found" } });
  });
});
