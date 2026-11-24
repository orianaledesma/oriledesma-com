export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "ol-consent-v1";

/** localStorage puede no existir o tirar (modo privado, iframes): nunca rompe la página. */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Sin storage la elección dura lo que dura la pestaña: aceptable.
  }
}
