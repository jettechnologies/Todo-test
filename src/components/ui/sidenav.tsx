"use client";

import { Box, List, Center } from "@chakra-ui/react";
import { type SidenavItem, SideNavItem } from "./sidenav-item";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SideNavProps {
  items: SidenavItem[];
}

export const SideNav = ({ items }: SideNavProps) => {
  const pathname = usePathname();

  console.log(pathname, "pathname");

  return (
    <Box
      bg="#fff"
      pos="sticky"
      top={0}
      width="250px"
      px="20px"
      py="30px"
      height="100vh"
      overflow="auto"
      border="1px solid var(--chakra-colors-gray-100)"
      css={{
        "&::-webkit-scrollbar": {
          height: "var(--chakra-sizes-1)",
          width: "var(--chakra-sizes-1)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--chakra-colors-gray-400)",
        },
      }}
    >
      <Center width="full">
        <Image
          src="/images/todo-logo.png"
          alt="todo logo"
          width={100}
          height={100}
        />
      </Center>
      <List spacing="12px" mt="30px">
        {items.map((item) => (
          <SideNavItem
            key={item.label}
            item={item}
            isActive={pathname === item.to}
            activePath={pathname}
          />
        ))}
      </List>
    </Box>
  );
};
