import {
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import { CarouselComponent } from '../carousel/CarouselComponent';
import { ministeriosItems } from '@/app/(pages)/ministerios/[slug]/data/ministerios';

// 1. Cambiamos la importación para traer el array que refactorizamos
// (Ajusta la ruta '@/data/ministerios' según dónde hayas guardado el archivo final)

export const Ministerios = () => {
  return (
    <Flex
      flexDir={'column'}
      w={'full'}
      justifyContent={'center'}
      py={'100px'}
    >
      <HStack justifyContent={'center'} pb={8}>
        <Flex h={'1px'} w={'80px'} bg={'green.700'} />
        <Text
          flexShrink={'0'}
          textTransform={'uppercase'}
          letterSpacing={'4px'}
          fontWeight={'bold'}
          color={'green.700'}
          fontSize={'sm'}
        >
          Ministerios
        </Text>
        <Flex h={'1px'} w={'80px'} bg={'green.700'} />
      </HStack>
      <Flex
        textAlign={'center'}
        justifyContent={'center'}
        pb={{ base: '80px', md: '100px' }}
      >
        <Heading
          fontWeight={'bold'}
          fontSize={{ base: '5xl', md: '7xl' }}
          lineHeight={'45px'}
        >
          Nuestros Ministerios
        </Heading>
      </Flex>

      {/* 2. Le pasamos el nuevo array 'ministeriosItems' */}
      <CarouselComponent items={ministeriosItems} />
    </Flex>
  );
};
