import { QUERY_KEYS } from "../query-keys";
import { queryOptions } from "@tanstack/react-query";
import { apiService } from "../api-service";

export const getUsersOption = (
  params?: Record<string, string | number | undefined>
) => {
  return queryOptions({
    queryKey: QUERY_KEYS.user.list(params),
    queryFn: () => apiService.getUsers(params),
  });
};

export const getTodosOption = (
  params?: Record<string, string | number | undefined>
) =>
  queryOptions({
    queryKey: QUERY_KEYS.todo.list(params),
    queryFn: () => apiService.getTodos(params),
  });

export const getTodoOption = (id: string) =>
  queryOptions({
    queryKey: QUERY_KEYS.todo.singleTodos(id),
    queryFn: () => apiService.getTodo(id),
    enabled: !!id,
  });
