import { z } from "zod";
import { email, locale, longText, oneOf, requiredText } from "./fields";

/** Dónde se originó el alta: permite medir qué formulario convierte. */
export const leadSource = z.enum(["footer", "home", "guide-page", "course-page"]);
export type LeadSource = z.infer<typeof leadSource>;

export const newsletterSubscription = z.object({
  email: email(),
  source: leadSource,
});
export type NewsletterSubscription = z.infer<typeof newsletterSubscription>;

export const guideRequest = z.object({
  nombre: requiredText(),
  email: email(),
  source: leadSource,
});
export type GuideRequest = z.infer<typeof guideRequest>;

export const IMPLEMENTATION_TIMEFRAMES = ["asap", "this-month", "1-3-months", "exploring"] as const;
export type ImplementationTimeframe = (typeof IMPLEMENTATION_TIMEFRAMES)[number];

export const implementationInquiry = z.object({
  nombre: requiredText(),
  email: email(),
  proceso: longText(),
  herramientas: requiredText(500),
  cuando: oneOf(IMPLEMENTATION_TIMEFRAMES),
  locale,
});
export type ImplementationInquiry = z.infer<typeof implementationInquiry>;

export const BUSINESS_CATEGORIES = [
  "tienda-online",
  "servicio",
  "creador",
  "gastronomia",
  "comercio-fisico",
  "otro",
] as const;
export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];

export const liveApplication = z.object({
  nombre: requiredText(),
  email: email(),
  negocio: requiredText(),
  rubro: oneOf(BUSINESS_CATEGORIES),
  web: requiredText(200),
  pais: requiredText(80),
  proceso: longText(),
});
export type LiveApplication = z.infer<typeof liveApplication>;
