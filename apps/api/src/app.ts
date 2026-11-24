import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { API_ROUTES } from "@oriledesma/schemas";
import Fastify, { type FastifyBaseLogger, type FastifyServerOptions } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import type { Env } from "./config/env";
import type { EmailList } from "./integrations/email-list";
import type { Notifier } from "./integrations/notifier";
import type { SeatsProvider } from "./integrations/seats";
import { courseRoutes } from "./modules/course/routes";
import { leadsRoutes } from "./modules/leads/routes";
import { registerErrorHandler } from "./plugins/error-handler";

export type AppDeps = { emailList: EmailList; notifier: Notifier; seats: SeatsProvider };

type BuildOptions = {
  env: Pick<Env, "CORS_ORIGINS" | "RATE_LIMIT_PER_MINUTE" | "NODE_ENV">;
  /** Las dependencias, o una fábrica que las arma con el logger de la app. */
  deps: AppDeps | ((log: FastifyBaseLogger) => AppDeps);
  logger?: FastifyServerOptions["logger"];
};

/**
 * Fábrica de la app: recibe la config y las dependencias (inyección explícita),
 * así los tests levantan la API real con adapters en memoria.
 */
export async function buildApp({ env, deps: depsOrFactory, logger = false }: BuildOptions) {
  const app = Fastify({
    logger,
    trustProxy: true, // detrás del proxy de Render: la IP real llega en X-Forwarded-For
    bodyLimit: 16 * 1024,
  }).withTypeProvider<ZodTypeProvider>();

  const deps = typeof depsOrFactory === "function" ? depsOrFactory(app.log) : depsOrFactory;

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  registerErrorHandler(app);

  await app.register(helmet);
  await app.register(cors, {
    origin: env.NODE_ENV === "production" ? env.CORS_ORIGINS : true,
    methods: ["GET", "POST"],
  });
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_PER_MINUTE,
    timeWindow: "1 minute",
    // Solo los formularios: el health check y los cupos no cuentan.
    allowList: (request) => request.method === "GET",
  });

  app.get(API_ROUTES.health, () => ({ status: "ok" }));
  await app.register(leadsRoutes, { emailList: deps.emailList, notifier: deps.notifier });
  await app.register(courseRoutes, { seats: deps.seats });

  return app;
}
