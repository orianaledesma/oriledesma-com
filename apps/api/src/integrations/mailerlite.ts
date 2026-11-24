import type { EmailList, ListName, Subscriber } from "./email-list";
import { IntegrationError } from "./errors";

type Options = {
  apiKey: string;
  groups: Partial<Record<ListName, string>>;
  fetch?: typeof fetch;
  baseUrl?: string;
};

/**
 * Adapter de MailerLite (API v2). El alta es un upsert: si el email ya existe,
 * MailerLite lo suma al grupo sin duplicarlo.
 * https://developers.mailerlite.com/docs/subscribers#create-upsert-subscriber
 */
export class MailerLiteEmailList implements EmailList {
  readonly #apiKey: string;
  readonly #groups: Partial<Record<ListName, string>>;
  readonly #fetch: typeof fetch;
  readonly #baseUrl: string;

  constructor({
    apiKey,
    groups,
    fetch: fetchImpl = fetch,
    baseUrl = "https://connect.mailerlite.com",
  }: Options) {
    this.#apiKey = apiKey;
    this.#groups = groups;
    this.#fetch = fetchImpl;
    this.#baseUrl = baseUrl;
  }

  async subscribe({ email, name, list, source }: Subscriber): Promise<void> {
    const group = this.#groups[list];
    const response = await this.#fetch(`${this.#baseUrl}/api/subscribers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: { ...(name && { name }), source },
        ...(group && { groups: [group] }),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new IntegrationError("mailerlite", response.status);
    }
  }
}
