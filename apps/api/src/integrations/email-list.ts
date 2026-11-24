/** Puerto de la lista de emails. La API depende de esta interfaz, no de MailerLite. */
export type ListName = "newsletter" | "guide";

export type Subscriber = { email: string; name?: string; list: ListName; source: string };

export interface EmailList {
  subscribe(subscriber: Subscriber): Promise<void>;
}

/** Implementación en memoria: desarrollo, tests y demo sin claves. */
export class InMemoryEmailList implements EmailList {
  readonly subscribers: Subscriber[] = [];

  subscribe(subscriber: Subscriber): Promise<void> {
    const index = this.subscribers.findIndex(
      (s) => s.email === subscriber.email && s.list === subscriber.list,
    );
    // Idempotente: volver a suscribirse no duplica, actualiza.
    if (index === -1) this.subscribers.push(subscriber);
    else this.subscribers[index] = subscriber;
    return Promise.resolve();
  }
}
