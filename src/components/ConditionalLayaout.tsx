'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/components'; // Ajusta esta ruta si es necesario

export const ConditionalLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Leemos la ruta actual
  const pathname = usePathname();

  // Verificamos si estamos exactamente en la página de links
  const isLinksPage = pathname === '/links';

  return (
    <>
      {/* Solo mostramos el Navbar si NO estamos en /links */}
      {!isLinksPage && <Navbar />}

      {/* El contenido de la página (Home, Ministerios o Links) */}
      <main>{children}</main>

      {/* Solo mostramos el Footer si NO estamos en /links */}
      {!isLinksPage && <Footer />}
    </>
  );
};
