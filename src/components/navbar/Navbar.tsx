import {
  Flex,
  Heading,
  Highlight,
  Stack,
} from '@chakra-ui/react';
import { NavMobile } from './NavMobile';
import Image from 'next/image';
import { NavDesktop } from './NavDesktop';
import { Social } from '@/components';

export const Navbar = () => {
  return (
    <Stack
      as={'header'}
      bg={'black'}
      minH={'70px'}
      w={'full'}
      justifyContent={'center'}
      px={4}
      position={'fixed'}
      boxShadow={'md'}
      zIndex={1000}
    >
      <Flex
        maxW={'1920px'}
        w={'full'}
        mx={'auto'}
        as={'nav'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Image
            src={'/logo.png'}
            alt="Logo Bioiglesia"
            width={40}
            height={40}
          />
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
          <NavDesktop />
        </Flex>
        <NavMobile />
        <Social />
      </Flex>
    </Stack>
  );
};
