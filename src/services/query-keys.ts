export const QUERYKEYS = {
  todo: {
    all: () => ["todos"],
    singleTodos: (id: number) => [...QUERYKEYS.todo.all(), id],
  },
};
