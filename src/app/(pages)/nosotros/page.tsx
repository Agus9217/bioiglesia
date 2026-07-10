import heroImg from '@/assets/img/hero-iglesia.webp';
import { Leaders } from '@/components';
import {
  Box,
  Flex,
  Heading,
  Highlight,
  Stack,
  Text,
  Icon as ChakraIcon,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

// app/(pages)/nosotros/page.tsx (o la ruta donde esté)
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Nosotros',
  description:
    'Conoce la historia, visión y propósitos de Bioiglesia. Somos una iglesia cristiana en Barrio Nuevo, Merlo, centrada en amar a Dios y a nuestra comunidad.',
  canonical: '/nosotros', // <-- 1. Agregamos la propiedad canonical
});

export default function Nosotros() {
  return (
    <>
      <Box
        w={'100%'}
        h={'100svh'}
        position={'relative'}
        backgroundImage={`url(${heroImg.src})`}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
      >
        <Box
          position={'absolute'}
          inset={0}
          bgGradient="to-br"
          gradientFrom="black/95"
          gradientTo="green.900/80"
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
          maxW={{ base: '85%', '2xl': '1920px' }}
          h={'70%'}
          zIndex={2}
        >
          <Flex
            grow={1}
            w={'full'}
            flexDirection={'column'}
            gap={{ base: 6, md: 8 }}
            justifyContent={'center'}
          >
            <Flex alignItems={'center'} gap={2}>
              <Box
                w={'50px'}
                h={'2px'}
                bg={'green.700'}
              />
              <Text
                fontWeight={'bold'}
                textTransform={'uppercase'}
                fontSize={'xs'}
                letterSpacing={'4px'}
                color={'green.700'}
              >
                Sobre nosotros
              </Text>
            </Flex>
            <Heading
              fontWeight={'bold'}
              fontSize={{ base: '6xl', md: '7xl' }}
              lineHeight={{ base: '55px', md: '65px' }}
            >
              <Highlight
                query={'Historia'}
                styles={{
                  bgGradient: 'to-r',
                  gradientFrom: 'green.700',
                  gradientTo: 'yellow.600',
                  bgClip: 'text',
                  color: 'transparent',
                }}
              >
                Nuestra Historia
              </Highlight>
            </Heading>
            <Flex
              alignItems={'center'}
              gap={4}
              maxW={'300px'}
            >
              <Box
                w={'6px'}
                h={'70px'}
                bg={'green.700'}
              />
              <Text
                textStyle={'italic'}
                fontSize={'sm'}
              >
                Acércate y descubre una iglesia
                sirviendo con fe y compromiso.
              </Text>
            </Flex>
            <Text
              fontSize={'sm'}
              color={'gray.400'}
              maxW={'500px'}
              w={'full'}
            >
              Llevamos muchos años de ministerio
              sirviendo a Dios y a nuestra comunidad,
              compartiendo el mensaje de amor y
              esperanza. Nos encontramos en Barrio
              Nuevo, Libertad, donde seguimos creciendo
              en fe y unidad. ¡Te esperamos!
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        textAlign={'center'}
        justifyContent={'center'}
        py={{ base: '80px' }}
        flexDirection={'column'}
        gap={20}
      >
        <Heading
          fontWeight={'bold'}
          fontSize={{ base: '5xl', md: '7xl' }}
          lineHeight={'45px'}
        >
          Quienes somos
        </Heading>
        <Flex
          maxW={'1024px'}
          w={'full'}
          px={4}
          mx={'auto'}
          textAlign={'center'}
          justifyContent={'center'}
        >
          <Text maxW={'md'}>
            Bioiglesia, esta centrada en Cristo,
            dedicada a la adoración, el crecimiento
            natural dado por Dios y el servicio al
            prójimo. Creemos en crear un espacio donde
            las personas puedan encontrar a Dios con
            autenticidad, profundizar su fe y forjar
            relaciones afectivas.
          </Text>
        </Flex>
      </Flex>
      <Stack
        px={8}
        mb={10}
        direction={{ base: 'column', md: 'row' }}
        gap={8}
        maxW={'1920px'}
        mx={'auto'}
        w={'full'}
      >
        <Flex
          grow={1}
          w={'full'}
          bg={'bg.subtle'}
          shadow={'lg'}
          h={'full'}
          rounded={'xl'}
          justifyContent={'center'}
          flexDirection={'column'}
          p={8}
          gap={6}
        >
          <Flex
            alignSelf={'start'}
            w={'fit-content'}
            rounded={'xl'}
            bg={'orange.500/20'}
            p={3}
            shadow={'lg'}
          >
            <ChakraIcon asChild color="orange.600">
              <Icon
                icon={'lucide:church'}
                width={28}
                height={28}
              />
            </ChakraIcon>
          </Flex>
          <Heading>Propósito</Heading>
          <Text
            fontSize={'sm'}
            maxW={'xs'}
            color={'gray.400'}
          >
            El propósito de nuestra iglesia es alcanzar
            un equilibrio radical en tres aspectos
            esenciales. Amar a Dios como respuesta de
            que el nos amó primero, amarnos entre
            nosotros como un mandamiento nuevo y amar
            al mundo como misión y voluntad de Cristo.
          </Text>
        </Flex>
        <Flex
          grow={1}
          w={'full'}
          bg={'bg.subtle'}
          shadow={'lg'}
          h={'full'}
          rounded={'xl'}
          justifyContent={'center'}
          flexDirection={'column'}
          p={8}
          gap={6}
        >
          <Flex
            alignSelf={'start'}
            w={'fit-content'}
            rounded={'xl'}
            bg={'green.500/20'}
            p={3}
            shadow={'lg'}
          >
            <ChakraIcon asChild color="green.600">
              <Icon
                icon={'lucide:users'}
                width={28}
                height={28}
              />
            </ChakraIcon>
          </Flex>
          <Heading>Bioterritorios</Heading>
          <Text
            fontSize={'sm'}
            maxW={'xs'}
            color={'gray.400'}
          >
            Los Bioterritorios de la iglesia organizan.
            reuniones en barrios para compartir fe
            fortaleciendo la comunión y la enseñanza de
            la palabra de Dios en cada barrio.
            acompañando a personas que buscan a Dios. y
            guiándoles crecer en fe y vida cristiana.
          </Text>
        </Flex>
        <Flex
          grow={1}
          w={'full'}
          bg={'bg.subtle'}
          shadow={'lg'}
          h={'full'}
          rounded={'xl'}
          justifyContent={'center'}
          flexDirection={'column'}
          p={8}
          gap={6}
        >
          <Flex
            alignSelf={'start'}
            w={'fit-content'}
            rounded={'xl'}
            bg={'blue.500/20'}
            p={3}
            shadow={'lg'}
          >
            <ChakraIcon asChild color="blue.600">
              <Icon
                icon={'lucide:handshake'}
                width={28}
                height={28}
              />
            </ChakraIcon>
          </Flex>
          <Heading>Servicio</Heading>
          <Text
            fontSize={'sm'}
            maxW={'xs'}
            color={'gray.400'}
          >
            La iglesia sirve en la ciudad de Libertad
            llevando el mensaje de Cristo a barrios
            compartiendo esperanza y amor de Dios en
            cada rincón de nuestra comunidad local.
            alcanzando a personas que buscan a Dios. y
            guiándoles crecer en fe y vida cristiana.
          </Text>
        </Flex>
      </Stack>
      <Leaders />
    </>
  );
}
