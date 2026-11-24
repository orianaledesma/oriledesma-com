import type { ReactNode } from "react";
import type { Locale } from "~/i18n";
import type { Step } from "~/shared/ui/Steps";
import { Accent, Pending } from "~/shared/ui/Text";

type Content = {
  pill: string;
  title: ReactNode;
  lead: string;
  cta: string;
  languageSwitch: { prefix?: string; label: string };
  howPill: string;
  howTitle: string;
  steps: Step[];
  availabilityPill: string;
  availabilityTitle: string;
  availabilityLead: string;
  availabilityStat: string;
  formPill: string;
  formTitle: string;
  formLead: ReactNode;
  emailPrompt: string;
  signature: string;
};

export const IMPLEMENTATION_CONTENT: Record<Locale, Content> = {
  es: {
    pill: "Implementación · un cliente a la vez",
    title: (
      <>
        Un sistema con IA a medida que le <Accent>saca</Accent> trabajo a tu negocio
      </>
    ),
    lead: "Diseño y armo un sistema con IA alrededor de un proceso real de tu negocio: pedidos, mensajes, catálogo, turnos o contenido. Alcance y precio cerrados, definidos antes de empezar.",
    cta: "Contame tu proceso",
    languageSwitch: { prefix: "We also work in English.", label: "See this page in English" },
    howPill: "Cómo funciona",
    howTitle: "De la primera llamada a la entrega",
    steps: [
      {
        title: "Llamada de 30 min",
        text: "Me contás qué proceso te quita tiempo y qué herramientas usan hoy.",
      },
      {
        title: "Propuesta cerrada",
        text: "Te paso una propuesta con alcance, precio y plazo cerrados. Sin sorpresas.",
      },
      { title: "Implementación", text: "Armo el sistema y lo pruebo con tu proceso real." },
      {
        title: "Entrega y seguimiento",
        text: "Te lo entrego funcionando, le muestro a tu equipo cómo usarlo y hago el seguimiento.",
      },
    ],
    availabilityPill: "Cupo",
    availabilityTitle: "Un cliente a la vez",
    availabilityLead:
      "Tomo una implementación por vez para que cada proyecto tenga toda mi atención. Si el cupo está ocupado, te aviso cuándo se libera.",
    availabilityStat: "cliente a la vez · alcance y precio cerrados",
    formPill: "Formulario",
    formTitle: "Contame de tu negocio",
    formLead: (
      <>
        Tres preguntas para ver si te puedo ayudar. Te respondo en{" "}
        <Pending>[tiempo de respuesta]</Pending>.
      </>
    ),
    emailPrompt: "¿Preferís el email? Escribime a",
    signature: "Yo lo pruebo, vos lo aplicás.",
  },
  en: {
    pill: "Implementation · one client at a time",
    title: (
      <>
        A custom AI system that takes work <Accent>off</Accent> your business
      </>
    ),
    lead: "I design and build an AI system around a real process in your business: orders, messages, catalog, bookings or content. Fixed scope and fixed price, agreed before we start.",
    cta: "Tell me about your process",
    languageSwitch: { label: "Ver esta página en español" },
    howPill: "How it works",
    howTitle: "From the first call to delivery",
    steps: [
      {
        title: "30-minute call",
        text: "You tell me which process takes up your time and which tools you use today.",
      },
      {
        title: "Fixed proposal",
        text: "You get a proposal with a closed scope, price and timeline. No surprises.",
      },
      { title: "Implementation", text: "I build the system and test it with your real process." },
      {
        title: "Delivery and follow-up",
        text: "I hand it over working, show your team how to use it and follow up.",
      },
    ],
    availabilityPill: "Availability",
    availabilityTitle: "One client at a time",
    availabilityLead:
      "I take on one implementation at a time so every project gets my full attention. If the spot is taken, I'll tell you when the next one opens.",
    availabilityStat: "client at a time · fixed scope and price",
    formPill: "Form",
    formTitle: "Tell me about your business",
    formLead: (
      <>
        Three questions so I can see whether I can help you. I reply within{" "}
        <Pending>[response time]</Pending>.
      </>
    ),
    emailPrompt: "Prefer email? Write to me at",
    signature: "I test it, you apply it.",
  },
};
