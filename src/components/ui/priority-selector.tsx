"use client";

import {
  Box,
  VStack,
  Text,
  useRadioGroup,
  useRadio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import type { UseRadioProps } from "@chakra-ui/react";
import { useField } from "formik";
import { StatusBadge } from "./badge";
import type { GlobalStatus } from "./badge";
import { Slash } from "iconsax-reactjs";
import { ParagraphText } from "../typography";

interface PriorityOption {
  value: GlobalStatus;
  label: string;
}

const priorityOptions: PriorityOption[] = [
  { value: "urgent", label: "Urgent" },
  { value: "important", label: "Important" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

interface PriorityRadioProps extends UseRadioProps {
  option: PriorityOption;
  onSelect: () => void;
}

function PriorityRadio({
  option,
  onSelect,
  ...radioProps
}: PriorityRadioProps) {
  const { getInputProps, getRadioProps } = useRadio(radioProps);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full" cursor="pointer" onClick={onSelect}>
      <input {...input} hidden />
      <Box {...checkbox} cursor="pointer">
        <StatusBadge status={option.value as GlobalStatus} width="full" />
      </Box>
    </Box>
  );
}

interface PrioritySelectorProps {
  name: string;
}

export function PrioritySelector({ name }: PrioritySelectorProps) {
  const [field, , helpers] = useField<GlobalStatus | "">(name);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value: field.value,
    onChange: (val) => {
      helpers.setValue(val as GlobalStatus);
      onClose();
    },
  });

  const group = getRootProps();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Text
          fontSize="sm"
          color="gray.700"
          fontWeight="medium"
          cursor="pointer"
        >
          {field.value ? (
            <StatusBadge status={field.value} />
          ) : (
            "Select Priority"
          )}
        </Text>
      </PopoverTrigger>
      <PopoverContent w="190px" _focus={{ boxShadow: "none" }}>
        <PopoverBody>
          <VStack {...group} spacing={2} align="stretch" pb={3}>
            {priorityOptions.map((option) => {
              const radio = getRadioProps({ value: option.value });
              return (
                <PriorityRadio
                  key={option.value}
                  option={option}
                  {...radio}
                  onSelect={onClose}
                />
              );
            })}
          </VStack>
          <Button
            borderTop="1px solid hsla(221, 39%, 86%, 1)"
            width="full"
            rounded="none"
            variant="ghost"
            _hover={{
              background: "transparent",
            }}
            px="0"
            leftIcon={<Slash size={24} color="hsla(224, 48%, 95%, 1)" />}
            onClick={() => {
              helpers.setValue("");
              onClose();
            }}
            justifyContent="flex-start"
          >
            <ParagraphText value="Clear" weight="400" fontSize="16px" />
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
