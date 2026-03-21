import {
  Avatar,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export const Leaders = () => {
  return (
    <Stack
      mx={'auto'}
      w={'full'}
      maxW={'1920px'}
      px={6}
      py={{ base: '5rem', md: '8rem' }}
      gap={20}
    >
      <Box>
        <Flex alignItems={'center'} gap={2}>
          <Box w={'50px'} h={'2px'} bg={'green.700'} />
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            fontSize={'xs'}
            letterSpacing={'4px'}
            color={'green.700'}
          >
            Liderazgo
          </Text>
        </Flex>
        <Heading
          fontWeight={'bold'}
          fontSize={{ base: '4xl', md: '5xl' }}
          lineHeight={{ base: '55px', md: '65px' }}
        >
          Algunos de nuestros líderes
        </Heading>
      </Box>

      <Flex
        gap="8"
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        {users.map((user) => (
          <Stack
            key={user.id}
            gap="4"
            alignItems={'center'}
            width={{ base: 'full', sm: '260px' }}
          >
            <Avatar.Root
              w={'150px'}
              h={'150px'}
              outlineWidth="6px"
              outlineColor="green.700"
              outlineOffset="4px"
              outlineStyle="solid"
            >
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.avatar} />
            </Avatar.Root>
            <Stack
              gap="0"
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Text fontWeight="medium">
                {user.name}
              </Text>
              <Text
                color="fg.muted"
                textStyle="sm"
                textAlign={'center'}
              >
                {user.description}
              </Text>
            </Stack>
          </Stack>
        ))}
      </Flex>
    </Stack>
  );
};

const users = [
  {
    id: '1',
    name: 'Lucas Gutierrez',
    description: 'Pastor y maestro en Bioiglesia',
    avatar: '/lideres/pastor.png',
  },
  {
    id: '2',
    name: 'Maria del Carmen Paez',
    description: 'Pastora y maestra en Bioiglesia',
    avatar: '/lideres/pastora.png',
  },
  {
    id: '3',
    name: 'Priscila Gutierrez',
    description:
      'Periodista y profesora en periodismo. Conductora radial del programa "Vamos con todo"',
    avatar: '/lideres/pri.png',
  },
  {
    id: '4',
    name: 'Karen Guttierrez',
    description:
      'Profesora en educación especial y líder del ministerio Extremados',
    avatar: '/lideres/karen.png',
  },
  {
    id: '5',
    name: 'Rodolfo Contreras',
    description:
      'Líder y maestro en Bioiglesia, profesor en sectas, Daniel y Apocalipsis, entre otras.',
    avatar: '/lideres/rolo.png',
  },
  {
    id: '6',
    name: 'Lautaro Contreras',
    description:
      'Profesor de música y líder del ministerio MAAOC',
    avatar: '/lideres/lauty.png',
  },
];
