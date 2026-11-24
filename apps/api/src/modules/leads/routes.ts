import {
  API_ROUTES,
  guideRequest,
  implementationInquiry,
  liveApplication,
  newsletterSubscription,
  okResponse,
} from "@oriledesma/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { EmailList } from "../../integrations/email-list";
import type { Notifier } from "../../integrations/notifier";

type Deps = { emailList: EmailList; notifier: Notifier };

const created = { 201: okResponse };

/** Altas y consultas de los formularios del sitio. */
export const leadsRoutes: FastifyPluginAsyncZod<Deps> = async (app, { emailList, notifier }) => {
  app.post(
    API_ROUTES.newsletter,
    { schema: { body: newsletterSubscription, response: created } },
    async ({ body }, reply) => {
      await emailList.subscribe({ email: body.email, list: "newsletter", source: body.source });
      return reply.status(201).send({ ok: true });
    },
  );

  app.post(
    API_ROUTES.guide,
    { schema: { body: guideRequest, response: created } },
    async ({ body }, reply) => {
      // El alta al grupo "guide" dispara en MailerLite la automatización que envía la guía.
      await emailList.subscribe({
        email: body.email,
        name: body.nombre,
        list: "guide",
        source: body.source,
      });
      return reply.status(201).send({ ok: true });
    },
  );

  app.post(
    API_ROUTES.implementation,
    { schema: { body: implementationInquiry, response: created } },
    async ({ body }, reply) => {
      await notifier.notify({
        subject: `Implementación: ${body.nombre}`,
        replyTo: body.email,
        fields: {
          Nombre: body.nombre,
          Email: body.email,
          Proceso: body.proceso,
          Herramientas: body.herramientas,
          Cuándo: body.cuando,
          Idioma: body.locale,
        },
      });
      return reply.status(201).send({ ok: true });
    },
  );

  app.post(
    API_ROUTES.liveApplications,
    { schema: { body: liveApplication, response: created } },
    async ({ body }, reply) => {
      await notifier.notify({
        subject: `Postulación al vivo: ${body.negocio}`,
        replyTo: body.email,
        fields: {
          Nombre: body.nombre,
          Email: body.email,
          Negocio: body.negocio,
          Rubro: body.rubro,
          "Web o Instagram": body.web,
          País: body.pais,
          Proceso: body.proceso,
        },
      });
      return reply.status(201).send({ ok: true });
    },
  );

  await Promise.resolve();
};
