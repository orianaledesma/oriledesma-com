import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  // Sitio de marketing: todo se genera como HTML estático en el build (SSG).
  // Si la plataforma de cursos necesita SSR, alcanza con pasar a `ssr: true`.
  ssr: false,
  prerender({ getStaticPaths }) {
    // Las rutas estáticas + /404 (la ruta comodín no se descubre sola).
    return [...getStaticPaths(), "/404"];
  },
} satisfies Config;
