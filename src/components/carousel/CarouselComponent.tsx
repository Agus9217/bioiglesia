'use client';

import { ministriesImages } from '@/assets/img/ministerios';
import {
  Box,
  Carousel,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const items = Object.entries(ministriesImages);

console.log(items);

export const CarouselComponent = () => {
  const slidesCount = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
    '2xl': 4,
  });
  return (
    <Carousel.Root
      autoplay
      slideCount={items.length}
      maxW="1920px"
      w={'full'}
      mx="auto"
      slidesPerPage={slidesCount}
      px={{ base: 4, lg: '12' }}
    >
      <Carousel.ItemGroup w="full">
        {items.map(([key, ministry], index) => (
          <Carousel.Item
            key={key}
            index={index}
            w="full"
            maxW={'320px'}
            aspectRatio={2 / 3}
          >
            <Link href={ministry.href} passHref>
              <Box
                position="relative"
                h={'full'}
                w={'full'}
                rounded="2xl"
                overflow="hidden"
              >
                <Image
                  fill
                  src={ministry.image}
                  alt={ministry.label}
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    zIndex: 0,
                  }}
                />

                <Flex
                  position="absolute"
                  inset={0}
                  zIndex={2}
                  alignItems="center"
                  justifyContent="center"
                  bg="rgba(0,0,0,0.8)"
                  opacity={0}
                  transition="opacity 0.2s ease"
                  _hover={{ opacity: 1 }}
                >
                  <Heading
                    color="white"
                    fontWeight="bold"
                    fontSize={{ base: '5xl' }}
                    lineHeight={'50px'}
                    textAlign="center"
                    px={4}
                    letterSpacing={'4px'}
                  >
                    {ministry.label}
                  </Heading>
                </Flex>
              </Box>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  );
};
