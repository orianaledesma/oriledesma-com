import { apiError } from "@oriledesma/schemas";

/** URL de la API. En build se inyecta con VITE_API_URL; en desarrollo apunta a la API local. */
export const API_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3001";

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
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...init, headers });
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
