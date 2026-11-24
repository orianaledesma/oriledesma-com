import { createContext, type ReactNode, use } from "react";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export type { Dictionary, Locale };

export const DEFAULT_LOCALE: Locale = "es";
const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

/** Español en la raíz; inglés bajo /en. */
export const localeFromPath = (pathname: string): Locale =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;

/** Código para og:locale y hreflang. El español apunta a Latinoamérica. */
export const LANGUAGE_TAGS: Record<Locale, { html: string; og: string }> = {
  es: { html: "es", og: "es_419" },
  en: { html: "en", og: "en_US" },
};

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export const useLocale = (): Locale => use(LocaleContext);

/** Diccionario del idioma activo. */
export const useT = (): Dictionary => DICTIONARIES[useLocale()];

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
