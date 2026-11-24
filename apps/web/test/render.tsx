import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router";
import { type Locale, LocaleProvider } from "~/i18n";
import { QueryProvider } from "~/shared/api/query-client";

type Options = RenderOptions & { route?: string; locale?: Locale };

/** Render con router en memoria, idioma y un QueryClient nuevo por test (sin cache compartida). */
export function renderWithRouter(
  ui: ReactElement,
  { route = "/", locale = "es", ...options }: Options = {},
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>
      <LocaleProvider locale={locale}>
        <QueryProvider>{children}</QueryProvider>
      </LocaleProvider>
    </MemoryRouter>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
