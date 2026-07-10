import { constructMetadata } from '@/lib/metadata';
import ContactoClient from './ContactClient';
import type { Metadata } from 'next'; // <-- 1. Importas el tipo

// 2. Le asignas el tipo explícito ": Metadata" a la constante
export const metadata: Metadata = constructMetadata({
  title: 'Contacto',
  description:
    'Visitanos en Bioiglesia, Barrio Nuevo, Libertad, Merlo. Domingos 19:00 hs. Encontrá cómo llegar y nuestras redes.',
  canonical: '/contacto', // <-- 1. Agregamos la propiedad canonical
});

export default function Contacto() {
  return <ContactoClient />;
}
