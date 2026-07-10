// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Permitimos que todos los buscadores nos lean
      allow: '/',
    },
    sitemap: 'https://bioiglesia.com/sitemap.xml', // Le decimos a Google dónde está nuestro mapa
  };
}
