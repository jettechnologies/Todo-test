"use client";

import DataGrid from "../ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getTodosOption } from "@/services/queries";
import { useFilterStore } from "@/lib/query-store";
import type { PaginatedResponse } from "@/services/api-service";

// ✅ transform the todo response for the table
const transformTodos = (todos: any[]) => {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    status: todo.completed ? "completed" : "pending",
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
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
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
            label: "Edit",
            onClick: (row) => router.push(`/todos/${row.original.id}/edit`),
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
