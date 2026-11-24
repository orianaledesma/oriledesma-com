import type { FastifyBaseLogger } from "fastify";
import { IntegrationError } from "./errors";

/** Aviso interno a Ori cuando llega una consulta o una postulación. */
export type Notification = { subject: string; replyTo: string; fields: Record<string, string> };

export interface Notifier {
  notify(notification: Notification): Promise<void>;
}

/** Escribe el aviso en el log: desarrollo y demo sin proveedor de email. */
export class LogNotifier implements Notifier {
  constructor(private readonly log: FastifyBaseLogger) {}

  notify({ subject, fields }: Notification): Promise<void> {
    this.log.info({ subject, fieldNames: Object.keys(fields) }, "notification (log only)");
    return Promise.resolve();
  }
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/** Envío real por Resend. El texto del usuario se escapa: nunca se interpreta como HTML. */
export class ResendNotifier implements Notifier {
  constructor(
    private readonly options: { apiKey: string; from: string; to: string; fetch?: typeof fetch },
  ) {}

  async notify({ subject, replyTo, fields }: Notification): Promise<void> {
    const rows = Object.entries(fields)
      .map(([key, value]) => `<p><strong>${escapeHtml(key)}</strong><br>${escapeHtml(value)}</p>`)
      .join("");
    const response = await (this.options.fetch ?? fetch)("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.options.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.options.from,
        to: [this.options.to],
        reply_to: replyTo,
        subject,
        html: rows,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new IntegrationError("resend", response.status);
  }
}
