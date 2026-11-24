import type { ResponsivePhoto } from "./photos";

type Props = {
  photo: ResponsivePhoto;
  alt: string;
  sizes: string;
  className?: string | undefined;
  /** La foto del hero es el LCP: se pide primero y sin lazy-load. */
  priority?: boolean;
};

/** <picture> con AVIF y WebP: el navegador elige formato y ancho. */
export function Picture({ photo, alt, sizes, className, priority = false }: Props) {
  return (
    <picture>
      <source type="image/avif" srcSet={photo.avif} sizes={sizes} />
      <source type="image/webp" srcSet={photo.webp} sizes={sizes} />
      <img
        className={className}
        src={photo.fallback}
        alt={alt}
        width={photo.width}
        height={photo.height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
