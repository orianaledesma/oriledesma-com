import { z } from "zod";

/** Forma única de los errores de la API. */
export const apiError = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    fields: z.record(z.string(), z.string()).optional(),
  }),
});
export type ApiError = z.infer<typeof apiError>;

export const okResponse = z.object({ ok: z.literal(true) });
export type OkResponse = z.infer<typeof okResponse>;

/** Rutas de la API en un solo lugar: el front y el back no pueden divergir. */
export const API_ROUTES = {
  health: "/health",
  newsletter: "/v1/newsletter/subscriptions",
  guide: "/v1/guide/requests",
  implementation: "/v1/implementation/inquiries",
  liveApplications: "/v1/lives/applications",
  courseSeats: "/v1/course/seats",
} as const;
