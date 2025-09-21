"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  useRadioGroup,
  useRadio,
  type UseRadioProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { TaskSquare, TickCircle, Status } from "iconsax-reactjs";
import type { ReactElement } from "react";
import React from "react";

interface StatusOption {
  value: string;
  label: string;
  icon: ReactElement;
  color: string;
  bgColor: string;
}

const statusOptions: StatusOption[] = [
  {
    value: "todo",
    label: "To Do",
    icon: (
      <TaskSquare variant="Bold" size={24} color="var(--light-purple-200)" />
    ),
    color: "var(--purple)",
    bgColor: "var(--light-purple-200)",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: <TickCircle variant="Bold" size={24} color="var(--yellow)" />,
    color: "var(--yellow)",
    bgColor: "var(--yellow)",
  },
  {
    value: "complete",
    label: "Complete",
    icon: <Status variant="Bold" size={24} color="var(--light-green-500)" />,
    color: "var(--light-green-500)",
    bgColor: "var(--light-green-500)",
  },
];

interface StatusRadioProps extends UseRadioProps {
  option: StatusOption;
  onSelect: () => void;
}

function StatusRadio({ option, onSelect, ...radioProps }: StatusRadioProps) {
  const { getInputProps, getRadioProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full">
      <input {...input} hidden />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        px={3}
        py={2}
        _hover={{ bg: "gray.50" }}
        _checked={{ bg: "blue.50", borderColor: "blue.200" }}
        onClick={onSelect}
      >
        <HStack spacing={3}>
          <Icon as={() => option.icon} color={option.color} boxSize={4} />
          <Text fontSize="sm" color="gray.700">
            {option.label}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}

interface StatusSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const getSelectedComponent = (value: string, onOpen: () => void) => {
  const option = statusOptions.find((o) => o.value === value);

  if (!option) return null;

  return (
    <Flex
      w="fit-content"
      p={2}
      bg={option.bgColor}
      h="full"
      rowGap={2}
      align="center"
      rounded="md"
      onClick={onOpen}
      cursor="pointer"
    >
      {React.cloneElement(
        option.icon as React.ReactElement<{ color: string; size: number }>,
        {
          color: "#fff",
          size: 20,
        }
      )}
      <Text fontSize="12px" color="#fff" fontWeight="600" ml={2}>
        {option.label}
      </Text>
    </Flex>
  );
};

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "status",
    value,
    onChange: (val) => {
      onChange?.(val);
      onClose();
    },
  });

  const group = getRootProps();
  const selected = statusOptions.find((s) => s.value === value);

  return (
    <Popover placement="bottom-start" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        {selected ? (
          getSelectedComponent(selected.value, onOpen)
        ) : (
          <Text
            cursor="pointer"
            color="gray.700"
            fontWeight="medium"
            onClick={onOpen}
          >
            Select Status
          </Text>
        )}
      </PopoverTrigger>
      <PopoverContent w="190px">
        <PopoverBody>
          <VStack {...group} spacing={1} align="stretch">
            {statusOptions.map((option) => {
              const radio = getRadioProps({ value: option.value });
              return (
                <StatusRadio
                  key={option.value}
                  option={option}
                  {...radio}
                  onSelect={() => {
                    onChange?.(option.value);
                    onClose();
                  }}
                />
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
