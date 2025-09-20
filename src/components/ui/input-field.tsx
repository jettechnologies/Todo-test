import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  Textarea,
  InputLeftElement,
  type InputProps as ChakraInputProps,
  type TextareaProps as ChakraTextareaProps,
  Switch,
  Flex,
  Select,
  type FormControlProps,
  type CheckboxProps,
  chakra,
  useCheckbox,
} from "@chakra-ui/react";
import { Check } from "@phosphor-icons/react";
import { useField } from "formik";
import { WarningCircle, Eye, EyeSlash } from "@phosphor-icons/react";

type TextTransform = "uppercase" | "capitalize" | "lowercase";

export interface CustomInputProps extends ChakraInputProps {
  name: string;
  type?: string;
  height?: string;
  label?: string;
  labelInfo?: string;
  labelTextTransform?: TextTransform;
  labelColor?: string;
  required?: boolean;
  password?: boolean;
  placeholder?: string;
  size?: string;
  radius?: string | number | {};
  boldLabel?: boolean;
  icon?: React.ReactElement;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps extends ChakraTextareaProps {
  name: string;
  type?: string;
  height?: string;
  label?: string;
  labelInfo?: string;
  labelTextTransform?: TextTransform;
  labelSize?: string;
  labelColor?: string;
  required?: boolean;
  password?: boolean;
  placeholder?: string;
  size?: string;
  radius?: string | number | {};
  boldLabel?: boolean;
  borderColor?: string;
  placeholderColor?: string;
  icon?: React.ReactElement;
}

export const InputField = ({
  name,
  label,
  type = "text",
  radius = "8px",
  placeholder,
  password,
  labelInfo,
  labelColor,
  labelTextTransform = "capitalize",
  boldLabel = false,
  icon,
  onChange,
  ...props
}: CustomInputProps) => {
  const [field, meta] = useField(name);

  const handleShow = React.useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const [show, setShow] = React.useState(false);

  const inputType = password && show ? "text" : type;
  const inputBorderRadius = typeof radius === "string" ? radius : `${radius}px`;

  const inputStyle = {
    fontSize: "sm",
    background: "#fff",
    height: "56px",
    borderRadius: inputBorderRadius,
    border: "1px solid var(--neutral-200)",
  };

  const errorStyle = {
    color: "var(--deep-blood)",
    fontSize: "sm",
    pt: ".3em",
  };

  const inputPropsWithStyle = {
    ...inputStyle,
    ...props,
    ...field,
  };

  const errorProps = meta.touched && meta.error ? errorStyle : null;

  return (
    <FormControl width="100%">
      <FormLabel
        fontSize="14px"
        textTransform={labelTextTransform || "lowercase"}
        lineHeight="20px"
        fontWeight="400"
        color={labelColor || "#211E1D"}>
        {label}{" "}
        {labelInfo && (
          <Text as="span" color="var(--deep-blood)" display="inline">
            *{labelInfo}
          </Text>
        )}
      </FormLabel>

      {password ? (
        <InputGroup>
          <Input
            autoComplete="true"
            type={inputType}
            placeholder={placeholder}
            _placeholder={{
              fontWeight: "400",
              color: "var(--input-placeholder)",
              fontSize: "14px",
              lineHeight: "19px",
              textTransform: "capitalize",
            }}
            className={meta.touched && meta.error ? "shake" : ""}
            {...inputPropsWithStyle}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
          {icon && (
            <InputLeftElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center">
              {icon}
            </InputLeftElement>
          )}
          {!!errorProps || !!meta.error ? (
            <InputRightElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center"
              cursor="pointer">
              <WarningCircle color="var(--deep-blood)" size="18" />
            </InputRightElement>
          ) : (
            <InputRightElement
              width="3rem"
              height="100%"
              display="flex"
              alignItems="center">
              <Box onClick={handleShow} _hover={{ cursor: "pointer" }}>
                {!show ? (
                  <EyeSlash color="var(--icon-dark)" size="18" />
                ) : (
                  <Eye color="var(--icon-dark)" size="18" />
                )}
              </Box>
            </InputRightElement>
          )}
        </InputGroup>
      ) : (
        <InputGroup>
          <Input
            autoComplete="true"
            type={type}
            placeholder={placeholder}
            _placeholder={{
              fontWeight: "400",
              color: "var(--input-placeholder)",
              fontSize: "14px",
              lineHeight: "19px",
            }}
            className={meta.touched && meta.error ? "shake" : ""}
            {...inputPropsWithStyle}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
          />
          {icon && (
            <InputLeftElement
              height="100%"
              width="3rem"
              display="flex"
              alignItems="center">
              {icon}
            </InputLeftElement>
          )}
          {errorProps && meta.error ? (
            <InputRightElement
              width="3rem"
              height="100%"
              cursor="pointer"
              display="flex"
              alignItems="center">
              <WarningCircle color="var(--deep-blood)" size="18" />
            </InputRightElement>
          ) : null}
        </InputGroup>
      )}

      {errorProps && meta.error && <Text {...errorProps}>{meta.error}</Text>}
    </FormControl>
  );
};

export const TextAreaField = ({
  name,
  label,
  radius,
  placeholder,
  password,
  labelColor,
  labelSize,
  placeholderColor,
  height,
  size,
  borderColor,
  ...props
}: InputProps) => {
  const [field, meta] = useField(name);

  return (
    <>
      <FormControl width="100%">
        <FormLabel
          fontSize={labelSize || "16px"}
          lineHeight="22px"
          fontWeight="400"
          color={labelColor || ""}>
          {label}
        </FormLabel>

        <Textarea
          autoComplete="true"
          fontSize="sm"
          placeholder={placeholder}
          borderRadius={radius ? radius : "8px"}
          border={`1px solid ${borderColor || "var(--neutral-200)"}`}
          className={meta.touched && meta.error ? "shake" : ""}
          _placeholder={{
            fontWeight: "400",
            color: placeholderColor || "var(--input-placeholder)",
            fontSize: "16px",
            lineHeight: "22px",
          }}
          height={height || "200px"}
          {...props}
          {...field}
        />

        {meta.touched && meta.error ? (
          <Text color="var(--deep-blood)" fontSize="sm" pt=".3em">
            {meta.error}
          </Text>
        ) : null}
      </FormControl>
    </>
  );
};

type CustomSwitchProps = FormControlProps & {
  name: string;
  label?: string;
  labelColor?: string;
  labelWeight?: string | number;
  labelSize?: string | number;
  labelPosition?: string;
  columns?: { base?: number; lg?: number };
  isRequired?: boolean;
  size?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SwitchField = ({
  name,
  label,
  labelSize,
  labelWeight,
  labelColor = "#211E1D",
  labelPosition = "left",
  isRequired = false,
  onChange,
  size,
  ...props
}: CustomSwitchProps) => {
  const [field, meta, helpers] = useField(name);

  const fontSize = typeof labelSize === "number" && `${labelSize}px`;

  return (
    <FormControl as={Flex} maxW="fit-content" {...props}>
      {label && labelPosition === "left" && (
        <FormLabel
          htmlFor={name}
          color={labelColor}
          fontSize={fontSize || "14px"}
          fontWeight={labelWeight || "normal"}
          mb="0">
          {label}
          {isRequired && (
            <Text as="span" color="red.500" ml="1">
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Switch
        id={name}
        isChecked={field.value}
        size={size || "md"}
        onChange={(e) => {
          helpers.setValue(e.target.checked);
          onChange?.(e);
        }}
        sx={{
          ".chakra-switch__track": {
            bg: field.value ? "var(--coral)" : "gray.200",
          },
        }}
      />
      {label && labelPosition === "right" && (
        <FormLabel
          htmlFor={name}
          color={labelColor}
          fontSize={fontSize || "14px"}
          fontWeight={labelWeight || "normal"}
          mb="0"
          ml="1rem">
          {label}
          {isRequired && (
            <Text as="span" color="red.500" ml="1">
              *
            </Text>
          )}
        </FormLabel>
      )}
      {meta.touched && meta.error ? (
        <Text color="red.500" fontSize="sm">
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
};

type SelectProps = FormControlProps & {
  name: string;
  label?: string;
  labelColor?: string;
  options: Array<{ value: string | number; label: string }>;
  isRequired?: boolean;
};

export const ChakraSelectField: React.FC<SelectProps> = ({
  name,
  label,
  labelColor = "#211E1D",
  options,
  isRequired = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormControl {...props}>
      {label && (
        <FormLabel htmlFor={name} color={labelColor}>
          {label}
          {isRequired && (
            <Text as="span" color="red.500" ml="1">
              *
            </Text>
          )}
        </FormLabel>
      )}
      <Select
        id={name}
        name={name}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={field.onBlur}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {meta.touched && meta.error ? (
        <Text color="red.500" fontSize="sm">
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
};

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  value?: string;
  isChecked?: boolean;
  //   onChange?: (isChecked: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  spacing?: number | string;
  checkboxSize?: number | string;
  labelProps?: any;
  checkboxProps?: any;
}

export const CustomCheckbox = ({
  label,
  value,
  isChecked,
  onChange,
  spacing = 2,
  checkboxSize = 4,
  labelProps,
  checkboxProps,
  ...rest
}: CustomCheckboxProps) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps } = useCheckbox(
    {
      value,
      isChecked,
      onChange,
      ...rest,
    }
  );

  return (
    <chakra.label
      display="flex"
      flexDirection="row-reverse"
      alignItems="center"
      gridColumnGap={spacing}
      cursor="pointer"
      userSelect="none"
      justifyContent="space-between"
      {...rest}>
      <input {...getInputProps()} hidden />

      {/* Checkbox visual */}
      <Flex
        alignItems="center"
        justifyContent="center"
        border="1.5px solid var(--text-1)"
        borderRadius="md"
        w={checkboxSize}
        h={checkboxSize}
        transition="all 0.2s"
        _hover={{
          borderColor: "green.500",
        }}
        boxSize="24px"
        {...getCheckboxProps(checkboxProps)}>
        {state.isChecked && <Check size={14} color="var(--text-1)" />}
      </Flex>

      {/* Label text on the left */}
      <Text
        color={state.isChecked ? "green.700" : "gray.700"}
        fontWeight={state.isChecked ? "semibold" : "normal"}
        {...getLabelProps(labelProps)}>
        {label}
      </Text>
    </chakra.label>
  );
};
