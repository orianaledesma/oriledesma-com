import { z } from "zod";

/**
 * Códigos de error estables. La web los traduce a texto según el idioma;
 * la API los devuelve tal cual. Así el contrato no depende del idioma.
 */
export const ErrorCode = {
  required: "required",
  invalidEmail: "invalid_email",
  tooLong: "too_long",
  invalidOption: "invalid_option",
} as const;
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

const LIMITS = { short: 120, long: 2000 } as const;

/** Texto obligatorio: recorta espacios y no acepta vacío. */
export const requiredText = (max: number = LIMITS.short) =>
  z
    .string({ error: ErrorCode.required })
    .trim()
    .min(1, { error: ErrorCode.required })
    .max(max, { error: ErrorCode.tooLong });

export const longText = () => requiredText(LIMITS.long);

export const email = () =>
  z
    .string({ error: ErrorCode.required })
    .trim()
    .toLowerCase()
    .min(1, { error: ErrorCode.required })
    .max(254, { error: ErrorCode.tooLong })
    .pipe(z.email({ error: ErrorCode.invalidEmail }));

export const oneOf = <const T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { error: ErrorCode.invalidOption });

export const locale = z.enum(["es", "en"]);
export type Locale = z.infer<typeof locale>;

/** Convierte los issues de Zod en `{ campo: código }`, quedándose con el primer error de cada campo. */
export const toFieldErrors = (error: z.ZodError): Record<string, string> => {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    fields[key] ??= issue.message;
  }
  return fields;
};
