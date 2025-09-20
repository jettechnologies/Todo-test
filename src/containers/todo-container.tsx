"use client";

import {
  Box,
  Center,
  HStack,
  Switch,
  Button,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import {
  ArrowCircleLeft2,
  Sort,
  Calendar,
  Export,
  AddCircle,
  SearchNormal,
  RowHorizontal,
  RowVertical,
  TaskSquare,
  Status,
  TickCircle,
} from "iconsax-reactjs";
import { ParagraphText } from "@/components/typography";
import { Formik, Form } from "formik";
import { InputField } from "@/components/ui";
import { searchSchema } from "@/utils/schema";
import { useFilterStore, type UiComponents } from "@/lib/query-store";

export const TodoContainer = () => {
  const { filters, updateFilters } = useFilterStore();

  const handleChangeLayout = (layout: UiComponents) =>
    updateFilters({ ui: layout });

  return (
    <Box
      width="full"
      minHeight="100dvh"
      rounded="10px"
      background="hsla(0, 0%, 100%, 1)"
    >
      <Box px="20px" py="20px" borderBottom="1px solid hsla(221, 39%, 86%, 1)">
        <HStack justifyContent="space-between">
          <HStack spacing="24px">
            <Center
              width="46px"
              height="46px"
              rounded="full"
              background="hsla(0, 0%, 100%, 1)"
              border="1px solid hsla(221, 39%, 86%, 1)"
            >
              <ArrowCircleLeft2 size="26" color="#000" />
            </Center>
            <ParagraphText value="Afdeling Kwaliteit" weight="700" />
          </HStack>
          <HStack spacing="0.75rem">
            <Center
              rounded="10px"
              background="hsla(0, 0%, 97%, 1)"
              boxSize="50px"
              border="1px solid hsla(221, 39%, 86%, 1)"
            >
              <Switch size="sm" />
            </Center>
            <Center
              rounded="10px"
              background="hsla(0, 0%, 97%, 1)"
              boxSize="50px"
              border="1px solid hsla(221, 39%, 86%, 1)"
            >
              <Sort size="26" color="#000" />
            </Center>
            <Center
              rounded="10px"
              background="hsla(0, 0%, 97%, 1)"
              boxSize="50px"
              border="1px solid hsla(221, 39%, 86%, 1)"
            >
              <Calendar size="26" color="#000" />
            </Center>
            <Button
              width="156px"
              height="50px"
              leftIcon={<Export size="24" color="#fff" />}
              background="var(--purple)"
              fontFamily="var(--plus-jakarta-sans)"
              fontWeight="500"
              fontSize="1rem"
              color="white"
            >
              Export xlsx
            </Button>
            <Button
              width="144px"
              height="50px"
              leftIcon={<AddCircle size="24" color="#fff" />}
              background="var(--light-green-500)"
              fontFamily="var(--plus-jakarta-sans)"
              fontWeight="500"
              fontSize="1rem"
              color="white"
            >
              Add Task
            </Button>
          </HStack>
        </HStack>
      </Box>
      <VStack spacing="10px" width="full" p="20px" border="1px solid black">
        <HStack
          height="60px"
          width="full"
          rounded="10px"
          justifyContent="space-between"
          background="var(--light-green-200)"
          px="10px"
          alignItems="center"
        >
          <Formik
            initialValues={{
              search: "",
            }}
            validationSchema={searchSchema}
            onSubmit={(values) => {
              if (values.search.length >= 3) {
                updateFilters({ search: values.search });
              } else {
                updateFilters({ search: "" });
              }
            }}
          >
            {(formik) => {
              return (
                <VStack as={Form} justifyContent="center">
                  <InputField
                    name="search"
                    placeholder="Search"
                    height="40px"
                    rounded="10px"
                    border="1px solid hsla(0, 0%, 95%, 1)"
                    width="300px"
                    px="18px"
                    onChange={(e) => {
                      formik.handleChange(e);
                      if (e.target.value) {
                        formik.submitForm();
                      }
                    }}
                    py="16px"
                    icon={
                      <SearchNormal size={24} color="var(--light-gray-200)" />
                    }
                  />
                </VStack>
              );
            }}
          </Formik>
          <HStack background="#fff" height="40px" rounded="10px" spacing="10px">
            <IconButton
              aria-label="toggle row horizontally"
              icon={
                <RowHorizontal
                  variant="Outline"
                  size={24}
                  color={
                    filters.ui === "row-horizontal"
                      ? "#fff"
                      : "var(--light-gray-200)"
                  }
                />
              }
              background={
                filters.ui === "row-horizontal"
                  ? "var(--light-green-500)"
                  : "transparent"
              }
              onClick={() => handleChangeLayout("row-horizontal")}
            />

            <IconButton
              aria-label="toggle row horizontally"
              icon={
                <RowVertical
                  variant="Outline"
                  size={24}
                  color={
                    filters.ui === "row-vertical"
                      ? "#fff"
                      : "var(--light-gray-200)"
                  }
                />
              }
              onClick={() => handleChangeLayout("row-vertical")}
              background={
                filters.ui === "row-vertical"
                  ? "var(--light-green-500)"
                  : "transparent"
              }
            />
          </HStack>
        </HStack>
        <HStack
          height="60px"
          width="full"
          background="hsla(0, 0%, 97%, 1)"
          px="10px"
          rounded="10px"
          alignItems="center"
        >
          <HStack
            height="40px"
            background="#fff"
            rounded="10px"
            pl="10px"
            pr="5px"
            width="176px"
            justifyContent="space-between"
          >
            <HStack>
              <TaskSquare size={24} color="var(--light-purple-200)" />
              <ParagraphText value="To Do" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background="var(--light-purple-200)"
            >
              <ParagraphText value="(20)" weight="600" fontSize="14px" />
            </Center>
          </HStack>
          {/* for in progress */}
          <HStack
            background="#fff"
            rounded="10px"
            height="40px"
            pl="10px"
            pr="5px"
            width="212px"
            justifyContent="space-between"
          >
            <HStack>
              <Status size={24} color="var(--yellow)" />
              <ParagraphText value="To Do" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background="var(--light-yellow-200)"
            >
              <ParagraphText value="(20)" weight="600" fontSize="14px" />
            </Center>
          </HStack>
          {/* for completed */}
          <HStack
            background="#fff"
            rounded="10px"
            height="40px"
            width="206px"
            pl="10px"
            pr="5px"
            justifyContent="space-between"
          >
            <HStack>
              <TickCircle size={24} color="var(--light-green-500)" />
              <ParagraphText value="To Do" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background="var(--light-green-200)"
            >
              <ParagraphText value="(20)" weight="600" fontSize="14px" />
            </Center>
          </HStack>
        </HStack>
        {/* the data table */}
        <Box width="full" minHeight="400">
          data table
        </Box>
      </VStack>
    </Box>
  );
};
