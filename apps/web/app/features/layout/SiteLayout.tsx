import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MAIN_CONTENT_ID, SkipLink } from "./SkipLink";

/** Carcasa de todas las páginas salvo /links: skip link, header, contenido y footer. */
export function SiteLayout({ newsletter }: { newsletter?: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id={MAIN_CONTENT_ID} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer newsletter={newsletter} />
    </>
  );
}
