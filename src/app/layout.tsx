import { Footer, Navbar } from '@/components';
import { Provider } from '@/components/ui/provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
