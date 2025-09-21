"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  Box,
} from "@chakra-ui/react";
import { CaretRight, CaretLeft, CalendarBlank } from "@phosphor-icons/react";
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  isSameDay,
  startOfToday,
  isBefore,
  startOfWeek,
} from "date-fns";
import { ParagraphText } from "../typography";
import type { DatePickerProps } from "./datetime-picker";
import { Calendar, Timer } from "iconsax-reactjs";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DateExtendedPicker = ({
  formik,
  fieldName = "date",
  onDateChange,
  inputField = {
    isActive: true,
    iconDir: "left",
    placeholder: "DD/MM/YYYY",
  },
  height = "48px",
  borderColor = "#E2E8F0",
  color = "#4A5568",
  iconColor = "#A0AEC0",
  background = "white",
  ...props
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Preset date options
  const datePresets = [
    {
      label: "Today",
      value: "today",
      date: new Date(),
      dayLabel: format(new Date(), "EEE"),
    },
    {
      label: "Tomorrow",
      value: "tomorrow",
      date: addDays(new Date(), 1),
      dayLabel: format(addDays(new Date(), 1), "EEE"),
    },
    {
      label: "This Weekend",
      value: "weekend",
      date: addDays(new Date(), 6 - new Date().getDay()),
      dayLabel: "Sat",
    },
    {
      label: "Next Week",
      value: "nextweek",
      date: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }),
      dayLabel: "Mon",
    },
    {
      label: "Next Weekend",
      value: "nextweekend",
      date: addDays(new Date(), 13 - new Date().getDay()),
      dayLabel: format(addDays(new Date(), 13 - new Date().getDay()), "d MMM"),
    },
    {
      label: "2 Weeks",
      value: "2weeks",
      date: addWeeks(new Date(), 2),
      dayLabel: format(addWeeks(new Date(), 2), "d MMM"),
    },
    {
      label: "4 Weeks",
      value: "4weeks",
      date: addWeeks(new Date(), 4),
      dayLabel: format(addWeeks(new Date(), 4), "d MMM"),
    },
  ];

  const handleDateChange = (newDate: Date) => {
    if (!isBefore(newDate, startOfToday())) {
      setDate(newDate);
      setSelectedPreset(null);
      if (formik) {
        formik.setFieldValue(fieldName, newDate);
      }
      if (onDateChange) onDateChange(newDate);

      setIsOpen(false);
    }
  };

  const handlePresetSelect = (preset: any) => {
    setDate(preset.date);
    setSelectedPreset(preset.value);
    setCurrentMonth(preset.date);
    if (formik) {
      formik.setFieldValue(fieldName, preset.date);
    }
    if (onDateChange) onDateChange(preset.date);

    setIsOpen(false);
  };

  const formattedDate = date
    ? format(date, "00/00/0000")
    : inputField?.placeholder || "00/00/0000";

  const generateDates = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const startDate = startOfWeek(firstDay, { weekStartsOn: 1 });
    const today = startOfToday();

    const dates = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = addDays(startDate, i);
      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast =
        isBefore(currentDate, today) && !isSameDay(currentDate, today);

      dates.push({ date: currentDate, isCurrentMonth, isPast });
    }
    return dates;
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, increment));
  };

  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      initialFocusRef={initialFocusRef}
      placement="bottom-start"
    >
      <PopoverTrigger>
        {inputField && inputField.isActive ? (
          <VStack spacing="8px" alignItems="flex-start" width="full">
            {inputField?.label && (
              <ParagraphText
                value={inputField.label}
                color={color}
                weight="500"
                fontSize="14px"
                textTransform="capitalize"
              />
            )}
            <HStack
              {...props}
              py="12px"
              px="16px"
              bgColor={background}
              width="full"
              borderRadius="8px"
              border={`1px solid ${borderColor}`}
              spacing={3}
              onClick={() => setIsOpen(true)}
              height={height}
              cursor="pointer"
              justifyContent={
                inputField?.iconDir === "right" ? "space-between" : "flex-start"
              }
              _hover={{ borderColor: "#CBD5E0" }}
            >
              {inputField?.iconDir === "left" && (
                <CalendarBlank size={20} color={iconColor} />
              )}
              <Text
                color={date ? color : "#A0AEC0"}
                fontSize="14px"
                fontWeight="400"
                flex="1"
              >
                {formattedDate}
              </Text>
              {inputField?.iconDir === "right" && (
                <CalendarBlank size={20} color={iconColor} />
              )}
            </HStack>
          </VStack>
        ) : (
          <Text
            cursor="pointer"
            onClick={() => setIsOpen(true)}
            color="hsla(217, 15%, 76%, 1)"
            fontSize="1rem"
            fontWeight="500"
          >
            {formattedDate}
          </Text>
        )}
      </PopoverTrigger>

      <PopoverContent minWidth="786px" boxShadow="xl" borderRadius="12px">
        <PopoverBody p={0}>
          <Flex>
            {/* Left Sidebar - Date Presets */}
            <Box p="20px" borderRight="1px solid hsla(221, 39%, 86%, 1)">
              <VStack
                spacing={3}
                width="299px"
                background="hsla(0, 0%, 97%, 1)"
                align="stretch"
                p={4}
                rounded="10px"
              >
                {datePresets.map((preset) => (
                  <Button
                    key={preset.value}
                    variant="ghost"
                    justifyContent="space-between"
                    h="40px"
                    px={3}
                    onClick={() => handlePresetSelect(preset)}
                    bg="#fff"
                    _hover={{ bg: "#F7FAFC" }}
                    fontWeight="400"
                    rounded="6px"
                    fontSize="14px"
                    color="#4A5568"
                  >
                    <Text
                      fontSize="14"
                      fontWeight="500"
                      color="var(--text-black-200)"
                    >
                      {preset.label}
                    </Text>

                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      color="var(--text-black-300)"
                    >
                      {preset.dayLabel}
                    </Text>
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Right Side - Calendar */}
            <Box flex="1" p="20px">
              <HStack
                width="full"
                mb="20px"
                spacing={2}
                height="54px"
                rounded="10px"
                p="6px"
                background="hsla(0, 0%, 97%, 1)"
              >
                <HStack
                  height="42px"
                  rounded="10px"
                  flex="1"
                  px="10px"
                  background="#fff"
                >
                  <Calendar size={18} color="hsla(221, 22%, 57%, 1)" />
                  <ParagraphText
                    value="DD/MM/YYYY"
                    fontWeight="400"
                    fontSize="1rem"
                    color="hsla(221, 22%, 57%, 1)"
                  />
                </HStack>
                <HStack
                  height="42px"
                  rounded="10px"
                  flex="1"
                  px="10px"
                  background="#fff"
                >
                  <Timer size={18} color="hsla(221, 22%, 57%, 1)" />
                  <ParagraphText
                    value="00:00"
                    fontWeight="400"
                    fontSize="1rem"
                    color="hsla(221, 22%, 57%, 1)"
                  />
                </HStack>
              </HStack>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Button
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  background="hsla(0, 0%, 97%, 1)"
                  height="34px"
                  width="34px"
                  px="0"
                  rounded="full"
                  _hover={{ bg: "gray.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CaretLeft size={18} />
                </Button>

                <Text
                  fontWeight="700"
                  fontSize="20px"
                  color="var(--text-black-200)"
                >
                  {format(currentMonth, "MMMM yyyy")}
                </Text>

                <Button
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                  background="hsla(0, 0%, 97%, 1)"
                  height="34px"
                  width="34px"
                  px="0"
                  rounded="full"
                  _hover={{ bg: "gray.200" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CaretRight size={18} />
                </Button>
              </Flex>

              <SimpleGrid columns={7} spacing={2} mb={4} width="406px">
                {daysOfWeek.map((day) => (
                  <Text key={day} textAlign="center" fontWeight="bold">
                    {day}
                  </Text>
                ))}
              </SimpleGrid>

              <SimpleGrid columns={7} spacing={2}>
                {generateDates(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth()
                ).map(({ date: d, isCurrentMonth, isPast }) => (
                  <Button
                    key={d.toISOString()}
                    height="32px"
                    p={0}
                    borderRadius="10px"
                    fontFamily="var(--plus-jakarta-sans)"
                    background={
                      date && isSameDay(d, date)
                        ? "var(--light-green-500)"
                        : "white"
                    }
                    color={
                      isPast
                        ? "gray.300"
                        : isCurrentMonth
                        ? "var(--text-black-300)"
                        : "gray.400"
                    }
                    _hover={{
                      background: isPast ? "none" : "var(--light-green-200)",
                    }}
                    isDisabled={isPast}
                    onClick={() => handleDateChange(d)}
                  >
                    {d.getDate()}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
