"use client";

import DataGrid from "../ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getTodosOption } from "@/services/queries";
import { useFilterStore } from "@/lib/query-store";
import type { PaginatedResponse } from "@/services/api-service";
import { convertToDateString } from "@/lib/misc";
import { TodoResponse } from "@/types";

// ✅ transform the todo response for the table
const transformTodos = (todos: TodoResponse[]) => {
  return todos.map((todo) => ({
    id: todo.id,
    name: todo.taskName,
    assignee: todo.assignees.flatMap((assignee) => assignee.user.name),
    date: convertToDateString(todo.dates),
    status: todo.priority.toLowerCase(),
    createdAt: new Date(todo.createdAt).toLocaleDateString(),
  }));
};

export const TodoTable = () => {
  const router = useRouter();
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
    select: (data: PaginatedResponse<any>) => data,
    placeholderData: keepPreviousData,
  });

  const todos = transformTodos(todosData?.todos || []);

  type TodoRow = (typeof todos)[number];

  const todoColumns: ColumnDef<TodoRow>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
    },
    {
      accessorKey: "status",
      header: "Priority",
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }) => (
        <button onClick={() => router.push(`/todos/${row.original.id}`)}>
          View
        </button>
      ),
    },
  ];

  return (
    <Box width="full">
      <DataGrid
        columns={todoColumns}
        data={todos}
        loading={isLoading}
        tableAction={[
          {
            label: "Mark as completed",
            onClick: (row) => console.log("mark as completed", row.original),
          },
          {
            label: "Delete",
            onClick: (row) => console.log("delete", row.original),
          },
        ]}
        pagination={{
          pageIndex: filters.page,
          pageSize: filters.limit,
          rowCount: todosData?.pagination?.totalCount || 0,
          onPageChange: (pageIndex) => updateFilters({ page: pageIndex }),
        }}
      />
    </Box>
  );
};
