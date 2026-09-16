// src/lib/metadata.ts
import type { Metadata } from 'next';

// Fuente única de verdad para marca y dominio canónico.
// layout.tsx importa SITE_URL para metadataBase y alternates.canonical.
export const SITE_NAME = 'Bioiglesia';
export const SITE_URL = 'https://bioiglesia.com';

interface CustomMetadata {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function constructMetadata({
  title = 'Iglesia cristiana en Barrio Nuevo, Libertad, Merlo',
  description = 'Bioiglesia es una iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires, centrada en la adoración a Cristo. Te esperamos los domingos a las 19:00 hs. Visitanos.',
  image = '/og-image.jpg',
  noIndex = false,
  canonical,
}: CustomMetadata = {}): Metadata {
  // 1) Sufijo de marca DRY: solo se agrega si el título no contiene ya
  //    la marca. Evita duplicados tipo "X | Bioiglesia | Bioiglesia".
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  // 2) Canonical absoluto: new URL() resuelve rutas relativas contra
  //    SITE_URL y deja intactas las URLs absolutas.
  const absoluteCanonical = canonical
    ? new URL(canonical, SITE_URL).toString()
    : undefined;

  return {
    // title.absolute ignora el template del layout ('%s | Bioiglesia')
    // para que el sufijo no se aplique dos veces en el <title> final.
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    // 3) Canonical solo si se recibe (las páginas sin canonical no lo emiten)
    ...(absoluteCanonical && {
      alternates: {
        canonical: absoluteCanonical,
      },
    }),
    // 4) noIndex se mantiene tal cual
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}