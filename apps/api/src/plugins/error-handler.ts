import type { ApiError } from "@oriledesma/schemas";
import type { FastifyError, FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { IntegrationError } from "../integrations/errors";

const body = (code: string, message: string, fields?: Record<string, string>): ApiError => ({
  error: { code, message, ...(fields && { fields }) },
});

/**
 * Todos los errores salen con la misma forma ({ error: { code, message, fields? } }).
 * Los de validación traen el código de cada campo, que la web traduce.
 */
export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      const fields: Record<string, string> = {};
      for (const issue of error.validation) {
        const key = issue.instancePath.replace(/^\//, "").replaceAll("/", ".") || "_form";
        fields[key] ??= issue.message ?? "invalid";
      }
      return reply.status(422).send(body("validation_error", "Invalid request body", fields));
    }

    if (error.statusCode === 429) {
      return reply.status(429).send(body("rate_limited", "Too many requests"));
    }

    if (error instanceof IntegrationError) {
      request.log.error({ err: error, provider: error.provider }, "integration failed");
      return reply.status(502).send(body("upstream_error", "A downstream service failed"));
    }

    if (error.statusCode && error.statusCode < 500) {
      return reply.status(error.statusCode).send(body(error.code, error.message));
    }

    request.log.error({ err: error }, "unhandled error");
    return reply.status(500).send(body("internal_error", "Internal server error"));
  });

  app.setNotFoundHandler((_request, reply) =>
    reply.status(404).send(body("not_found", "Route not found")),
  );
}
