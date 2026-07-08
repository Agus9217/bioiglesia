import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Text,
} from '@chakra-ui/react';
import heroImg from '@/assets/img/hero-iglesia.webp';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export const Hero = () => {
  return (
    <Box
      position={'relative'}
      w={'100%'}
      h={'100svh'}
      overflow="hidden"
      zIndex={0}
      bgGradient="to-br"
      gradientFrom="black/90"
      gradientTo="green.900"
    >
      <Flex
        justifyContent={'center'}
        gap={4}
        position={'absolute'}
        top={'55%'}
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
              Bienvenido
            </Text>
          </Flex>
          <Heading
            fontWeight={'bold'}
            fontSize={{ base: '6xl', md: '7xl' }}
            lineHeight={{ base: '55px', md: '65px' }}
          >
            <Highlight
              query={'tu iglesia'}
              styles={{
                bgGradient: 'to-r',
                gradientFrom: 'orange.400',
                gradientTo: 'red.600',
                bgClip: 'text',
                color: 'transparent',
              }}
            >
              Bioiglesia nuestra iglesia tu iglesia
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
            <Text textStyle={'italic'} fontSize={'sm'}>
              Iglesia centrada en la adoración a Cristo
              y el crecimiento natural dado por Dios
            </Text>
          </Flex>
          <Flex
            gap={4}
            flexDirection={{
              base: 'column',
              lg: 'row',
            }}
          >
            <Button
              asChild
              size={'xl'}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              rounded={'full'}
              _hover={{
                bg: 'green',
                color: 'white',
              }}
            >
              <a href="/contacto">
                Visítanos el domingo
              </a>
              <Icon icon={'lucide:arrow-right'} />
            </Button>
            <Button
              asChild
              size={'xl'}
              variant={'outline'}
              borderColor={'white'}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              rounded={'full'}
              _hover={{
                borderColor: 'green',
                color: 'green',
                bg: 'none',
              }}
            >
              <a
                href="https://www.youtube.com/@BIOIGLESIA/streams"
                target="_blank"
              >
                Mirar en vivo
              </a>
              <Icon icon={'lucide:circle-play'} />
            </Button>
          </Flex>
        </Flex>
        <Flex grow={1} w={'full'} hideBelow={'lg'}>
          <Box
            position={'relative'}
            w={'full'}
            h={'full'}
            rounded={'2xl'}
            overflow={'hidden'}
            shadow={'lg'}
          >
            <Image
              src={heroImg}
              alt="Imagen de la iglesia"
              loading="eager"
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Box>
          <Flex
            position={'absolute'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            p={4}
            rounded={'2xl'}
            shadow={'lg'}
            bg={'yellow.500'}
            w={'230px'}
            h={'130px'}
            color={'black'}
            textTransform={'uppercase'}
            bottom={'20px'}
            right={'-50px'}
          >
            <Text fontWeight={'black'} fontSize={'xs'}>
              Honduras 2004
            </Text>
            <Text
              fontWeight={'black'}
              fontSize={'4xl'}
            >
              19:00 hs
            </Text>
            <Text fontWeight={'black'}>Domingos</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
