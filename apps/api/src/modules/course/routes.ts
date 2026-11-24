import { API_ROUTES, courseSeats } from "@oriledesma/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { SeatsProvider } from "../../integrations/seats";

export const courseRoutes: FastifyPluginAsyncZod<{ seats: SeatsProvider }> = async (
  app,
  { seats },
) => {
  app.get(
    API_ROUTES.courseSeats,
    { schema: { response: { 200: courseSeats } } },
    async (_request, reply) => {
      // Cache corta en el edge: el contador puede atrasarse un minuto sin problema.
      void reply.header("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
      return seats.getSeats();
    },
  );
  await Promise.resolve();
};
