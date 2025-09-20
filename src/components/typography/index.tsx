import { Box, type ChakraProps, Text } from "@chakra-ui/react";

export interface TextProps extends ChakraProps {
  value: string;
  weight?: string;
  family?: string;
  color?: string;
  spanText?: string;
  spanColor?: string;
  align?: "left" | "center" | "right";
}

export const HeaderText = ({ family, value, align, ...props }: TextProps) => {
  return (
    <Text
      fontWeight="600"
      fontSize="21px"
      lineHeight="30px"
      fontFamily={family || "var(--plus-jakarta-sans)"}
      textAlign={align || "center"}
      {...props}
    >
      {value}
    </Text>
  );
};

export const ParagraphText = ({
  weight,
  value,
  align,
  color,
  spanText,
  spanColor,
  family,
  ...props
}: TextProps) => {
  return (
    <Text
      fontWeight={weight || "500"}
      fontSize="14px"
      lineHeight="20px"
      textAlign={align || "left"}
      fontFamily={family || "var(--plus-jakarta-sans)"}
      color={color || "var(--text-black)"}
      {...props}
    >
      {value}{" "}
      {spanText && (
        <Box
          as="span"
          fontWeight={weight || "700"}
          color={spanColor || "var(--text-black)"}
        >
          {spanText}
        </Box>
      )}
    </Text>
  );
};
