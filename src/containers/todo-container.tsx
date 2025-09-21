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
  TickCircle,
  Status,
} from "iconsax-reactjs";
import { ParagraphText } from "@/components/typography";
import { Formik, Form } from "formik";
import { InputField } from "@/components/ui";
import { searchSchema } from "@/utils/schema";
import {
  useFilterStore,
  type UiComponents,
  type StatusResponse,
} from "@/lib/query-store";
import { TodoTable } from "@/components/tables/todowy-table";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTodosOption } from "@/services/queries";
import KanbanBoard from "@/components/shared/kanban-board";
import { CreateTodoModal } from "@/layouts/modal-layout";
import { useState } from "react";

export const TodoContainer = () => {
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const { filters, updateFilters } = useFilterStore();

  // query params for API
  const params = {
    page: filters.page,
    limit: filters.limit,
    search: filters.search || undefined,
    status: Boolean(filters.status) ? filters.status : undefined,
  };

  const { data: todosData, isLoading } = useQuery({
    ...getTodosOption(params),
    select: (data) => data,
    placeholderData: keepPreviousData,
  });

  const handleChangeLayout = (layout: UiComponents) =>
    updateFilters({ ui: layout });

  const handleStatusChange = (status: StatusResponse) =>
    updateFilters({ status });

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
              _hover={{
                background: "var(--purple)",
              }}
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
              _hover={{
                background: "var(--light-green-500)",
              }}
              onClick={() => setIsCreatingTodo(true)}
            >
              Add Task
            </Button>
          </HStack>
        </HStack>
      </Box>
      <VStack spacing="10px" width="full" p="20px">
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
              _hover={{
                background:
                  filters.ui === "row-horizontal"
                    ? "var(--light-green-500)"
                    : "transparent",
              }}
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
              _hover={{
                background:
                  filters.ui === "row-vertical"
                    ? "var(--light-green-500)"
                    : "transparent",
              }}
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
          {/* for todo */}
          <HStack
            height="40px"
            background={
              filters.status === "TODO" ? "var(--light-purple-200)" : "#fff"
            }
            rounded="10px"
            pl="10px"
            pr="5px"
            width="176px"
            justifyContent="space-between"
            cursor="pointer"
            onClick={() => handleStatusChange("TODO")}
          >
            <HStack>
              <TaskSquare
                size={24}
                color={
                  filters.status === "TODO"
                    ? "hsla(270, 100%, 98%, 1)"
                    : "var(--light-purple-200)"
                }
              />
              <ParagraphText value="To Do" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background={
                filters.status === "TODO"
                  ? "hsla(270, 100%, 98%, 1)"
                  : "var(--light-purple-200)"
              }
            >
              <ParagraphText
                value={`(${
                  todosData?.data.filter((todo) => todo.status === "TODO")
                    .length || 0
                })`}
                weight="600"
                fontSize="14px"
              />
            </Center>
          </HStack>
          {/* for in progress */}
          <HStack
            background={
              filters.status === "IN_PROGRESS" ? "var(--yellow)" : "#fff"
            }
            rounded="10px"
            height="40px"
            pl="10px"
            pr="5px"
            cursor="pointer"
            width="212px"
            justifyContent="space-between"
            onClick={() => handleStatusChange("IN_PROGRESS")}
          >
            <HStack>
              <Status
                size={24}
                color={
                  filters.status === "IN_PROGRESS"
                    ? "hsla(270, 100%, 98%, 1)"
                    : "var(--yellow)"
                }
              />
              <ParagraphText value="In Progress" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background={
                filters.status === "IN_PROGRESS"
                  ? "hsla(270, 100%, 98%, 1)"
                  : "var(--yellow)"
              }
            >
              <ParagraphText
                value={`(${
                  todosData?.data.filter(
                    (todo) => todo.status === "IN_PROGRESS"
                  ).length || 0
                })`}
                weight="600"
                fontSize="14px"
              />
            </Center>
          </HStack>
          {/* for completed */}
          <HStack
            background={
              filters.status === "COMPLETE" ? "var(--light-green-500)" : "#fff"
            }
            rounded="10px"
            height="40px"
            width="206px"
            pl="10px"
            pr="5px"
            cursor="pointer"
            justifyContent="space-between"
            onClick={() => handleStatusChange("COMPLETE")}
          >
            <HStack>
              <TickCircle
                size={24}
                color={
                  filters.status === "COMPLETE"
                    ? "hsla(270, 100%, 98%, 1)"
                    : "var(--light-green-500)"
                }
              />
              <ParagraphText value="Complete" weight="600" fontSize="14px" />
            </HStack>
            <Center
              height="32px"
              width="47px"
              rounded="10px"
              background={
                filters.status === "COMPLETE"
                  ? "hsla(270, 100%, 98%, 1)"
                  : "var(--light-green-500)"
              }
            >
              <ParagraphText
                value={`(${
                  todosData?.data.filter((todo) => todo.status === "COMPLETE")
                    .length || 0
                })`}
                weight="600"
                fontSize="14px"
              />
            </Center>
          </HStack>
        </HStack>
        {/* the data table */}
        <Box width="full" minHeight="400">
          {filters.ui === "row-horizontal" ? (
            <TodoTable todosData={todosData} isLoading={isLoading} />
          ) : (
            filters.ui === "row-vertical" && (
              <KanbanBoard
                todosData={todosData}
                isLoading={isLoading}
                addTask={() => setIsCreatingTodo(true)}
              />
            )
          )}
        </Box>
      </VStack>

      <CreateTodoModal
        isOpen={isCreatingTodo}
        onClose={() => setIsCreatingTodo(false)}
      />
    </Box>
  );
};
