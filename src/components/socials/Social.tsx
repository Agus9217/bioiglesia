'use client';

import { Flex, IconButton } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const buttonVariant = 'surface';

export const Social = () => {
  return (
    <Flex gap={2} hideBelow={'md'}>
      <IconButton
        variant={buttonVariant}
        rounded={'full'}
        _hover={{ bg: 'green.700' }}
      >
        <Icon icon={'lucide:instagram'} />
      </IconButton>
      <IconButton
        variant={buttonVariant}
        rounded={'full'}
        _hover={{ bg: 'green.700' }}
      >
        <Icon icon={'lucide:facebook'} />
      </IconButton>
    </Flex>
  );
};
