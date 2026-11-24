/** Falla de un proveedor externo. Se loguea con detalle; al cliente le llega un 502 genérico. */
export class IntegrationError extends Error {
  constructor(
    readonly provider: string,
    readonly status?: number,
  ) {
    super(`${provider} request failed${status ? ` with status ${status}` : ""}`);
    this.name = "IntegrationError";
  }
}
