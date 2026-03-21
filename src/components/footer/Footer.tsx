import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Input,
  List,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Social } from '../socials/Social';
import { navItems } from '../navbar/navItems';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Stack
      borderTopWidth={'1px'}
      w={'full'}
      bg={'black'}
      direction={'column'}
      px={4}
      py={10}
      justifyContent={'center'}
      alignItems={'center'}
      gap={8}
    >
      <Flex
        maxW={'1920px'}
        w={'full'}
        alignItems={'stretch'}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={8}
      >
        <Flex
          alignItems={{ base: 'center', md: 'start' }}
          textAlign={{ base: 'center', md: 'start' }}
          direction={'column'}
          grow={1}
          w={'full'}
          gap={8}
        >
          <Heading
            fontWeight={'800'}
            textTransform={'uppercase'}
            fontSize={'2xl'}
          >
            <Highlight
              query={'Bio'}
              styles={{ color: 'green.700' }}
            >
              Bioiglesia
            </Highlight>
          </Heading>
          <Text fontSize={'sm'} maxW={'300px'}>
            Es nuestra casa, unete con nosotros
            adoremos a Dios con fe, esperanza y amor,
            descubramos sus propositos juntos.
          </Text>
          <Social />
        </Flex>
        <Flex
          w={'full'}
          grow={1}
          textAlign={'center'}
          direction={'column'}
          gap={6}
        >
          <Text
            color={'orange.600'}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'2px'}
            fontSize={'sm'}
          >
            Links rapidos
          </Text>
          <List.Root listStyle={'none'}>
            {navItems.map(({ label, href }) => (
              <List.Item key={label}>
                <ChakraLink
                  asChild
                  _focus={{
                    boxShadow: 'none',
                    outline: 'none',
                  }}
                  _focusVisible={{
                    boxShadow: 'none',
                    outline: 'none',
                  }}
                >
                  <Link href={href}>{label}</Link>
                </ChakraLink>
              </List.Item>
            ))}
          </List.Root>
        </Flex>
        <Flex
          w={'full'}
          grow={1}
          alignItems={'center'}
          flexDirection={'column'}
          gap={8}
        >
          <Text
            color={'orange.600'}
            textTransform={'uppercase'}
            fontWeight={'bold'}
            letterSpacing={'2px'}
            fontSize={'sm'}
          >
            Estemos conectados
          </Text>
          <Flex
            flexDirection={'column'}
            w={'full'}
            gap={4}
          >
            <Input
              placeholder="Ingrese email"
              rounded={'xl'}
            />
            <Button rounded={'xl'}>Enviar</Button>
          </Flex>
        </Flex>
      </Flex>
      <Box
        borderWidth={'1px'}
        borderColor={'gray.900'}
        w={'full'}
        maxW={'1024px'}
      />
      <Flex>
        <Text>
          BIOIGLESIA Todos los derechos reservados
          &copy; {new Date().getFullYear()}
        </Text>
      </Flex>
    </Stack>
  );
};
