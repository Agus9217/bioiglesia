'use client';

import {
  Box,
  Carousel,
  useBreakpointValue,
} from '@chakra-ui/react';
import Image, {
  type StaticImageData,
} from 'next/image';

type MinistryItem = {
  href: string;
  image: string | StaticImageData;
  label: string;
};

type MinistriesImages = Record<string, MinistryItem>;

type CarouselComponentProps = {
  ministriesImages: MinistriesImages;
};

export const CarouselWorks = ({
  ministriesImages,
}: CarouselComponentProps) => {
  const items = Object.entries(ministriesImages);

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
      w="full"
      mx="auto"
      slidesPerPage={slidesCount ?? 1}
      px={{ base: 4, lg: '12' }}
    >
      <Carousel.ItemGroup w="full">
        {items.map(([key, ministry], index) => (
          <Carousel.Item
            key={key}
            index={index}
            w="full"
            maxW="320px"
            aspectRatio={2 / 3}
          >
            <Box
              position="relative"
              h="full"
              w="full"
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
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  );
};
