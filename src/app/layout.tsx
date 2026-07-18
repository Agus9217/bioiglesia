import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer, Navbar } from '@/components';
import { Provider } from '@/components/ui/provider';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://bioiglesia.com'),
  title: {
    default:
      'Bioiglesia | Iglesia Evangélica en Barrio Nuevo, Libertad', // Más corto, directo a la palabra clave principal
    template: '%s | Bioiglesia',
  },
  description:
    'Somos una iglesia evangélica en Barrio Nuevo, Libertad (Merlo). Una comunidad cristiana centrada en la adoración a Cristo. Te esperamos los domingos 19:00 hs.', // Inyección natural de términos de búsqueda
  keywords: [
    'iglesia evangélica en Barrio Nuevo',
    'iglesia Libertad',
    'iglesia cristiana Merlo',
    'Bioiglesia',
    'iglesia evangélica Buenos Aires',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://bioiglesia.com',
    siteName: 'Bioiglesia',
    title:
      'Bioiglesia | Iglesia Evangélica en Barrio Nuevo, Libertad',
    description:
      'Amando a Dios, la iglesia y el mundo. Te esperamos los domingos a las 19:00 hs en Libertad.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bioiglesia - Iglesia Evangélica en Barrio Nuevo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bioiglesia',
    description:
      'Iglesia evangélica en Barrio Nuevo, Libertad. Te esperamos este domingo.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  // verification: {
  //   google: '[CÓDIGO-DE-GOOGLE-SEARCH-CONSOLE]',
  // },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
