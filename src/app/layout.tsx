import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Footer, Navbar } from '@/components';
import { Provider } from '@/components/ui/provider';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://bioiglesia.com'),
  title: {
    default:
      'Bioiglesia | Iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires',
    template: '%s | Bioiglesia',
  },
  description:
    'Bioiglesia es una iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires, centrada en la adoración a Cristo. Te esperamos los domingos a las 19:00 hs. Visitanos.',
  keywords: [
    'iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires',
    'iglesia evangélica en Barrio Nuevo, Libertad, Merlo, Buenos Aires',
    'iglesia Buenos Aires',
    'Bioiglesia',
    'culto domingo Barrio Nuevo, Libertad, Merlo, Buenos Aires',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://bioiglesia.com',
    siteName: 'Bioiglesia',
    title:
      'Bioiglesia | Iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires',
    description:
      'Amando a Dios, la iglesia y el mundo. Te esperamos los domingos a las 19:00 hs.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bioiglesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bioiglesia',
    description:
      'Iglesia cristiana en Barrio Nuevo, Libertad, Merlo, Buenos Aires.',
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
