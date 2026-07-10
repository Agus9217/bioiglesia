import { Analytics } from '@vercel/analytics/next';

import { Footer, Navbar } from '@/components';
import { Provider } from '@/components/ui/provider';

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
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
