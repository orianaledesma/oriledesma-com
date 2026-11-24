/**
 * Configuración del sitio: el único lugar donde viven el email, las redes y los datos del curso.
 * Cambiar algo acá lo cambia en todas las páginas (en la maqueta era la variable SITIO de main.js).
 */
export const SITE = {
  name: "Ori Ledesma | IA para negocios",
  shortName: "Ori Ledesma",
  url: "https://oriledesma.com",
  email: "oriledesmaia@gmail.com",
  handle: "@OriledesmaIA",
  themeColor: "#1B2A4A",
  ogImage: "/og-oriledesma.png",
  location: { city: "Kaunas", country: "LT" },
} as const;

export const SOCIAL = {
  youtube: "https://www.youtube.com/@OriledesmaIA",
  instagram: "https://www.instagram.com/oriledesmaia",
  tiktok: "https://www.tiktok.com/@oriledesmaia",
  facebook: "https://www.facebook.com/OriledesmaIA",
  linkedin: "https://www.linkedin.com/in/oriana-ledesma",
} as const;

export const SISTER_BRANDS = {
  exploriando: "https://exploriando.page",
  latinaConnection: "https://latinaconnection.info",
} as const;

export const COURSE = {
  name: "Cómo crear una marca entera con IA",
  priceUsd: 149,
  /** Cupos de la primera cohorte. */
  seats: 20,
  /** Lugares vendidos. Sin back se actualiza a mano acá; con la API, el dato lo da la API. */
  seatsSold: 0,
  lessons: 7,
} as const;

export const LIVE_PLATFORMS = "YouTube, Twitch y Kick";
