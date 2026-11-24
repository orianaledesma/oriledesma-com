import type { ErrorCode, Locale } from "@oriledesma/schemas";

export type { Locale };

/** Textos de la "carcasa" del sitio (header, footer, formularios). El contenido de cada página vive en la página. */
export type Dictionary = {
  skipToContent: string;
  logoHomeLabel: string;
  logoAlt: string;
  menu: string;
  nav: {
    label: string;
    course: string;
    lives: string;
    workshops: string;
    implementation: string;
    learn: string;
    about: string;
    guide: string;
    publicNumbers: string;
  };
  footer: {
    label: string;
    promise: string;
    signature: string;
    site: string;
    social: string;
    contact: string;
    newsletter: string;
    newsletterPitch: string;
    sisterBrands: { prefix: string; exploriando: string; latina: string; and: string };
    privacy: string;
    terms: string;
    copyright: (year: number) => string;
  };
  forms: {
    errors: Record<ErrorCode, string>;
    summary: string;
    network: string;
    rateLimited: string;
    unknown: string;
    sending: string;
    unsubscribe: string;
  };
  newsletter: {
    emailLabel: string;
    placeholder: string;
    submit: string;
    success: string;
  };
};
