"use client";

import { ListItem, Box, Text, Collapse, VStack } from "@chakra-ui/react";
import { ArrowDown2 } from "iconsax-reactjs";
import Link from "next/link";
import React, { useState } from "react";

export interface SidenavItem {
  label: string;
  to: string;
  icon?: React.ReactElement;
  children?: SidenavItem[];
}

interface SideNavItemProps {
  item: SidenavItem;
  isActive?: boolean; // parent active state
  activePath?: string; // current pathname
}

export const SideNavItem = ({
  item,
  isActive = false,
  activePath = "",
}: SideNavItemProps) => {
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <Box>
        {/* Parent nav item */}
        <ListItem
          display="flex"
          columnGap="0.75rem"
          alignItems="center"
          px="12px"
          py="10px"
          rounded="8px"
          cursor="pointer"
          fontSize="14px"
          fontWeight="600"
          fontFamily="var(--plus-jakarta-sans)"
          color={isActive ? "var(--light-green-500)" : "var(--text-black-200)"}
          bg={isActive ? "var(--light-gray-200)" : "transparent"}
          onClick={() => setOpen((prev) => !prev)}
          _hover={{ bg: "gray.50" }}
        >
          {item.icon}
          <Text flex="1">{item.label}</Text>
          <Box
            as={ArrowDown2}
            size="16"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </ListItem>

        {/* Children */}
        <Collapse in={open} animateOpacity>
          <VStack align="start" spacing={1} px={2} mt={2} width="full">
            {item.children.map((child) => {
              const childActive = activePath.startsWith(child.to);

              return (
                <Box
                  as={Link}
                  href={child.to}
                  display="block"
                  fontSize="14px"
                  fontWeight="600"
                  fontFamily="var(--plus-jakarta-sans)"
                  px="12px"
                  py="8px"
                  w="full"
                  rounded="8px"
                  cursor="pointer"
                  color={
                    childActive
                      ? "var(--light-green-500)"
                      : "var(--text-black-200)"
                  }
                  bg={childActive ? "var(--light-gray-200)" : "transparent"}
                  _hover={{ color: "var(--light-green-500)", bg: "gray.50" }}
                >
                  {child.label}
                </Box>
              );
            })}
          </VStack>
        </Collapse>
      </Box>
    );
  }

  // Single nav item (no children)
  return (
    <ListItem
      as={Link}
      href={item.to}
      display="flex"
      alignItems="center"
      columnGap="0.75rem"
      px="12px"
      py="10px"
      rounded="8px"
      fontSize="14px"
      fontWeight="600"
      fontFamily="var(--plus-jakarta-sans)"
      color={isActive ? "var(--light-green-500)" : "var(--text-black-200)"}
      bg={isActive ? "var(--light-gray-200)" : "transparent"}
      _hover={{ bg: "gray.50", color: "var(--light-green-500)" }}
    >
      {item.icon}
      {item.label}
    </ListItem>
  );
};
