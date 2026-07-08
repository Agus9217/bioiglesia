'use client';

import {
  Box,
  Carousel,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image, {
  type StaticImageData,
} from 'next/image';
import Link from 'next/link';

type CarouselItemType = {
  slug: string;
  title: string;
  image: string | StaticImageData;
};

type CarouselComponentProps = {
  items?: CarouselItemType[];
  // NUEVO: Agregamos una prop para controlar el tamaño
  size?: 'normal' | 'small';
};

export const CarouselComponent = ({
  items = [],
  size = 'normal', // Por defecto es 'normal' para no romper el Home
}: CarouselComponentProps) => {
  // 1. Calculamos cuántos slides mostrar según el tamaño elegido
  const slidesCount = useBreakpointValue({
    base: size === 'small' ? 2 : 1,
    md: size === 'small' ? 3 : 2,
    lg: size === 'small' ? 4 : 3,
    '2xl': size === 'small' ? 5 : 4,
  });

  // 2. Definimos estilos dinámicos basados en la prop 'size'
  const itemMaxWidth =
    size === 'small' ? '220px' : '320px';
  const headingFontSize =
    size === 'small'
      ? { base: '2xl', md: '3xl' }
      : { base: '5xl' };
  const headingLineHeight =
    size === 'small' ? '30px' : '50px';

  // Programación defensiva
  if (items.length === 0) return null;

  return (
    <Carousel.Root
      autoplay
      slideCount={items.length}
      maxW="1920px"
      w="full"
      mx="auto"
      slidesPerPage={slidesCount ?? 1}
      px={{ base: 4, lg: '12' }}
    >
      <Carousel.ItemGroup w="full">
        {items.map((ministry, index) => (
          <Carousel.Item
            key={ministry.slug}
            index={index}
            w="full"
            maxW={itemMaxWidth} // <-- Aplicamos el ancho dinámico
            aspectRatio={2 / 3}
          >
            <Link
              href={`/ministerios/${ministry.slug}`}
            >
              <Box
                position="relative"
                h="full"
                w="full"
                rounded="2xl"
                overflow="hidden"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
              >
                <Image
                  fill
                  src={ministry.image}
                  alt={ministry.title}
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    zIndex: 0,
                  }}
                />

                <Flex
                  position="absolute"
                  inset={0}
                  zIndex={2}
                  alignItems="center"
                  justifyContent="center"
                  bg="rgba(0,0,0,0.8)"
                  opacity={0}
                  transition="opacity 0.2s ease"
                  _hover={{ opacity: 1 }}
                >
                  <Heading
                    color="white"
                    fontWeight="bold"
                    fontSize={headingFontSize} // <-- Tipografía dinámica
                    lineHeight={headingLineHeight} // <-- Interlineado dinámico
                    textAlign="center"
                    px={4}
                    letterSpacing="4px"
                  >
                    {ministry.title}
                  </Heading>
                </Flex>
              </Box>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  );
};
