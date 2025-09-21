import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Avatar,
  AvatarGroup,
  IconButton,
  Flex,
  Card,
  CardBody,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  Add,
  Calendar,
  ProfileCircle,
  TaskSquare,
  TickCircle,
  Status,
} from "iconsax-reactjs";
import type { PaginatedResponse } from "@/services/api-service";
import type { TodoResponse } from "@/types";
import { TodoStatus, Priority } from "@prisma/client"; // or your enums
import { ParagraphText } from "../typography";
import { type GlobalStatus, StatusBadge } from "../ui";

// Props interface
export interface TodoTableProps {
  todosData: PaginatedResponse<TodoResponse> | undefined;
  isLoading?: boolean;
}

// Theme colors
const colors = {
  purple: "hsla(269, 45%, 26%, 1)",
  lightPurple200: "hsla(269, 52%, 81%, 1)",
  lightGreen500: "hsla(177, 41%, 62%, 1)",
  lightGreen200: "hsla(189, 47%, 94%, 1)",
  yellow: "hsla(42, 91%, 59%, 1)",
  lightYellow200: "hsla(42, 74%, 94%, 1)",
  textBlack200: "hsla(210, 7%, 29%, 1)",
  lightGray200: "hsla(189, 47%, 94%, 1)",
};

// Priority color mapping
const priorityColors: Record<
  Priority,
  { bg: string; color: string; dot: string }
> = {
  URGENT: { bg: "#FFE5E5", color: "#FF4444", dot: "#FF4444" },
  IMPORTANT: {
    bg: colors.lightYellow200,
    color: colors.yellow,
    dot: colors.yellow,
  },
  NORMAL: {
    bg: colors.lightPurple200,
    color: colors.purple,
    dot: colors.purple,
  },
  LOW: {
    bg: colors.lightGreen200,
    color: colors.lightGreen500,
    dot: colors.lightGreen500,
  },
};

// Status color mapping
const statusColors: Record<TodoStatus, { bg: string; title: string }> = {
  TODO: { bg: colors.lightGray200, title: colors.textBlack200 },
  IN_PROGRESS: { bg: colors.lightYellow200, title: colors.yellow },
  COMPLETE: { bg: colors.lightGreen200, title: colors.lightGreen500 },
};

// --- Task Card ---
const TaskCard = ({ task }: { task: TodoResponse }) => {
  return (
    <Card
      mb={3}
      bg="white"
      h="auto"
      minH="unset"
      borderRadius="10px"
      _hover={{ boxShadow: "sm" }}
      transition="all 0.2s"
    >
      <CardBody p={3}>
        <VStack align="stretch" spacing={3}>
          <ParagraphText value={task.taskName} weight="600" fontSize="14px" />

          <HStack spacing={3}>
            <Calendar size={16} color="hsla(217, 15%, 76%, 1)" />
            <Text fontSize="xs" color="gray.500">
              {task.dates}
            </Text>
          </HStack>
          <HStack spacing={3}>
            <ProfileCircle size={16} color="hsla(217, 15%, 76%, 1)" />
            <AvatarGroup size="xs" max={3}>
              {task.assignees.map((assignee, idx) => (
                <Avatar key={idx} name={assignee.user.name} />
              ))}
            </AvatarGroup>
          </HStack>

          <StatusBadge status={task.priority.toLowerCase() as GlobalStatus} />
        </VStack>
      </CardBody>
    </Card>
  );
};

interface KanbanColumnProps {
  title: string;
  tasks: TodoResponse[];
  count: number;
  status: TodoStatus;
  onAddTask: () => void;
}

// --- Kanban Column ---
const KanbanColumn = ({
  title,
  tasks,
  count,
  status,
  onAddTask,
}: KanbanColumnProps) => {
  const statusStyle = statusColors[status];

  return (
    <Box
      flex="1"
      minW="300px"
      maxW="350px"
      bg="hsla(0, 0%, 97%, 1)"
      borderRadius="6px"
      h="fit-content"
      pb="6px"
    >
      <VStack spacing={2} align="stretch">
        <HStack
          justify="space-between"
          align="center"
          background={statusStyle.bg}
          height="45px"
          px="4px"
        >
          <HStack spacing={2} height="30px">
            <HStack
              rounded="6px"
              px={2}
              spacing={3}
              height="full"
              background="#fff"
            >
              {status === "TODO" ? (
                <TaskSquare
                  variant="Bold"
                  size={20}
                  color="var(--light-purple-200)"
                />
              ) : status === "IN_PROGRESS" ? (
                <Status variant="Bold" size={20} color="var(--yellow)" />
              ) : (
                status === "COMPLETE" && (
                  <TickCircle
                    variant="Bold"
                    size={20}
                    color="var(--light-green-500)"
                  />
                )
              )}
              <Text
                fontSize="sm"
                fontWeight="600"
                color={statusStyle.title}
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {title}
              </Text>
            </HStack>

            <Center
              bg="white"
              boxSize="30px"
              roundedTopLeft="6px"
              color={colors.textBlack200}
              fontSize="14"
              fontFamily="var(--plus-jakarta-sans)"
              fontWeight="500"
            >
              {`(${count})`}
            </Center>
          </HStack>

          <IconButton
            aria-label="Add task"
            icon={<Add size={20} color="var(--text-black-200)" />}
            bg="#fff"
            size="sm"
            onClick={onAddTask}
            _hover={{ bg: "#fff", opacity: 0.8 }}
          />
        </HStack>

        <VStack align="stretch" px="6px">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          <Button
            color="var(--text-black-200)"
            h="40px"
            bg="#fff"
            rounded="10px"
            _hover={{ bg: "white", opacity: 0.7 }}
            leftIcon={<Add size={20} color="var(--text-black-200)" />}
            fontFamily="var(--plus-jakarta-sans)"
            fontWeight="500"
            fontSize="14px"
            justifyContent="flex-start"
            onClick={onAddTask}
          >
            Add Task
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

// --- Kanban Board ---
const KanbanBoard = ({
  todosData,
  isLoading,
  addTask,
}: {
  todosData: PaginatedResponse<TodoResponse> | undefined;
  isLoading?: boolean;
  addTask?: () => void;
}) => {
  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!todosData) return null;

  const todos = todosData.data;

  const todoTasks = todos.filter((t) => t.status === TodoStatus.TODO);
  const inProgressTasks = todos.filter(
    (t) => t.status === TodoStatus.IN_PROGRESS
  );
  const completeTasks = todos.filter((t) => t.status === TodoStatus.COMPLETE);

  return (
    <Box minH="100vh">
      {/* Kanban Columns */}
      <HStack spacing={4} align="flex-start" overflowX="auto" pb={4}>
        <KanbanColumn
          title="To Do"
          tasks={todoTasks}
          count={todoTasks.length}
          status={TodoStatus.TODO}
          onAddTask={() => addTask?.()}
        />

        <KanbanColumn
          title="In Progress"
          tasks={inProgressTasks}
          count={inProgressTasks.length}
          status={TodoStatus.IN_PROGRESS}
          onAddTask={() => addTask?.()}
        />

        <KanbanColumn
          title="Complete"
          tasks={completeTasks}
          count={completeTasks.length}
          status={TodoStatus.COMPLETE}
          onAddTask={() => addTask?.()}
        />
      </HStack>
    </Box>
  );
};

export default KanbanBoard;
