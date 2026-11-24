import { Link } from "react-router";
import symbolDark from "~/assets/logo/simbolo-fondo-oscuro.svg";
import symbolLight from "~/assets/logo/simbolo-fondo-claro.svg";
import { PATHS } from "~/config/routes";
import { SITE, SOCIAL } from "~/config/site";
import { MAIN_CONTENT_ID } from "~/features/layout/SkipLink";
import { cx } from "~/shared/lib/cx";
import { isExternalHref, mailto, opensNewTab } from "~/shared/lib/links";
import { ProfilePhoto } from "~/shared/media/ProfilePhoto";
import styles from "./LinksPage.module.css";

const HIGHLIGHTS = [
  { to: PATHS.guide, label: "Empezá acá", tone: "marino" },
  { to: PATHS.publicNumbers, label: "Mi logo", tone: "blanco" },
  { to: PATHS.course, label: "Cursos", tone: "celeste" },
  { to: PATHS.learn, label: "Casos", tone: "marino" },
] as const;

const LINKS = [
  { href: PATHS.course, label: "Curso: Cómo crear una marca entera con IA", primary: true },
  { href: PATHS.guide, label: "Guía gratis: Tus primeros 7 días con IA" },
  { href: `${PATHS.lives}#postular`, label: "Postulá tu negocio al vivo" },
  { href: SOCIAL.youtube, label: "Último video en YouTube" },
  { href: PATHS.workshops, label: "Talleres" },
  { href: mailto(SITE.email), label: "Contacto" },
];

const SOCIALS = [
  ["YouTube", SOCIAL.youtube],
  ["Instagram", SOCIAL.instagram],
  ["TikTok", SOCIAL.tiktok],
  ["Facebook", SOCIAL.facebook],
  ["LinkedIn", SOCIAL.linkedin],
] as const;

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string | undefined;
  children: string;
}) {
  if (!isExternalHref(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const newTab = opensNewTab(href) ? { target: "_blank", rel: "noopener" } : {};
  return (
    <a href={href} className={className} {...newTab}>
      {children}
    </a>
  );
}

/** Página de links de las bios: Celeste lleno, sin header ni footer. */
export function LinksPage() {
  return (
    <div className={styles.page} data-surface="celeste">
      <main className={styles.links} id={MAIN_CONTENT_ID}>
        <ProfilePhoto
          alt="Foto de perfil de Ori Ledesma"
          round
          sizes="116px"
          className={styles.avatar}
        />
        <h1 className={styles.name}>Ori Ledesma</h1>
        <p className={styles.sub}>IA para negocios · {SITE.handle}</p>
        <p className={styles.promise}>
          Lo que la IA puede hacer por tu negocio, probado primero en el mío.
        </p>

        <ul className={styles.highlights} aria-label="Destacados">
          {HIGHLIGHTS.map((item) => (
            <li key={item.label}>
              <Link to={item.to}>
                <span className={cx(styles.circle, styles[item.tone])}>
                  <img
                    src={item.tone === "marino" ? symbolDark : symbolLight}
                    alt=""
                    width="40"
                    height="34"
                  />
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <nav aria-label="Links principales">
          <ul className={styles.list}>
            {LINKS.map((link) => (
              <li key={link.label}>
                <SmartLink
                  href={link.href}
                  className={cx(styles.button, link.primary && styles.primary)}
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.socials}>
          {SOCIALS.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noopener">
              {name}
            </a>
          ))}
        </p>
        <p className={styles.signature}>Yo lo pruebo, vos lo aplicás.</p>
        <p className={styles.home}>
          <Link to={PATHS.home}>oriledesma.com</Link>
        </p>
      </main>
    </div>
  );
}
