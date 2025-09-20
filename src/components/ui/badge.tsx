import { Badge, Box, Text } from "@chakra-ui/react";

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
      return { color: "red.500", label: "URGENT" };
    case "important":
      return { color: "yellow.500", label: "IMPORTANT" };
    case "normal":
      return { color: "green.500", label: "NORMAL" };
    case "low":
      return { color: "gray.500", label: "LOW" };
    default:
      return { color: "gray.400", label: status };
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
      borderRadius="md"
      border="1px solid"
      borderColor={color}
      background="white"
      onClick={onClick}
      _hover={{ cursor: onClick ? "pointer" : "default" }}
      gap={2}
    >
      {/* Flag Icon */}
      <Box
        as="span"
        width="10px"
        height="14px"
        bg={color}
        borderRadius="2px"
        clipPath="polygon(0 0, 100% 0, 100% 50%, 0 100%)"
      />

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
