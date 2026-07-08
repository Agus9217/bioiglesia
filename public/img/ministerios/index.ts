import maaocImg from '@/assets/img/ministerios/maaoc.png';
import ediImg from '@/assets/img/ministerios/escuela-edi.png';
import extremadosImg from '@/assets/img/ministerios/extremados.png';
import mayordomiaImg from '@/assets/img/ministerios/mayordomia.png';
import intercesionImg from '@/assets/img/ministerios/intercesion.png';
import piedraImg from '@/assets/img/ministerios/piedra-angular.png';
import estimulosImg from '@/assets/img/ministerios/estimulos-espirituales.png';
import gruposImg from '@/assets/img/ministerios/grupos-la-red.png';

export const ministriesImages = {
  maaoc: {
    image: maaocImg,
    label: 'Ministerio de M.A.A.O.C',
    href: '/ministerios/maaoc',
  },
  edi: {
    image: ediImg,
    label: 'Ministerio de Escuela Edi',
    href: '/ministerios/escuela-edi',
  },
  extremados: {
    image: extremadosImg,
    label: 'Ministerio de Extremados',
    href: '/ministerios/extremados',
  },
  intercesion: {
    image: intercesionImg,
    label: 'Ministerio de Intercesión',
    href: '/ministerios/intercesion',
  },
  mayordomia: {
    image: mayordomiaImg,
    label: 'Ministerio de Mayordomía',
    href: '/ministerios/mayordomia',
  },
  piedra: {
    image: piedraImg,
    label: 'Ministerio de Piedra Angular',
    href: '/ministerios/piedra-angular',
  },
  estimulos: {
    image: estimulosImg,
    label: 'Ministerio de Estímulos Espirituales',
    href: '/ministerios/estimulos-espirituales',
  },
  grupos: {
    image: gruposImg,
    label: 'Ministerio de Grupos',
    href: '/ministerios/grupos',
  },
} as const;
