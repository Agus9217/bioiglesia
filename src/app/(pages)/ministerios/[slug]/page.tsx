import { notFound } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Flex,
  Highlight,
} from '@chakra-ui/react';
import Image from 'next/image';
import type { Metadata } from 'next';

import { ministeriosItems } from './data/ministerios';
import { CarouselComponent } from '@/components/carousel/CarouselComponent';
import { constructMetadata } from '@/lib/metadata';

// 1. Generamos las rutas estáticas en build time (SSG)
export function generateStaticParams() {
  return ministeriosItems.map((ministerio) => ({
    slug: ministerio.slug,
  }));
}

// 2. Generamos la Metadata dinámica para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministerio = ministeriosItems.find(
    (m) => m.slug === slug,
  );

  if (!ministerio) {
    return constructMetadata({
      title: 'Ministerio no encontrado',
      noIndex: true,
    });
  }

  return constructMetadata({
    title: ministerio.title,
    // <-- AJUSTE SEO 1: Inyección de palabra clave local en la descripción dinámica
    description:
      `Descubre el ministerio de ${ministerio.title} de nuestra iglesia evangélica en Libertad, Merlo. ${ministerio.description}`.substring(
        0,
        155,
      ) + '...',
    image: ministerio.image,
    canonical: `/ministerios/${slug}`,
  });
}

// 3. El componente de la página
export default async function MinisterioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministerio = ministeriosItems.find(
    (m) => m.slug === slug,
  );

  if (!ministerio) {
    notFound();
  }

  const otrosMinisterios = ministeriosItems.filter(
    (m) => m.slug !== slug,
  );

  return (
    <>
      {/* --- HERO SECTION OPTIMIZADO PARA LCP --- */}
      <Box
        w={'100%'}
        h={'100svh'}
        position={'relative'}
        overflow={'hidden'}
      >
        <Image
          src={ministerio.image}
          alt={`Fondo representativo del ministerio ${ministerio.title}`}
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          quality={90}
        />
        <Box
          position={'absolute'}
          inset={0}
          bgGradient="to-br"
          gradientFrom="black/100"
          gradientTo="green.900/94"
          zIndex={1}
        />
        <Flex
          justifyContent={'center'}
          gap={4}
          position={'absolute'}
          top={'50%'}
          left={'50%'}
          transform={'translate(-50%, -50%)'}
          w={'full'}
          maxW={'85%'}
          h={'70%'}
          zIndex={2}
          textAlign={'center'}
        >
          <Flex
            grow={1}
            w={'full'}
            flexDirection={'column'}
            gap={{ base: 6, md: 8 }}
            justifyContent={'center'}
          >
            <Flex
              alignItems={'center'}
              gap={2}
              justifyContent={'center'}
            >
              <Box
                w={'50px'}
                h={'2px'}
                bg={'orange.600'}
              />
              <Text
                fontWeight={'bold'}
                textTransform={'uppercase'}
                fontSize={'xs'}
                letterSpacing={'4px'}
                color={'orange.600'}
              >
                Ministerio
              </Text>
              <Box
                w={'50px'}
                h={'2px'}
                bg={'orange.600'}
              />
            </Flex>
            <Heading
              as={'h1'} // <-- AJUSTE SEO 2: H1 semántico para el título del ministerio
              fontWeight={'bold'}
              fontSize={{ base: '6xl', md: '7xl' }}
              lineHeight={{ base: '55px', md: '65px' }}
            >
              <Highlight
                query={'Contacto'}
                styles={{
                  bgGradient: 'to-r',
                  gradientFrom: 'green.700',
                  gradientTo: 'yellow.600',
                  bgClip: 'text',
                  color: 'transparent',
                }}
              >
                {ministerio.title}
              </Highlight>
            </Heading>
          </Flex>
        </Flex>
      </Box>

      {/* --- SECCIÓN ACERCA DE --- */}
      <Flex
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'center'}
        py={{ base: '6rem', lg: '10rem' }}
        flexDir={{ base: 'column', lg: 'row' }}
        maxW={'1536px'}
        mx={'auto'}
        px={8}
        gap={{ base: 12, lg: 16 }}
      >
        <Flex
          w={'full'}
          flex={1}
          flexDirection={'column'}
          gap={8}
        >
          <Flex
            textAlign={{ base: 'center', lg: 'start' }}
            flexDir={'column'}
            w={'full'}
            gap={6}
          >
            <Heading
              as={'h2'} // <-- AJUSTE SEO 3: Jerarquía correcta
              textTransform={'uppercase'}
              fontSize={'4xl'}
              lineHeight={'1.2'}
              letterSpacing={'wide'}
            >
              Acerca de {ministerio.title}
            </Heading>
            <Text
              whiteSpace={'pre-line'}
              fontSize={{ base: 'md', md: 'lg' }}
              color={'whiteAlpha.800'}
              lineHeight={'tall'}
            >
              {ministerio.body}
            </Text>
          </Flex>

          <Box
            bg={'whiteAlpha.50'}
            p={6}
            rounded={'2xl'}
            borderLeft={'4px solid'}
            borderColor={'green.500'}
            boxShadow={'sm'}
          >
            <Text
              color="gray.300"
              fontStyle="italic"
              fontSize="md"
              lineHeight="relaxed"
            >
              {`"${ministerio.description}"`}
            </Text>
          </Box>
        </Flex>

        <Flex
          w={'full'}
          justifyContent={{
            base: 'center',
            lg: 'flex-end',
          }}
          flex={1}
        >
          <Box
            w={'full'}
            maxW={'400px'}
            rounded={'3xl'}
            overflow={'hidden'}
            bg={'whiteAlpha.50'}
            p={4}
            boxShadow={'2xl'}
            borderWidth={'1px'}
            borderColor={'whiteAlpha.100'}
          >
            <Box
              position={'relative'}
              rounded={'2xl'}
              overflow={'hidden'}
            >
              <Image
                src={ministerio.image}
                alt={ministerio.title}
                width={400}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>

      {/* --- GALERÍA CONDICIONAL --- */}
      {ministerio.gallery &&
        ministerio.gallery.length > 0 && (
          <Flex
            flexDir={'column'}
            mx={'auto'}
            maxW={'1200px'}
            w={'full'}
            px={8}
            mb={{ base: 16, md: 24 }}
            gap={8}
          >
            <Heading
              as={'h2'} // <-- AJUSTE SEO 3
              fontSize={'2xl'}
              fontWeight={'medium'}
              color={'whiteAlpha.800'}
              textTransform={'uppercase'}
              letterSpacing={'wider'}
            >
              En Acción
            </Heading>

            <Box
              display="grid"
              gridTemplateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gridAutoFlow="row dense"
              gap={6}
              gridAutoRows={{
                base: '250px',
                md: '250px',
                lg: '240px',
              }}
            >
              {ministerio.gallery
                .slice(0, 5)
                .map((img, index) => {
                  let desktopColSpan = 'span 1';
                  let desktopRowSpan = 'span 1';

                  if (index === 0) {
                    desktopColSpan = 'span 2';
                    desktopRowSpan = 'span 2';
                  } else if (index === 4) {
                    desktopColSpan = 'span 2';
                    desktopRowSpan = 'span 1';
                  }

                  return (
                    <Box
                      key={index}
                      gridColumn={{
                        base: 'span 1',
                        lg: desktopColSpan,
                      }}
                      gridRow={{
                        base: 'span 1',
                        lg: desktopRowSpan,
                      }}
                      position={'relative'}
                      rounded={'2xl'}
                      overflow={'hidden'}
                      borderWidth={'1px'}
                      borderColor={'whiteAlpha.100'}
                      boxShadow={'lg'}
                      css={{
                        '& img': {
                          transition:
                            'transform 0.4s ease-in-out',
                        },
                        '&:hover img': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Box
                        position="absolute"
                        inset={0}
                        bg="blackAlpha.200"
                        opacity={0}
                        transition="opacity 0.3s ease"
                        _hover={{ opacity: 1 }}
                        zIndex={1}
                        pointerEvents={'none'}
                      />
                      <Image
                        src={img}
                        alt={`Imagen de la galería de ${ministerio.title} ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Box>
                  );
                })}
            </Box>
          </Flex>
        )}

      {/* --- CARRUSEL --- */}
      <Box
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.100'}
        w={'full'}
      >
        <Flex
          py={{ base: 10, md: 16 }}
          px={8}
          flexDir={'column'}
          gap={{ base: 8, md: 12 }}
          maxW={'1536px'}
          w={'full'}
          mx={'auto'}
        >
          <Heading
            as={'h2'} // <-- AJUSTE SEO 3
            textAlign={'center'}
            fontSize={'3xl'}
            fontWeight={'medium'}
            color={'whiteAlpha.800'}
            letterSpacing={'wide'}
          >
            Explorar otros ministerios
          </Heading>

          <Box w={'full'} pb={8}>
            <CarouselComponent
              size="small"
              items={otrosMinisterios}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
