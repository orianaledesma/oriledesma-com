import { apiError } from "@oriledesma/schemas";

/**
 * URL de la API propia, o `undefined` si el sitio corre sin back (MVP: formularios a MailerLite).
 * Se lee en cada llamada para que el modo se pueda cambiar por entorno (y en tests).
 */
export const getApiUrl = (): string | undefined =>
  (import.meta.env.VITE_API_URL as string | undefined) || undefined;

export type ApiFailure =
  | { kind: "validation"; fields: Record<string, string> }
  | { kind: "rate_limited" }
  | { kind: "network" }
  | { kind: "server"; status: number };

/** Error tipado del cliente: la UI decide qué mostrar según `failure.kind`. */
export class ApiRequestError extends Error {
  constructor(readonly failure: ApiFailure) {
    super(`API request failed: ${failure.kind}`);
    this.name = "ApiRequestError";
  }
}

async function toFailure(response: Response): Promise<ApiFailure> {
  if (response.status === 429) return { kind: "rate_limited" };
  if (response.status === 422) {
    const parsed = apiError.safeParse(await response.json().catch(() => null));
    if (parsed.success && parsed.data.error.fields) {
      return { kind: "validation", fields: parsed.data.error.fields };
    }
  }
  return { kind: "server", status: response.status };
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const apiUrl = getApiUrl();
  if (!apiUrl) throw new Error("VITE_API_URL is not set: there is no API to call");
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, { ...init, headers });
  } catch {
    throw new ApiRequestError({ kind: "network" });
  }
  if (!response.ok) throw new ApiRequestError(await toFailure(response));
  return (await response.json()) as T;
}

export const getJson = <T>(path: string, signal?: AbortSignal) =>
  request<T>(path, { method: "GET", ...(signal && { signal }) });

export const postJson = <T>(path: string, body: unknown) =>
  request<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
