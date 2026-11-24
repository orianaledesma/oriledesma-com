/** `true` para URLs absolutas, mailto: y tel:, que no las maneja el router. */
export const isExternalHref = (href: string): boolean => /^(https?:|mailto:|tel:)/.test(href);

/** Las URLs http(s) abren en otra pestaña; mailto: y tel: no. */
export const opensNewTab = (href: string): boolean => /^https?:/.test(href);

export const mailto = (email: string, subject?: string): string =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
