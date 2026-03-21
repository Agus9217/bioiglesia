import {
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';
import {
  Plus_Jakarta_Sans,
  Noto_Sans,
} from 'next/font/google';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: {
          value: `${noto_sans.style.fontFamily}, sans-serif`,
        },
        heading: {
          value: `${jakarta.style.fontFamily}, sans-serif`,
        },
      },
    },
  },
});

export const system = createSystem(
  defaultConfig,
  customConfig,
);
