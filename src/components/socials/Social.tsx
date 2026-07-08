'use client';

import { Flex, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const buttonVariant = 'surface';

export const Social = () => {
  return (
    <Flex gap={2} hideBelow={'md'}>
      <IconButton
        asChild
        variant={buttonVariant}
        rounded={'full'}
        _hover={{ bg: 'green.700' }}
      >
        <Link
          href={
            'https://www.instagram.com/bio_iglesia/'
          }
          target={'_blank'}
        >
          <Icon icon={'lucide:instagram'} />
        </Link>
      </IconButton>
      <IconButton
        variant={buttonVariant}
        rounded={'full'}
        _hover={{ bg: 'green.700' }}
      >
        <Link
          href={'https://www.youtube.com/@BIOIGLESIA'}
          target={'_blank'}
        >
          <Icon icon={'lucide:youtube'} />
        </Link>
      </IconButton>
    </Flex>
  );
};
