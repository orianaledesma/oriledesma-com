import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router";
import { useHydrated } from "~/shared/lib/useHydrated";
import { analyticsEnabled, loadAnalytics, track } from "./analytics";
import { type ConsentChoice, readConsent, saveConsent } from "./consent";
import { CookieBanner } from "./CookieBanner";

type Ctx = { choice: ConsentChoice | null; choose: (choice: ConsentChoice) => void };

const ConsentContext = createContext<Ctx>({ choice: null, choose: () => undefined });

export const useConsent = () => use(ConsentContext);

/**
 * Lee la elección guardada después de hidratar (el HTML estático no conoce el storage),
 * muestra el banner si falta y manda un page_view por navegación si hay consentimiento.
 */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  // La elección de esta sesión manda; si no hay, se lee la guardada (solo en el cliente).
  const [chosen, setChosen] = useState<ConsentChoice | null>(null);
  const choice = chosen ?? (hydrated ? readConsent() : null);
  const location = useLocation();

  useEffect(() => {
    if (choice === "granted") loadAnalytics();
  }, [choice]);

  useEffect(() => {
    if (choice !== "granted") return;
    track({
      name: "page_view",
      params: { page_path: location.pathname, page_location: window.location.href },
    });
  }, [choice, location.pathname]);

  const choose = useCallback((next: ConsentChoice) => {
    saveConsent(next);
    setChosen(next);
  }, []);

  const value = useMemo(() => ({ choice, choose }), [choice, choose]);
  const showBanner = hydrated && choice === null && analyticsEnabled();

  return (
    <ConsentContext value={value}>
      {children}
      {showBanner && <CookieBanner onChoose={choose} />}
    </ConsentContext>
  );
}
