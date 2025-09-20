import { useToast, Box, Flex, Text, CloseButton } from "@chakra-ui/react";
import React from "react";
import { Info, Warning, CheckCircle, Prohibit } from "@phosphor-icons/react";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export type ToastStatus = "success" | "error" | "warning" | "info";

export type ToastContextValues = {
  openToast: (message: string, status: ToastStatus) => void;
};

const createToastContext = () =>
  React.createContext<ToastContextValues | null>(null);
export const ToastContext = createToastContext();

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useToast();
  // error: useRouter must be used inside a RouteProvider component
  // const { pathname } = useLocation();
  const toastId = `toast-${crypto.randomUUID()}`;

  const showToast = (message: string, status: ToastStatus) => {
    if (!toast.isActive(toastId)) {
      toast({
        render: ({ onClose }) => (
          <Box
            py="1em"
            px=".8em"
            maxWidth="390px"
            height="fit-content"
            borderRadius="8px"
            border={`1px solid ${
              status === "success"
                ? "var(--success-700)"
                : status === "error"
                ? "var(--danger-700)"
                : status === "info"
                ? "var(--toast-primary-600)"
                : "var(--warn-500)"
            }`}
            background={`${
              status === "success"
                ? "var(--success-25)"
                : status === "error"
                ? "var(--danger-25)"
                : status === "info"
                ? "var(--toast-primary-25)"
                : "var(--warn-25)"
            }`}
          >
            <Flex my="auto" gap=".6em" position="relative">
              {status === "error" ? (
                <Prohibit size="20" color="var(--deep-blood)" />
              ) : status === "warning" ? (
                <Warning size="20" color="var(--warn-500)" />
              ) : status === "info" ? (
                <Info size="20" color="var(--toast-primary-600)" />
              ) : (
                <CheckCircle size="20" color="var(--success-600)" />
              )}
              <Text
                my="auto"
                color={
                  status === "success"
                    ? "var(--success-700)"
                    : status === "error"
                    ? "var(--danger-700)"
                    : "var(--warn-500)"
                }
                fontSize="16px"
              >
                {/* {message} */}
                {message.charAt(0).toUpperCase() + message.slice(1)}
              </Text>

              <CloseButton
                size="md"
                position="absolute"
                top="-4"
                right="-3"
                onClick={onClose}
                color={
                  status === "error"
                    ? "var(--deep-blood)"
                    : status === "info"
                    ? "var(--toast-primary-600)"
                    : status === "warning"
                    ? "var(--warn-500)"
                    : "var(--success-600)"
                }
              />
            </Flex>
          </Box>
        ),
        duration: 1500,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const values: ToastContextValues = {
    openToast: showToast,
  };

  return (
    <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
  );
};
