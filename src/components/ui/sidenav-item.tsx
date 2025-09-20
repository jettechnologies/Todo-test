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
  onMoveOver?: () => void;
}

export const SideNavItem = ({
  item,
  isActive = false,
  onMoveOver,
}: SideNavItemProps) => {
  return (
    <ListItem
      as={Link}
      display="flex"
      columnGap="1rem"
      href={item.to}
      fontFamily="var(--fakt)"
      fontSize="16px"
      fontWeight="500"
      onMouseOver={onMoveOver}
      color={isActive ? "var(--primary-600)" : "var(--black-400)"}
    >
      {/* <Icon name={isActive ? item.iconName.active : item.iconName.inactive} /> */}
      {item.label}
    </ListItem>
  );
};
