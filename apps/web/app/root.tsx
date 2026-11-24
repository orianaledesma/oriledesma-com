import jostLatin from "@fontsource-variable/jost/files/jost-latin-wght-normal.woff2?url";
import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { SITE } from "./config/site";
import { LANGUAGE_TAGS, LocaleProvider, localeFromPath } from "./i18n";
import "./styles/index.css";

export const links: Route.LinksFunction = () => [
  // La fuente latina está en el camino crítico de todos los títulos: se precarga.
  { rel: "preload", href: jostLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: ReactNode }) {
  const locale = localeFromPath(useLocation().pathname);
  return (
    <html lang={LANGUAGE_TAGS[locale].html}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={SITE.themeColor} />
        <Meta />
        <Links />
      </head>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main
      id="contenido"
      data-surface="noche"
      data-stars
      style={{ minHeight: "70vh", padding: "15vh 24px" }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1>{notFound ? "No encontramos esta página" : "Algo salió mal"}</h1>
        <p>
          {notFound
            ? "Puede que el link esté mal escrito o que la página se haya movido."
            : "Probá recargar la página en un rato."}
        </p>
        <p>
          <a href="/">Volver al inicio</a>
        </p>
      </div>
    </main>
  );
}
