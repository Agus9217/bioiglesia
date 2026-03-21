import { ministriesImages } from '@/assets/img/ministerios';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Highlight,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function Ministerios() {
  const items = Object.entries(ministriesImages);

  return (
    <>
      <Box
        w={'100%'}
        h={'100svh'}
        position={'relative'}
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
                Servicio
              </Text>
              <Box
                w={'50px'}
                h={'2px'}
                bg={'orange.600'}
              />
            </Flex>
            <Heading
              fontWeight={'bold'}
              fontSize={{ base: '6xl', md: '7xl' }}
              lineHeight={{ base: '55px', md: '65px' }}
            >
              <Highlight
                query={'Ministerios'}
                styles={{
                  bgGradient: 'to-r',
                  gradientFrom: 'green.700',
                  gradientTo: 'yellow.600',
                  bgClip: 'text',
                  color: 'transparent',
                }}
              >
                Nuestros Ministerios
              </Highlight>
            </Heading>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
              maxW={'600px'}
              mx={'auto'}
            >
              <Text
                textStyle={'italic'}
                fontSize={'sm'}
              >
                Dios nos regalo ministerios para que
                podamos servir a los demás, y así
                cumplir con el propósito de la iglesia,
                que es hacer discípulos. En esta
                sección podrás conocer cada uno de los
                ministerios que tenemos en la iglesia.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        my={'6rem'}
        maxW={'1700px'}
        w={'full'}
        mx={'auto'}
        gap={6}
        p={8}
        justifyContent={'center'}
        alignItems={'center'}
        wrap={'wrap'}
      >
        {items.map(([key, ministry]) => (
          <Box
            key={key}
            w={'full'}
            aspectRatio={2 / 3}
            maxW={'320px'}
            rounded={'2xl'}
            overflow={'hidden'}
            position={'relative'}
          >
            <Image
              fill
              src={ministry.image}
              alt={ministry.label}
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
                fontSize={{ base: '5xl' }}
                lineHeight={'50px'}
                textAlign="center"
                px={4}
                letterSpacing={'4px'}
              >
                {ministry.label}
              </Heading>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  );
}
