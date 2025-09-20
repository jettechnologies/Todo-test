import { Badge, Box, Text } from "@chakra-ui/react";
import { Flag } from "iconsax-reactjs";

type PriorityStatus = "urgent" | "important" | "normal" | "low";

export type GlobalStatus = PriorityStatus;

export interface StatusProps {
  status: GlobalStatus;
  onClick?: () => void;
  width?: string;
}

const getStatusStyles = (status: GlobalStatus) => {
  switch (status) {
    case "urgent":
      return { color: "hsla(356, 100%, 66%, 1)", label: "URGENT" };
    case "important":
      return { color: "hsla(42, 91%, 59%, 1)", label: "IMPORTANT" };
    case "normal":
      return { color: "hsla(177, 41%, 62%, 1)", label: "NORMAL" };
    case "low":
      return { color: "hsla(217, 15%, 76%, 1)", label: "LOW" };
    default:
      return { color: "hsla(217, 15%, 75%, 1)", label: status };
  }
};

export const Status = ({ status, onClick, width }: StatusProps) => {
  const { color, label } = getStatusStyles(status);

  return (
    <Badge
      display="flex"
      alignItems="center"
      height="24px"
      width={width || "auto"}
      px="0.6em"
      background="white"
      onClick={onClick}
      _hover={{ cursor: onClick ? "pointer" : "default" }}
      gap={2}
    >
      <Flag variant="Bold" size={18} color={color} />

      {/* Text */}
      <Text
        fontSize="12px"
        lineHeight="20px"
        fontWeight="500"
        color="gray.700"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </Badge>
  );
};
