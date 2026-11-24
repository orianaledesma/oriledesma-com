import type { ImplementationTimeframe, Locale } from "@oriledesma/schemas";

type Copy = {
  formLabel: string;
  name: string;
  email: string;
  process: string;
  processHint: string;
  tools: string;
  toolsHint: string;
  when: string;
  choose: string;
  timeframes: Record<ImplementationTimeframe, string>;
  submit: string;
  success: string;
};

/** La implementación es la única página bilingüe: su formulario también. */
export const IMPLEMENTATION_COPY: Record<Locale, Copy> = {
  es: {
    formLabel: "Contame de tu negocio",
    name: "Tu nombre",
    email: "Tu email",
    process: "¿Qué proceso querés resolver?",
    processHint:
      'Por ejemplo: "contestar los pedidos de WhatsApp" o "armar las descripciones del catálogo".',
    tools: "¿Qué herramientas usan hoy?",
    toolsHint: "WhatsApp, Instagram, Tienda Nube, Shopify, planillas, Google Drive…",
    when: "¿Para cuándo lo necesitás?",
    choose: "Elegí una opción",
    timeframes: {
      asap: "Lo antes posible",
      "this-month": "Este mes",
      "1-3-months": "En 1 a 3 meses",
      exploring: "Estoy explorando",
    },
    submit: "Enviar",
    success: "¡Gracias! Recibí tu mensaje. Te respondo por email.",
  },
  en: {
    formLabel: "Tell me about your business",
    name: "Your name",
    email: "Your email",
    process: "Which process do you want to solve?",
    processHint: 'For example: "answering WhatsApp orders" or "writing product descriptions".',
    tools: "Which tools do you use today?",
    toolsHint: "WhatsApp, Instagram, Shopify, spreadsheets, Google Drive…",
    when: "When do you need it?",
    choose: "Choose an option",
    timeframes: {
      asap: "As soon as possible",
      "this-month": "This month",
      "1-3-months": "In 1–3 months",
      exploring: "I'm just exploring",
    },
    submit: "Send",
    success: "Thanks! I got your message. I'll get back to you by email.",
  },
};
