'use client';

import { useState, useEffect, useRef } from 'react';
import { Social } from '@/components';
import {
  Box,
  Flex,
  Heading,
  Highlight,
  Stack,
  Text,
  Icon as ChakraIcon,
  Fieldset,
  Input,
  For,
  Field,
  NativeSelect,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function Contacto() {
  // Estados y referencias para el Lazy Loading del Iframe
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // --- ESTADOS PARA EL FORMULARIO ---
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowMap(true);
          observer.disconnect(); // Dejamos de observar una vez que carga
        }
      },
      {
        rootMargin: '200px', // Empieza a cargar 200px antes de llegar a la sección
      },
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // --- FUNCIÓN PARA ENVIAR EL FORMULARIO ---
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Guardamos la referencia ANTES del await, porque e.currentTarget
    // se vuelve null en cuanto termina la parte síncrona del handler
    const form = e.currentTarget;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries(),
    );

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset(); // Limpia el formulario usando la referencia guardada
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(
        'Error al enviar el formulario:',
        error,
      );
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
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
                Estamos aqui para ti
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
                query={'Contacto'}
                styles={{
                  bgGradient: 'to-r',
                  gradientFrom: 'green.700',
                  gradientTo: 'yellow.600',
                  bgClip: 'text',
                  color: 'transparent',
                }}
              >
                Ponte en Contacto
              </Highlight>
            </Heading>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
              maxW={'600px'}
              mx={'auto'}
            >
              <Text fontSize={'sm'}>
                Nos encantaria saber de ti. Ya sea que
                tengas preguntas sobre nuestros cultos,
                o quieras unirte a un bioterritorio, o
                necesites oracion.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* --- INFO Y FORMULARIO --- */}
      <Flex
        mx={'auto'}
        maxW={'1920px'}
        w={'full'}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={4}
        px={8}
        py={'6rem'}
      >
        <Stack flex={1} w={'full'} gap={8} p={8}>
          <Heading>Información de Contacto</Heading>
          <Stack gap={6}>
            <Flex gap={4} alignItems={'center'}>
              <Flex
                w={'fit-content'}
                rounded={'xl'}
                bg={'orange.500/20'}
                p={3}
                shadow={'lg'}
              >
                <ChakraIcon asChild color="orange.600">
                  <Icon
                    icon={'lucide:map-pin'}
                    width={20}
                    height={20}
                  />
                </ChakraIcon>
              </Flex>
              <Box>
                <Heading fontSize={'md'}>
                  Dirección
                </Heading>
                <Text
                  fontSize={'sm'}
                  color={'gray.400'}
                >
                  Honduras 2004, Libertad, Merlo
                </Text>
              </Box>
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Flex
                w={'fit-content'}
                rounded={'xl'}
                bg={'orange.500/20'}
                p={3}
                shadow={'lg'}
              >
                <ChakraIcon asChild color="orange.600">
                  <Icon
                    icon={'lucide:phone'}
                    width={20}
                    height={20}
                  />
                </ChakraIcon>
              </Flex>
              <Box>
                <Heading fontSize={'md'}>
                  Teléfono
                </Heading>
                <Text
                  fontSize={'sm'}
                  color={'gray.400'}
                >
                  +5491160399928
                </Text>
              </Box>
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Flex
                w={'fit-content'}
                rounded={'xl'}
                bg={'orange.500/20'}
                p={3}
                shadow={'lg'}
              >
                <ChakraIcon asChild color="orange.600">
                  <Icon
                    icon={'lucide:mail'}
                    width={20}
                    height={20}
                  />
                </ChakraIcon>
              </Flex>
              <Box>
                <Heading fontSize={'md'}>
                  Email
                </Heading>
                <Text
                  fontSize={'sm'}
                  color={'gray.400'}
                  asChild
                >
                  <a href="mail:info@bioiglesia.com">
                    info@bioiglesia.com
                  </a>
                </Text>
              </Box>
            </Flex>
          </Stack>
          <Social />
        </Stack>

        <Flex
          flex={1}
          w={'full'}
          justifyContent={'center'}
        >
          {/* AÑADIDO: Etiqueta <form> envolviendo el Fieldset */}
          <form
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
          >
            <Fieldset.Root
              w={'full'}
              rounded={'2xl'}
              size="lg"
              p={8}
              bg={'orange.50'}
            >
              <Stack>
                <Fieldset.Legend
                  color={'black'}
                  fontSize={'2xl'}
                  fontWeight={'black'}
                >
                  Envíanos un mensaje
                </Fieldset.Legend>
              </Stack>

              <Fieldset.Content color={'black'}>
                <Field.Root>
                  <Field.Label>Nombre</Field.Label>
                  <Input
                    variant={'subtle'}
                    rounded={'lg'}
                    css={{
                      '--focus-color':
                        'colors.orange.600',
                    }}
                    name="name" // AÑADIDO: Atributo name
                    bg={'white'}
                    placeholder="Tu nombre completo"
                    required // AÑADIDO: Campo obligatorio
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input
                    variant={'subtle'}
                    rounded={'lg'}
                    css={{
                      '--focus-color':
                        'colors.orange.600',
                    }}
                    name="email" // AÑADIDO: Atributo name
                    type="email"
                    bg={'white'}
                    placeholder="tucorreo@ejemplo.com"
                    required // AÑADIDO: Campo obligatorio
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Asunto</Field.Label>
                  <NativeSelect.Root
                    variant={'subtle'}
                    colorPalette={'orange'}
                    css={{
                      '--focus-color':
                        'colors.orange.600',
                    }}
                  >
                    <NativeSelect.Field
                      name="asunto" // AÑADIDO: Atributo name
                      bg={'white'}
                      rounded={'lg'}
                    >
                      <For
                        each={[
                          'Quiero más información',
                          'Petición de oración',
                          'Otro',
                        ]}
                      >
                        {(item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                {/* CORRECCIÓN: Textarea movido dentro del Fieldset.Content */}
                <Field.Root>
                  <Field.Label color={'black'}>
                    Mensaje
                  </Field.Label>
                  <Textarea
                    colorPalette={'orange'}
                    variant={'subtle'}
                    rounded={'lg'}
                    css={{
                      '--focus-color':
                        'colors.orange.600',
                    }}
                    name="notes" // AÑADIDO: Atributo name
                    bg={'white'}
                    color={'black'}
                    placeholder="¿Como podemos ayudarte?"
                    required // AÑADIDO: Campo obligatorio
                  />
                </Field.Root>
              </Fieldset.Content>

              {/* AÑADIDO: Mensajes de estado del envío */}
              {submitStatus === 'success' && (
                <Text
                  color="green.600"
                  fontWeight="bold"
                >
                  ¡Mensaje enviado con éxito! Te
                  contactaremos pronto.
                </Text>
              )}
              {submitStatus === 'error' && (
                <Text
                  color="red.600"
                  fontWeight="bold"
                >
                  Hubo un error al enviar el mensaje.
                  Inténtalo de nuevo.
                </Text>
              )}

              <Button
                w={'full'}
                colorPalette={'orange'}
                color={'white'}
                rounded={'lg'}
                type="submit"
                alignSelf="flex-start"
                textTransform={'uppercase'}
                fontWeight={'bold'}
                gap={2} // AÑADIDO: Espaciado para el ícono
                disabled={isSubmitting} // AÑADIDO: Deshabilitar mientras carga
              >
                {isSubmitting
                  ? 'Enviando...'
                  : 'Enviar Mensaje'}
                {!isSubmitting && (
                  <Icon
                    icon={'lucide:send-horizontal'}
                  />
                )}
              </Button>
            </Fieldset.Root>
          </form>
        </Flex>
      </Flex>

      {/* --- SECCIÓN VISÍTANOS --- */}
      <Flex
        h={'100svh'}
        p={8}
        bgGradient="to-br"
        gradientFrom="black/95"
        gradientTo="green.900/80"
        w={'full'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Stack
          bg={'bg.subtle'}
          justifyContent={'center'}
          alignItems={'center'}
          textAlign={'center'}
          gap={{ base: 4, md: 8 }}
          rounded={'2xl'}
          shadow={'lg'}
          p={10}
        >
          <Flex
            rounded={'full'}
            bg={'green.500/20'}
            p={3}
            shadow={'lg'}
          >
            <ChakraIcon asChild color="green.600">
              <Icon
                icon={'lucide:church'}
                width={28}
                height={28}
              />
            </ChakraIcon>
          </Flex>
          <Heading
            fontSize={{ base: 'xl', md: '4xl' }}
          >
            Visítanos este Domingo
          </Heading>
          <Text
            maxW={'600px'}
            color={'fg.subtle'}
            fontSize={{ base: 'sm' }}
          >
            Ven a disfrutar de la presencia de Dios
            junto con nosotros, juntos vamos a escuchar
            de su palabra y conocer mas de su persona.
          </Text>
          <Box
            bg={'bg.emphasized'}
            p={{ base: 4, md: 6 }}
            rounded={'xl'}
            shadow={'lg'}
          >
            <Text
              color={'orange.600'}
              textTransform={'uppercase'}
              fontWeight={'bold'}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              Honduras 2004
            </Text>
            <Text>19:00hs</Text>
          </Box>
          <a href="#church">
            <Flex
              alignItems={'center'}
              gap={2}
              justifyContent={'center'}
              color={'green.700'}
            >
              <Text>Ver como llegar</Text>
              <Icon icon={'lucide:arrow-right'} />
            </Flex>
          </a>
        </Stack>
      </Flex>

      {/* --- SECCIÓN DEL MAPA OPTIMIZADO --- */}
      <Box
        w={'full'}
        h={'100vh'}
        id="church"
        ref={mapRef}
        bg="blackAlpha.300" // Fondo oscuro sutil mientras carga
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {showMap ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2856.9849129249833!2d-58.672883500000005!3d-34.711045399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc1587ef0a8e3%3A0x94c8a6f9bc8a8d82!2sBioiglesia%20-%20Iglesia%20Evang%C3%A9lica%20en%20Barrio%20Nuevo!5e1!3m2!1ses!2sar!4v1774550930873!5m2!1ses!2sar" // Recuerda poner aquí la URL real de tu mapa de Google
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <Text color="gray.500">
            Cargando mapa...
          </Text>
        )}
      </Box>
    </>
  );
}
