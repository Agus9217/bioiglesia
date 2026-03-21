import {
  IconButton,
  Menu,
  Portal,
} from '@chakra-ui/react';
import { navItems } from './navItems';
import Link from 'next/link';

export const NavMobile = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild hideFrom={'md'}>
        <IconButton
          variant="outline"
          rounded={'full'}
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-list-plus-icon lucide-list-plus"
          >
            <path d="M16 5H3" />
            <path d="M11 12H3" />
            <path d="M16 19H3" />
            <path d="M18 9v6" />
            <path d="M21 12h-6" />
          </svg>
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content textTransform={'uppercase'}>
            {navItems.map(({ label, href }) => (
              <Menu.Item key={label} value={label}>
                <Link href={href}>{label}</Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
