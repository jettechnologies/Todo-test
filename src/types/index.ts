import { User, Todo, TodoStatus, Priority, TodoAssignee } from "@prisma/client";

export type { User, Todo, TodoStatus, Priority };

// Extended types for API responses
export type TodoWithAssignees = Todo & {
  assignees: (TodoAssignee & {
    user: User;
  })[];
};

export type UserWithTodos = User & {
  assignedTodos: (TodoAssignee & {
    todo: Todo;
  })[];
};

// API request types
export interface CreateTodoRequest {
  taskName: string;
  status: TodoStatus;
  dates: Date | string;
  assigneeIds: string[];
  priority: Priority;
  description?: string;
}

// export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {
//   id: string;
// }

export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {}
// For compatibility with existing DataGrid component
export type TransactionStatus = TodoStatus;
export type PriorityStatus = Priority;

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssigneeResponse {
  todoId: string;
  userId: string;
  user: UserResponse;
}

export interface TodoResponse {
  id: string;
  taskName: string;
  status: TodoStatus;
  dates: string;
  priority: Priority;
  description: string;
  createdAt: string;
  updatedAt: string;
  assignees: AssigneeResponse[];
}

export interface UsersResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    assignedTodos: number;
  };
}
