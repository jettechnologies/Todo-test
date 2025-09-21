"use client";

import DataGrid from "../ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/lib/query-store";
import type { PaginatedResponse } from "@/services/api-service";
import { convertToDateString } from "@/lib/misc";
import { TodoResponse } from "@/types";

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

interface TodoTableProps {
  todosData: PaginatedResponse<TodoResponse> | undefined;
  isLoading?: boolean;
}

export const TodoTable = ({ todosData, isLoading }: TodoTableProps) => {
  const router = useRouter();
  const { filters, updateFilters } = useFilterStore();

  const todos = transformTodos(todosData?.data || []);

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
          onPageSizeChange(pageSize) {
            updateFilters({ limit: pageSize });
          },
        }}
      />
    </Box>
  );
};
