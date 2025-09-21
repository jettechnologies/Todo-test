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
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { TaskSquare, TickCircle, Status } from "iconsax-reactjs";
import type { ReactElement } from "react";

interface StatusOption {
  value: string;
  label: string;
  icon: ReactElement;
  color: string;
}

const statusOptions: StatusOption[] = [
  {
    value: "todo",
    label: "To Do",
    icon: <TaskSquare />,
    color: "var(--purple)",
  },
  {
    value: "inprogress",
    label: "In Progress",
    icon: <TickCircle />,
    color: "var(--yellow)",
  },
  {
    value: "complete",
    label: "Complete",
    icon: <Status />,
    color: "var(--light-green-500)",
  },
];

interface StatusRadioProps extends UseRadioProps {
  option: StatusOption;
}

function StatusRadio({ option, ...radioProps }: StatusRadioProps) {
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

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "status",
    value,
    onChange,
  });

  const group = getRootProps();
  const selected = statusOptions.find((s) => s.value === value);

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Text cursor="pointer" color="gray.700" fontWeight="medium">
          {selected ? selected.label : "Select Status"}
        </Text>
      </PopoverTrigger>
      <PopoverContent w="200px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack {...group} spacing={1} align="stretch">
            {statusOptions.map((option) => {
              const radio = getRadioProps({ value: option.value });
              return (
                <StatusRadio key={option.value} option={option} {...radio} />
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
