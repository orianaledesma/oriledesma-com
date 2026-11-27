import { API_ROUTES } from "@oriledesma/schemas";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

/** Los tests corren en modo API por defecto (ver vitest.config.ts). */
export const TEST_API_URL = "http://localhost:3001";
export const api = (path: string) => `${TEST_API_URL}${path}`;

/** Respuestas felices por defecto; cada test sobreescribe lo que necesita con server.use(). */
export const handlers = [
  http.post(api(API_ROUTES.newsletter), () => HttpResponse.json({ ok: true }, { status: 201 })),
  http.post(api(API_ROUTES.guide), () => HttpResponse.json({ ok: true }, { status: 201 })),
  http.post(api(API_ROUTES.implementation), () => HttpResponse.json({ ok: true }, { status: 201 })),
  http.post(api(API_ROUTES.liveApplications), () =>
    HttpResponse.json({ ok: true }, { status: 201 }),
  ),
  http.get(api(API_ROUTES.courseSeats), () =>
    HttpResponse.json({ total: 20, sold: 8, simulated: false }),
  ),
];

export const server = setupServer(...handlers);
