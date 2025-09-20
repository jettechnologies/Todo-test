import { ListItem } from "@chakra-ui/react";
import Link from "next/link";
export interface SidenavItem {
  //   icon: React.ComponentType<SVGSVGElement>;
  iconName?: {
    active: string;
    inactive: string;
  };
  label: string;
  to: string;
}

interface SideNavItemProps {
  item: SidenavItem;
  isActive?: boolean;
}

export const SideNavItem = ({ item, isActive = false }: SideNavItemProps) => {
  return (
    <ListItem
      as={Link}
      display="flex"
      columnGap="1rem"
      href={item.to}
      fontFamily="var(--fakt)"
      fontSize="16px"
      fontWeight="500"
      background={isActive ? "var(--light-gray-200)" : "transparent"}
      height="40px"
      px={isActive ? "30px" : "0px"}
      alignItems="center"
      rounded="10px"
      color={isActive ? "var(--light-green-500)" : "var(--text-black-200)"}
    >
      {item.label}
    </ListItem>
  );
};
