import { QUERY_KEYS } from "../query-keys";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "../api-service";
import type { CreateTodoRequest, UpdateTodoRequest } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "@/hook/toast";

interface UpdateTodoVariables {
  id: string;
  params: UpdateTodoRequest;
}

export const useCreateTodo = () =>
  useMutation({
    mutationFn: (params: CreateTodoRequest) => apiService.createTodo(params),
    meta: {
      invalidatesQuery: QUERY_KEYS.todo.all(),
      errorMessage: "Error while creating todo",
    },
  });

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: ({ id, params }: UpdateTodoVariables) =>
      apiService.updateTodo(id, params),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.singleTodos(variables.id),
      });
    },

    onError: (error: Error) => {
      openToast(error.message, "error");
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.singleTodos(variables.id),
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => apiService.deleteTodo(id),
    // meta: {
    //   invalidatesQuery: QUERY_KEYS.todo.all(),
    //   errorMessage: "Error while deleting todos",
    // },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.singleTodos(variables.id),
      });
    },

    onError: (error: Error) => {
      openToast(error.message, "error");
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.singleTodos(variables.id),
      });
    },
  });
};
