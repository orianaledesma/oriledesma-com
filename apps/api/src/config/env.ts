import { z } from "zod";

const list = z
  .string()
  .default("")
  .transform((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );

/** Variables de entorno validadas al arrancar: si falta algo, el proceso no levanta. */
const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    HOST: z.string().default("0.0.0.0"),
    PORT: z.coerce.number().int().positive().default(3001),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    /** Orígenes que pueden llamar a la API desde el navegador. */
    CORS_ORIGINS: list,
    RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(10),

    /** Sin clave, las altas van a una lista en memoria (desarrollo y demo). */
    MAILERLITE_API_KEY: z.string().optional(),
    MAILERLITE_GROUP_NEWSLETTER: z.string().optional(),
    MAILERLITE_GROUP_GUIDE: z.string().optional(),

    /** Sin clave, los avisos a Ori se escriben en el log. */
    RESEND_API_KEY: z.string().optional(),
    NOTIFY_FROM: z.string().default("OriLedesma.com <web@oriledesma.com>"),
    NOTIFY_TO: z.email().default("oriledesmaia@gmail.com"),

    /** Cupos del curso mientras no haya proveedor de pagos. */
    COURSE_SEATS_TOTAL: z.coerce.number().int().positive().default(20),
    COURSE_SEATS_SOLD: z.coerce.number().int().nonnegative().default(0),
  })
  .refine((env) => env.NODE_ENV !== "production" || env.CORS_ORIGINS.length > 0, {
    error: "CORS_ORIGINS is required in production",
    path: ["CORS_ORIGINS"],
  });

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const details = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid environment:\n${details}`);
  }
  return result.data;
}
