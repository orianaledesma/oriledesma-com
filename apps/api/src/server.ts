import { buildApp } from "./app";
import { loadEnv } from "./config/env";
import { createDeps } from "./container";

const env = loadEnv();

const app = await buildApp({
  env,
  deps: (log) => createDeps(env, log),
  logger: {
    level: env.LOG_LEVEL,
    // Los formularios traen datos personales: nunca van al log.
    redact: ["req.headers.authorization", "req.body"],
    ...(env.NODE_ENV === "development" && { transport: { target: "pino-pretty" } }),
  },
});

const shutdown = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
  process.exit(0);
};
process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

await app.listen({ host: env.HOST, port: env.PORT });
