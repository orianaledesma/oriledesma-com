/** Fecha ISO (AAAA-MM-DD) a texto legible, sin corrimientos por zona horaria. */
export const formatDate = (iso: string, locale = "es-AR"): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** Días enteros entre dos fechas ISO. */
export const daysBetween = (fromIso: string, toIso: string): number =>
  Math.round((Date.parse(toIso) - Date.parse(fromIso)) / 86_400_000);
