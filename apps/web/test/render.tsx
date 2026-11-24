import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router";

type Options = RenderOptions & { route?: string };

/** Render con router en memoria: cualquier componente con <Link> se puede testear aislado. */
export function renderWithRouter(ui: ReactElement, { route = "/", ...options }: Options = {}) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
