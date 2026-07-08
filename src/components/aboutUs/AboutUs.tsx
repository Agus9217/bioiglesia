import {
  Blockquote,
  Box,
  Button,
  Flex,
  Float,
  Heading,
  Highlight,
  Text,
  Icon as ChakraIcon,
} from '@chakra-ui/react';
import imgAboutUs from '@/assets/img/portada-4.jpg';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export const AboutUs = () => {
  return (
    <Flex
      w={'full'}
      bg={'yellow.50'}
      px={8}
      py={'100px'}
    >
      <Flex
        maxW={'1920px'}
        w={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        mx={'auto'}
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Flex
          grow={1}
          w={'full'}
          color={'black'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Flex
            flexDirection={'column'}
            gap={10}
            justifyContent={'center'}
          >
            <Heading
              fontSize={'5xl'}
              lineHeight={1}
              fontWeight={'black'}
            >
              <Highlight
                query={'tu iglesia'}
                styles={{
                  color: 'green.700',
                  borderBottom: '5px solid #ed5a2f',
                }}
              >
                Bienvenido a Bioiglesia, tu iglesia
              </Highlight>
            </Heading>
            <Text fontSize={'sm'}>
              El propósito de nuestra iglesia es
              alcanzar un equilibrio radical en tres
              aspectos esenciales. Amar a Dios como
              respuesta de que el nos amó primero,
              amarnos entre nosotros como un
              mandamiento nuevo y amar al mundo como
              misión y voluntad de Cristo.
            </Text>
            <Flex
              gap={6}
              flexDirection={{
                base: 'column',
                xl: 'row',
              }}
            >
              <Flex
                grow={1}
                w={'full'}
                alignItems={'center'}
                gap={4}
              >
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  rounded={'full'}
                  bg={'green.700'}
                  p={2}
                  shadow={'md'}
                >
                  <ChakraIcon
                    size={'xl'}
                    color={'white'}
                  >
                    <Icon icon={'lucide:church'} />
                  </ChakraIcon>
                </Flex>

                <Text
                  fontSize={'xs'}
                  fontWeight={'bold'}
                >
                  Bioiglesia, esta centrada en Cristo,
                  dedicada a la adoración, el
                  crecimiento natural dado por Dios.
                </Text>
              </Flex>
              <Flex
                grow={1}
                w={'full'}
                alignItems={'center'}
                gap={4}
              >
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  bg={'orange.600'}
                  rounded={'full'}
                  p={2}
                  shadow={'md'}
                >
                  <ChakraIcon
                    size={'xl'}
                    color={'white'}
                  >
                    <Icon icon={'lucide:hand-heart'} />
                  </ChakraIcon>
                </Flex>
                <Text
                  fontSize={'xs'}
                  fontWeight={'bold'}
                >
                  Creemos en crear un espacio donde las
                  personas puedan encontrar a Dios con
                  autenticidad, profundizar su fe y
                  forjar relaciones afectivas
                </Text>
              </Flex>
            </Flex>
            <Flex>
              <Button
                variant={'subtle'}
                colorPalette={'gray'}
                textTransform={'uppercase'}
                fontWeight={'bold'}
                size={'xl'}
                rounded={'full'}
                shadow={'lg'}
                asChild
              >
                <a href="/nosotros">
                  Ver más sobre nosotros
                </a>{' '}
                <Icon icon={'lucide:arrow-up-right'} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          position={'relative'}
          grow={1}
          w={'full'}
          alignItems={'center'}
          justifyContent={{
            base: 'center',
            xl: 'end',
          }}
          order={{ base: '-1', lg: 1 }}
        >
          <Box
            w={{ base: '250px', md: '500px' }}
            h={{ base: '250px', md: '500px' }}
            rounded={'full'}
            overflow={'hidden'}
            borderWidth={'10px'}
            borderColor={'green.700'}
            mb={{ base: 8, xl: 0 }}
            shadow={'lg'}
          >
            <Image
              src={imgAboutUs}
              alt="Portada sobre nosotros"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
          <Flex
            position={'absolute'}
            w={'250px'}
            h={'150px'}
            bg={'bg'}
            bottom={'20px'}
            right={'18rem'}
            rounded={'2xl'}
            shadow={'lg'}
            rotate={'6deg'}
            alignItems={'center'}
            justifyContent={'center'}
            px={6}
            hideBelow={'md'}
          >
            <Blockquote.Root variant={'plain'}>
              <Float
                placement={'top-start'}
                offsetY={'2'}
              >
                <Blockquote.Icon
                  color={'orange.600'}
                />
              </Float>
              <Blockquote.Content fontSize={'sm'}>
                Yo planté, Apolos regó; pero el
                crecimiento lo ha dado Dios.
                <Text py={2}>1 Corintios 3:6</Text>
              </Blockquote.Content>
            </Blockquote.Root>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
