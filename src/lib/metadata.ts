// src/lib/metadata.ts
import type { Metadata } from 'next';

interface CustomMetadata {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string; // <-- 1. Agregamos la propiedad canonical
}

export function constructMetadata({
  title = 'Iglesia cristiana en Barrio Nuevo, Libertad, Merlo',
  description = 'Bioiglesia es una iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires, centrada en la adoración a Cristo. Te esperamos los domingos a las 19:00 hs. Visitanos.',
  image = '/og-image.jpg',
  noIndex = false,
  canonical, // <-- 2. Lo recibimos como parámetro
}: CustomMetadata = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
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
      title,
      description,
      images: [image],
    },
    // 3. Si pasamos un canonical, lo agrega automáticamente
    ...(canonical && {
      alternates: {
        canonical: canonical,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
