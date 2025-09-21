export const QUERY_KEYS = {
  todo: {
    all: () => ["todos"],
    singleTodos: (id: string) => [...QUERY_KEYS.todo.all(), id],
    list: (params?: Record<string, any>) => ["todos", { ...params }] as const,
  },
  user: {
    all: () => ["user"],
    list: (params?: Record<string, any>) => ["todos", { ...params }] as const,
  },
};
