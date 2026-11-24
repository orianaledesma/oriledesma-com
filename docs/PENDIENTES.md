# Pendientes para producción

Lo que falta para que oriledesma.com quede en producción y funcionando de punta a punta. Está ordenado por bloque, y dentro de cada bloque por orden de ejecución.

**Quién lo hace:**

- **Ori:** decisiones, cuentas y contenido.
- **Dev:** código.

Los datos pendientes del sitio se ven en pantalla como `[texto entre corchetes]` con borde punteado, así que ninguno pasa desapercibido.

---

## 1. Infraestructura y cuentas (bloquean el lanzamiento)

### GitHub · Ori

- [ ] Crear el repo público `oriledesma-com` y pushear todas las ramas.
- [ ] Abrir los PRs en orden. Cada uno va contra la rama anterior: al mergear uno, GitHub reapunta el siguiente a `main`.
- [ ] Settings → General → activar **Automatically delete head branches**.
- [ ] Settings → Branches → proteger `main` con los checks obligatorios: `Lint, typecheck, test, build`, `Conventional commits`, `End-to-end` y `Lighthouse budgets`.

### Dominio y DNS · Ori

- [ ] Confirmar que `oriledesma.com` está comprado.
- [ ] **Recomendado:** pasar los nameservers del registrador a Cloudflare. Así Pages, SSL y los registros de email quedan en un solo lugar.
- [ ] Si se queda en el registrador actual, cargar estos registros:
  - `oriledesma.com` → el registro que indique Cloudflare Pages al agregar el dominio (CNAME flattening o ALIAS).
  - `www` → CNAME a `<proyecto>.pages.dev`, con redirect a la raíz.
  - `api` → CNAME al host que indique Render (`oriledesma-api.onrender.com`).
  - Registros SPF, DKIM y DMARC que pida Resend (ver el bloque de email).

### Cloudflare Pages: web · Ori + Dev

- [ ] Conectar el repo de GitHub. Producción sale de `main`, con preview por PR.
- [ ] Configuración del build:
  - Build command: `npm run build -w @oriledesma/web`
  - Output directory: `apps/web/build/client`
  - Variable `NODE_VERSION=22`
- [ ] Variables de entorno:
  - `VITE_API_URL=https://api.oriledesma.com`
  - `VITE_GA_MEASUREMENT_ID`: el ID de la property de GA4, cuando exista.
- [ ] Agregar el dominio `oriledesma.com` y `www`.
- [ ] Verificar los headers de seguridad (`_headers`) y los redirects de las URLs `.html` viejas (`_redirects`).

### Render: API · Ori + Dev

- [ ] New → Blueprint → elegir el repo. Toma `render.yaml`.
- [ ] Plan **Free** (sin tarjeta). Si el Blueprint igual pide tarjeta, crear el servicio a mano: **New + → Web Service** con los mismos datos de `render.yaml`.
- [ ] Crear un monitor gratis en **UptimeRobot** (HTTP(s), cada 10 min) sobre `/health`: mantiene despierta la instancia gratis y avisa por email si la API se cae.
- [ ] Cuando haya tráfico real, pasar a **Starter** (US$7/mes, no se duerme): cambiar `plan` en `render.yaml` o desde el panel.
- [ ] Cargar los secretos en el dashboard: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_NEWSLETTER`, `MAILERLITE_GROUP_GUIDE` y `RESEND_API_KEY`.
- [ ] Agregar el custom domain `api.oriledesma.com`.
- [ ] Probar que `https://api.oriledesma.com/health` devuelve `{"status":"ok"}`.

### Email marketing: MailerLite · Ori

- [ ] Crear la cuenta y generar la API key (Integrations → API).
- [ ] Crear dos grupos, **Newsletter** y **Guía 7 días**, y copiar sus IDs a Render.
- [ ] Crear la automatización: cuando alguien entra al grupo **Guía 7 días**, se le envía la guía.
- [ ] Activar double opt-in (recomendado por RGPD).
- [ ] Escribir y diseñar la guía "Tus primeros 7 días con IA".

### Avisos internos: Resend · Ori

- [ ] Crear la cuenta y verificar el dominio `oriledesma.com` (registros SPF y DKIM en el DNS).
- [ ] Generar la API key y cargarla en Render.
- [ ] Revisar `NOTIFY_FROM` (por defecto `web@oriledesma.com`) y `NOTIFY_TO` (por defecto `oriledesmaia@gmail.com`).

### Analytics: GA4 · Ori

Sigue el mismo procedimiento de `docs/ANALYTICS_SETUP.md` de Dev Studio.

- [ ] Crear la property **oriledesma.com** y copiar el Measurement ID a Cloudflare Pages.
- [ ] Custom dimensions: `source` (de dónde vino el lead), `locale` y `rubro`.
- [ ] Marcar como conversión: `email_capture_submit`, `contact_form_submit` y `live_application_submit`.
- [ ] Llevar la retención de datos a 14 meses.
- [ ] Vincular Search Console.

### Pagos · Ori decide, Dev implementa

- [ ] **Decidir entre Stripe y Lemon Squeezy.** Lemon Squeezy funciona como merchant of record y resuelve el IVA de la UE. Stripe da más control y escala mejor para la futura plataforma.
- [ ] Definir la política de devolución.
- [ ] Dev:
  - Adapter de pagos detrás de `SeatsProvider`.
  - Endpoint de checkout.
  - Webhook que descuente cupos.
  - Conectar el botón "Comprar el curso", hoy simulado.
  - Tests.

### Legales · Ori

- [ ] Texto de **Privacidad (RGPD)**:
  - Quién es la responsable del tratamiento.
  - Qué datos se piden y para qué.
  - Proveedores que procesan datos: MailerLite, Resend, Google Analytics, Render y Cloudflare.
  - Plazos de conservación y derechos (acceso, rectificación, supresión).
  - Uso de cookies.
- [ ] Texto de **Términos**, incluida la política de devolución del curso.
- [ ] Dev: cargar los textos y quitar el `noindex` de esas dos páginas.

---

## 2. Contenido pendiente en el sitio · Ori

| Página         | Dato                                              | Dónde se carga                                                          |
| -------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| Inicio, Curso  | Fecha de inicio del curso                         | `features/course/CoursePage.tsx`, `features/home/HomePage.tsx`          |
| Curso          | Duración del vivo de demostración                 | `features/course/CoursePage.tsx`                                        |
| Curso          | Testimonios (después de la primera cohorte)       | `features/course/CoursePage.tsx`                                        |
| Inicio         | Título y link del último video                    | `features/home/HomePage.tsx` (o el feed de YouTube, ver bloque 3)       |
| Inicio, Vivos  | Fecha y hora del próximo vivo, duración           | `features/home/HomePage.tsx`, `features/lives/LivesPage.tsx`            |
| Vivos          | Usuarios de Twitch y Kick                         | `features/lives/LivesPage.tsx` y `config/site.ts`                       |
| Vivos          | Fechas de la agenda y negocio elegido             | `content/lives.ts`                                                      |
| Vivos          | Títulos y links de los vivos anteriores           | `content/lives.ts`                                                      |
| Talleres       | Precio de cada taller                             | `content/workshops.ts`                                                  |
| Implementación | Tiempo de respuesta (ES y EN)                     | `features/implementation/content.tsx`                                   |
| Guía           | Tema de cada uno de los 7 días                    | `features/guide/GuidePage.tsx`                                          |
| Aprendé        | Links reales de cada pieza                        | `content/library.ts` (campo `url`)                                      |
| En público     | Fecha de lanzamiento                              | `content/public-numbers.ts` (`LAUNCH_DATE`)                             |
| En público     | Fechas de los hitos y horas reales por etapa      | `content/public-numbers.ts`                                             |
| Inicio (chat)  | Plazo de envío del ejemplo                        | `features/home/ChatDemo.tsx`                                            |
| Toda la web    | Imagen para redes (og:image) definitiva, 1200×630 | `apps/web/public/og-oriledesma.png` (hoy es una provisoria con el logo) |
| Footer         | Confirmar el usuario de LinkedIn                  | `config/site.ts`                                                        |

---

## 3. Trabajo técnico · Dev

**Necesario para lanzar:**

- [ ] Checkout real y cupos desde el proveedor de pagos (cuando esté elegido).
- [ ] Textos legales cargados, sin `noindex`.
- [ ] Antispam en los formularios: campo honeypot o Cloudflare Turnstile, además del rate limit que ya tiene la API.
- [ ] Monitoreo:
  - Uptime de `/health`: cubierto por el monitor de UptimeRobot (bloque de Render).
  - Errores del front, por ejemplo con Sentry.

**Recomendado, puede ir después:**

- [ ] Feed de YouTube para "Último video" y "Vivos anteriores", leído desde la API (YouTube Data API, con cache).
- [ ] Feed de Instagram para la grilla de redes.
- [ ] CSP con hashes en lugar de `'unsafe-inline'` para los scripts.
- [ ] Evaluar la plataforma de cursos: login, Postgres + Drizzle y SSR solo en las rutas privadas.

---

## 4. Verificación final antes de anunciar · Ori + Dev

- [ ] Recorrer el sitio en producción en mobile y desktop.
- [ ] Enviar cada formulario en producción y confirmar:
  - el alta en MailerLite;
  - que llega la guía;
  - que llegan los avisos de implementación y vivos.
- [ ] Ver los eventos en tiempo real de GA4, después de aceptar las cookies.
- [ ] Correr Lighthouse sobre `https://oriledesma.com`.
- [ ] Cargar `sitemap.xml` en Search Console.
- [ ] Probar que `/curso.html` redirige a `/curso` y que una URL inexistente devuelve 404.
- [ ] Revisar y ajustar la sección "AI usage" del README.
