import { ApiRequestError } from "./client";

/**
 * Envío directo a un formulario de MailerLite, sin back propio.
 * Es el mismo endpoint público que usa el formulario "embebido" de MailerLite:
 * no lleva API key, así que puede vivir en el navegador.
 * Los IDs salen del código de inserción del formulario:
 *   https://assets.mailerlite.com/jsonp/<ACCOUNT_ID>/forms/<FORM_ID>/subscribe
 */
export const MAILERLITE_ORIGIN = "https://assets.mailerlite.com";

export const mailerLiteFormUrl = (accountId: string, formId: string) =>
  `${MAILERLITE_ORIGIN}/jsonp/${encodeURIComponent(accountId)}/forms/${encodeURIComponent(formId)}/subscribe`;

/** Límite conservador para los campos de texto de MailerLite. */
const MAX_FIELD_LENGTH = 1000;

export async function submitMailerLiteForm(
  url: string,
  fields: Record<string, string | undefined>,
): Promise<void> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    if (value) body.append(`fields[${key}]`, value.slice(0, MAX_FIELD_LENGTH));
  }
  body.append("ml-submit", "1");
  body.append("anticsrf", "true");

  let response: Response;
  try {
    response = await fetch(url, { method: "POST", body, headers: { Accept: "application/json" } });
  } catch {
    throw new ApiRequestError({ kind: "network" });
  }
  if (response.status === 429) throw new ApiRequestError({ kind: "rate_limited" });

  const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || data?.success !== true) {
    throw new ApiRequestError({ kind: "server", status: response.status });
  }
}
