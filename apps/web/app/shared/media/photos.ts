import arco1111Avif from "~/assets/photos/ori-arco-1111.avif";
import arco1111Webp from "~/assets/photos/ori-arco-1111.webp";
import arco480Avif from "~/assets/photos/ori-arco-480.avif";
import arco480Webp from "~/assets/photos/ori-arco-480.webp";
import arco740Avif from "~/assets/photos/ori-arco-740.avif";
import arco740Webp from "~/assets/photos/ori-arco-740.webp";
import perfil240Avif from "~/assets/photos/ori-perfil-240.avif";
import perfil240Webp from "~/assets/photos/ori-perfil-240.webp";
import perfil400Avif from "~/assets/photos/ori-perfil-400.avif";
import perfil400Webp from "~/assets/photos/ori-perfil-400.webp";
import perfil800Avif from "~/assets/photos/ori-perfil-800.avif";
import perfil800Webp from "~/assets/photos/ori-perfil-800.webp";

export type ResponsivePhoto = {
  avif: string;
  webp: string;
  fallback: string;
  width: number;
  height: number;
};

const srcset = (entries: [string, number][]) => entries.map(([u, w]) => `${u} ${w}w`).join(", ");

/** Variantes generadas por scripts/optimize-images.mjs. */
export const PHOTOS = {
  arco: {
    avif: srcset([
      [arco480Avif, 480],
      [arco740Avif, 740],
      [arco1111Avif, 1111],
    ]),
    webp: srcset([
      [arco480Webp, 480],
      [arco740Webp, 740],
      [arco1111Webp, 1111],
    ]),
    fallback: arco740Webp,
    width: 740,
    height: 999,
  },
  perfil: {
    avif: srcset([
      [perfil240Avif, 240],
      [perfil400Avif, 400],
      [perfil800Avif, 800],
    ]),
    webp: srcset([
      [perfil240Webp, 240],
      [perfil400Webp, 400],
      [perfil800Webp, 800],
    ]),
    fallback: perfil400Webp,
    width: 800,
    height: 800,
  },
} satisfies Record<string, ResponsivePhoto>;
