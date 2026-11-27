import {
  API_ROUTES,
  type GuideRequest,
  type ImplementationInquiry,
  type LiveApplication,
  type NewsletterSubscription,
} from "@oriledesma/schemas";
import { getApiUrl, postJson } from "~/shared/api/client";
import { mailerLiteFormUrl, submitMailerLiteForm } from "~/shared/api/mailerlite";

/** Cada formulario del sitio y lo que envía. */
export type LeadPayloads = {
  newsletter: NewsletterSubscription;
  guide: GuideRequest;
  implementation: ImplementationInquiry;
  lives: LiveApplication;
};
export type LeadKind = keyof LeadPayloads;

const API_ENDPOINTS: Record<LeadKind, string> = {
  newsletter: API_ROUTES.newsletter,
  guide: API_ROUTES.guide,
  implementation: API_ROUTES.implementation,
  lives: API_ROUTES.liveApplications,
};

/** Un formulario de MailerLite por tipo de lead, cada uno asociado a su propio grupo. */
const FORM_ENV: Record<LeadKind, string> = {
  newsletter: "VITE_MAILERLITE_FORM_NEWSLETTER",
  guide: "VITE_MAILERLITE_FORM_GUIDE",
  implementation: "VITE_MAILERLITE_FORM_IMPLEMENTATION",
  lives: "VITE_MAILERLITE_FORM_LIVES",
};

/**
 * Campos de MailerLite de cada formulario. `email` y `name` son nativos; el resto son
 * campos personalizados que hay que crear en MailerLite con esas mismas claves.
 */
const toMailerLiteFields: { [K in LeadKind]: (p: LeadPayloads[K]) => Record<string, string> } = {
  newsletter: (p) => ({ email: p.email, origen: p.source }),
  guide: (p) => ({ email: p.email, name: p.nombre, origen: p.source }),
  implementation: (p) => ({
    email: p.email,
    name: p.nombre,
    proceso: p.proceso,
    herramientas: p.herramientas,
    cuando: p.cuando,
    idioma: p.locale,
  }),
  lives: (p) => ({
    email: p.email,
    name: p.nombre,
    negocio: p.negocio,
    rubro: p.rubro,
    web: p.web,
    pais: p.pais,
    proceso: p.proceso,
  }),
};

const env = (name: string) => (import.meta.env[name] as string | undefined) || undefined;

/**
 * Envía un lead por el transporte configurado:
 * - con VITE_API_URL → la API propia (validación en servidor, avisos por email);
 * - sin ella → directo a MailerLite (MVP sin back, costo $0).
 * Los formularios no saben cuál se usa: cambiar de modo es solo cambiar variables de entorno.
 */
export async function submitLead<K extends LeadKind>(kind: K, payload: LeadPayloads[K]) {
  if (getApiUrl()) {
    await postJson<{ ok: true }>(API_ENDPOINTS[kind], payload);
    return;
  }
  const accountId = env("VITE_MAILERLITE_ACCOUNT_ID");
  const formId = env(FORM_ENV[kind]);
  if (!accountId || !formId) {
    throw new Error(`Missing VITE_MAILERLITE_ACCOUNT_ID or ${FORM_ENV[kind]}`);
  }
  await submitMailerLiteForm(
    mailerLiteFormUrl(accountId, formId),
    toMailerLiteFields[kind](payload),
  );
}
