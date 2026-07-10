// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { ministeriosItems } from './(pages)/ministerios/[slug]/data/ministerios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bioiglesia.com';

  // 1. Definimos las rutas estáticas de la web
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1, // La página de inicio es la más importante
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const, // Contacto cambia poco
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ministerios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  // 2. Generamos automáticamente las rutas dinámicas de los ministerios
  const dynamicRoutes = ministeriosItems.map(
    (ministerio) => ({
      url: `${baseUrl}/ministerios/${ministerio.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }),
  );

  // 3. Devolvemos todo el array combinado
  return [...staticRoutes, ...dynamicRoutes];
}
