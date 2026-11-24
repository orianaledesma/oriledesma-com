import { buildApp, type AppDeps } from "../app";
import { InMemoryEmailList } from "../integrations/email-list";
import type { Notification, Notifier } from "../integrations/notifier";
import { StaticSeatsProvider } from "../integrations/seats";

export class RecordingNotifier implements Notifier {
  readonly sent: Notification[] = [];
  notify(notification: Notification) {
    this.sent.push(notification);
    return Promise.resolve();
  }
}

/** La API real con adapters en memoria: los tests ejercitan validación, rutas y errores de verdad. */
export async function setup(overrides: Partial<AppDeps> = {}, rateLimit = 100) {
  const emailList = new InMemoryEmailList();
  const notifier = new RecordingNotifier();
  const deps: AppDeps = {
    emailList,
    notifier,
    seats: new StaticSeatsProvider({ total: 20, sold: 3 }),
    ...overrides,
  };
  const app = await buildApp({
    env: { NODE_ENV: "test", CORS_ORIGINS: [], RATE_LIMIT_PER_MINUTE: rateLimit },
    deps,
  });
  return { app, emailList, notifier };
}
