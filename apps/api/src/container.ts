import type { FastifyBaseLogger } from "fastify";
import type { AppDeps } from "./app";
import type { Env } from "./config/env";
import { InMemoryEmailList } from "./integrations/email-list";
import { MailerLiteEmailList } from "./integrations/mailerlite";
import { LogNotifier, ResendNotifier } from "./integrations/notifier";
import { StaticSeatsProvider } from "./integrations/seats";

/** Elige cada adapter según la config: con clave, el proveedor real; sin clave, el fake. */
export function createDeps(env: Env, log: FastifyBaseLogger): AppDeps {
  const emailList = env.MAILERLITE_API_KEY
    ? new MailerLiteEmailList({
        apiKey: env.MAILERLITE_API_KEY,
        groups: {
          ...(env.MAILERLITE_GROUP_NEWSLETTER && { newsletter: env.MAILERLITE_GROUP_NEWSLETTER }),
          ...(env.MAILERLITE_GROUP_GUIDE && { guide: env.MAILERLITE_GROUP_GUIDE }),
        },
      })
    : new InMemoryEmailList();

  const notifier = env.RESEND_API_KEY
    ? new ResendNotifier({ apiKey: env.RESEND_API_KEY, from: env.NOTIFY_FROM, to: env.NOTIFY_TO })
    : new LogNotifier(log);

  const seats = new StaticSeatsProvider({
    total: env.COURSE_SEATS_TOTAL,
    sold: env.COURSE_SEATS_SOLD,
  });

  for (const [name, adapter] of Object.entries({ emailList, notifier, seats })) {
    log.info({ adapter: adapter.constructor.name }, `using ${name} adapter`);
  }
  return { emailList, notifier, seats };
}
