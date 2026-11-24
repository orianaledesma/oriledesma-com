/**
 * GA4 con Consent Mode v2. Nada se descarga ni se guarda hasta que la persona acepta:
 * sin consentimiento, `track` no hace nada. Sin VITE_GA_MEASUREMENT_ID, analytics queda apagado.
 */

type GtagArgs = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export const analyticsEnabled = (): boolean => Boolean(MEASUREMENT_ID);

let loaded = false;

/** Eventos de negocio: los mismos nombres que en Exploriando y orianaledesma.dev. */
export type AnalyticsEvent =
  | { name: "email_capture_submit"; params: { source: string } }
  | { name: "contact_form_submit"; params: { locale: string } }
  | { name: "live_application_submit"; params: { rubro: string } }
  | { name: "page_view"; params: { page_path: string; page_location: string } };

export function loadAnalytics(): void {
  if (loaded || !MEASUREMENT_ID || typeof window === "undefined") return;
  loaded = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: GtagArgs) {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  // Los page_view los manda el router (SPA): se desactiva el automático.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

export function track({ name, params }: AnalyticsEvent): void {
  if (!loaded) return;
  window.gtag?.("event", name, params);
}

/** Solo para tests. */
export const resetAnalyticsForTests = () => {
  loaded = false;
};
