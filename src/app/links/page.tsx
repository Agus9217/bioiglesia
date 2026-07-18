import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enlaces | Bioiglesia',
  description:
    'Conéctate con nuestra iglesia evangélica en Libertad. Visita nuestra web, canal de YouTube y ubicación.',
  // Usamos noindex porque no queremos que esta página compita con tu Home en Google,
  // es solo de uso para redes sociales.
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return (
    <Box
      minH="100svh"
      bg="black"
      color="white"
      py={12}
      px={4}
    >
      <Flex
        direction="column"
        align="center"
        maxW="md"
        mx="auto"
        gap={8}
      >
        {/* Encabezado del Perfil */}
        <Flex
          direction="column"
          align="center"
          gap={4}
        >
          <Box
            rounded="full"
            overflow="hidden"
            w="110px"
            h="110px"
            position="relative"
            border="3px solid"
            borderColor="green.600"
            shadow="lg"
          >
            {/* Puedes usar tu og-image o cualquier logo cuadrado que tengas en la carpeta public */}
            <Image
              src="/logo.png"
              alt="Bioiglesia Perfil"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Flex
            direction="column"
            align="center"
            gap={1}
          >
            <Heading
              as="h1"
              size="lg"
              letterSpacing="wide"
            >
              @bio_iglesia
            </Heading>
            {/* En v3, whiteAlpha.700 se escribe como white/70 */}
            <Text
              color="white/70"
              textAlign="center"
              fontSize="sm"
            >
              Iglesia evangélica en Barrio Nuevo,
              Libertad.
            </Text>
          </Flex>
        </Flex>

        {/* Botonera de Enlaces */}
        <VStack w="full" gap={4}>
          <Button
            asChild
            w="full"
            size="xl"
            py={8}
            colorPalette="green"
            variant="solid"
            rounded="2xl"
          >
            <Link href="/">
              <Icon icon="lucide:globe" width="24" />
              Visita nuestra Web Oficial
            </Link>
          </Button>

          <Button
            asChild
            w="full"
            size="xl"
            py={8}
            bg="red.600"
            color="white"
            _hover={{ bg: 'red.700' }}
            rounded="2xl"
          >
            <a
              href="https://www.youtube.com/@BIOIGLESIA/streams"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon="lucide:youtube" width="24" />
              Mirar culto en vivo
            </a>
          </Button>

          <Button
            asChild
            w="full"
            size="xl"
            py={8}
            colorPalette="blue"
            rounded="2xl"
          >
            <Link href="/ministerios">
              <Icon icon="lucide:users" width="24" />
              Nuestros Ministerios
            </Link>
          </Button>

          <Button
            asChild
            w="full"
            size="xl"
            py={8}
            colorPalette="gray"
            variant="outline"
            borderColor="white/30"
            _hover={{ bg: 'white/10' }}
            rounded="2xl"
          >
            <Link href="/contacto">
              <Icon icon="lucide:map-pin" width="24" />
              Ubicación y Horarios
            </Link>
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
}
