'use client'; // <-- Fundamental agregarlo para poder usar useState

import { useState } from 'react';
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
  // 1. Creamos el estado para guardar el email ingresado
  const [emailInput, setEmailInput] = useState('');

  // 2. Función que arma el enlace mailto y lo ejecuta
  const handleEnviar = () => {
    // Evitamos que haga algo si el input está vacío
    if (!emailInput.trim()) return;

    // Codificamos el texto para que los espacios y arrobas sean válidos en una URL
    const asunto = encodeURIComponent(
      `${emailInput} quiere comunicarse con bioiglesia`,
    );

    // Abrimos el cliente de correo del usuario
    window.location.href = `mailto:info@bioiglesia.com?subject=${asunto}`;

    // Opcional: Limpiar el input después de hacer clic
    setEmailInput('');
  };

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
              type="email"
              // 3. Conectamos el input al estado
              value={emailInput}
              onChange={(e) =>
                setEmailInput(e.target.value)
              }
              // Opcional: Permitir enviar presionando "Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEnviar();
              }}
            />
            <Button
              rounded={'xl'}
              onClick={handleEnviar} // 4. Ejecutamos la función al hacer clic
            >
              Enviar
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Box
        borderWidth={'1px'}
        borderColor={'gray.900'}
        w={'full'}
        maxW={'1024px'}
      />
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        textAlign={'center'}
      >
        <Text>
          BIOIGLESIA Todos los derechos reservados
          &copy; {new Date().getFullYear()}
        </Text>
      </Flex>
    </Stack>
  );
};
