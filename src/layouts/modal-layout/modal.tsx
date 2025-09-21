import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  //   ModalCloseButton,
  Text,
  type ChakraProps,
  BreadcrumbItem,
  Breadcrumb,
  BreadcrumbLink,
  Flex,
  Box,
  //   IconButton,
} from "@chakra-ui/react";
import { CaretRight, X } from "@phosphor-icons/react";

interface ModalLayoutProps extends ChakraProps {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  onClose: () => void;
  isOpen: boolean;
  radius?: string;
  focusRef?: any;
  px?: string;
  closeBtnSize?: string;
  noCloseButton?: boolean;
  background?: string;
  noRadius?: boolean;
  autoClose?: boolean;
  modalItems?: { icon?: React.ReactElement; text: string; link?: string }[];
}

export const ModalLayout = ({
  size,
  px,
  title,
  onClose,
  isOpen,
  children,
  subTitle,
  radius,
  focusRef,
  closeBtnSize,
  background,
  noCloseButton,
  noRadius,
  autoClose = true,
  modalItems,
}: ModalLayoutProps) => {
  return (
    <Modal
      finalFocusRef={focusRef}
      isOpen={isOpen}
      onClose={onClose}
      size={{
        base: "sm",
        md: size || "md",
        lg: size || "3xl",
        "2xl": size || "4xl",
      }}
      isCentered
      closeOnOverlayClick={autoClose}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        background={background || "#fff"}
        borderRadius={noRadius ? "none" : radius || "16px"}
        py={noCloseButton ? "0em" : "40px"}
        height="fit-content"
        px={px || "1.4em"}
      >
        {noCloseButton ||
          (title && (
            <Flex justifyContent="space-between" alignItems="center" mb="1em">
              {noCloseButton ? null : (
                <Box
                  boxSize={closeBtnSize || "32px"}
                  onClick={onClose}
                  aria-label="modalClose button"
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="2px solid black"
                >
                  <X size={20} color="var(--text-black-200)" stroke="2px" />
                </Box>
              )}
              {!title ? null : (
                <ModalHeader
                  color="var(--dark-primary)"
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="20px"
                  textTransform="capitalize"
                  fontFamily="var(--unbounded)"
                  px="1.4em"
                  flex="1"
                >
                  {title}
                  <Text
                    as="span"
                    display="block"
                    py=".3em"
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="15px"
                    colorScheme="(--gray-3)"
                    fontFamily="var(--urbanist)"
                  >
                    {subTitle}
                  </Text>
                </ModalHeader>
              )}

              {modalItems && modalItems.length > 0 && (
                <Breadcrumb
                  spacing="8px"
                  separator={
                    <CaretRight
                      size={20}
                      weight="bold"
                      color="var(--text-black)"
                    />
                  }
                >
                  {modalItems.map((item, index) => {
                    const isLastItem = index === modalItems.length - 1;

                    return (
                      <BreadcrumbItem key={index} isCurrentPage={isLastItem}>
                        <BreadcrumbLink
                          href={item.link || "#"}
                          fontSize="base"
                          fontWeight="medium"
                          textTransform="capitalize"
                          color={
                            isLastItem ? "var(--neutral)" : "var(--neutral-200)"
                          }
                        >
                          <Flex alignItems="center" columnGap="0.35rem">
                            <Box p={1}>{item.icon && item.icon}</Box>
                            <Text>{item.text}</Text>
                          </Flex>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumb>
              )}
            </Flex>
          ))}
        <ModalBody px={noCloseButton ? ".4em" : ".8em"}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
