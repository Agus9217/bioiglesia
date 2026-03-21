import {
  List,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { navItems } from './navItems';
import Link from 'next/link';

export const NavDesktop = () => {
  return (
    <List.Root
      px={4}
      listStyle={'none'}
      flexDirection={'row'}
      gap={2}
      alignItems={'center'}
      justifyContent={'center'}
      hideBelow={'md'}
      textTransform={'uppercase'}
    >
      {navItems.map(({ label, href }) => (
        <List.Item key={label}>
          <ChakraLink
            asChild
            fontWeight={'bold'}
            letterSpacing={'2px'}
            fontSize={'sm'}
            position={'relative'}
            h={'100%'}
            p={0}
            m={0}
            _hover={{
              textDecoration: 'none',
              _after: {
                opacity: 1,
              },
            }}
            _after={{
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '3px',
              bottom: '-4px',
              left: 0,
              backgroundColor: 'green.700',
              rounded: 'full',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
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
  );
};
