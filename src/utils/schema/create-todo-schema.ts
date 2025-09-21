import * as yup from "yup";

export enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

export enum Priority {
  URGENT = "urgent",
  IMPORTANT = "important",
  NORMAL = "normal",
  LOW = "low",
}

export const createTodoSchema = yup.object({
  taskName: yup
    .string()
    .required("Task name is required")
    .min(3, "Task name must be at least 3 characters"),

  status: yup
    .mixed<TodoStatus>()
    .oneOf(Object.values(TodoStatus), "Invalid status")
    .required("Status is required"),

  dates: yup
    .date()
    .typeError("Invalid date format")
    .required("Date is required"),

  assigneeIds: yup
    .array()
    .of(yup.string())
    .min(1, "At least one assignee is required")
    .required("Assignees are required"),

  priority: yup
    .mixed<Priority>()
    .oneOf(Object.values(Priority), "Invalid priority")
    .required("Priority is required"),

  description: yup.string().optional(),
});

export type CreateTodoType = yup.InferType<typeof createTodoSchema>;
