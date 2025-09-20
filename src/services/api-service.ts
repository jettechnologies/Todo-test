import type { CreateTodoRequest, UpdateTodoRequest } from "@/types";
// utils/apiService.ts
export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  todos: T[];
  pagination: PaginationMeta;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // You can set this in `.env.local` → NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(
        errData?.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  }

  async getTodos(
    params?: Record<string, string | number | undefined>
  ): Promise<PaginatedResponse<any>> {
    let query = "";

    if (params) {
      // remove undefined values
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      ) as Record<string, string | number>;

      query = `?${new URLSearchParams(
        Object.entries(cleanedParams).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: String(value),
          }),
          {} as Record<string, string>
        )
      ).toString()}`;
    }

    return this.request(`/todos${query}`);
  }

  async getUsers(): Promise<PaginatedResponse<any>> {
    return this.request("/users");
  }

  // ✅ GET single todo
  async getTodo(id: string) {
    return this.request(`/todos/${id}`);
  }

  // ✅ CREATE new todo
  async createTodo(data: CreateTodoRequest) {
    return this.request(`/todos`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ✅ UPDATE a todo
  async updateTodo(id: string, data: UpdateTodoRequest) {
    return this.request(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // ✅ DELETE a todo
  async deleteTodo(id: string) {
    return this.request(`/todos/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
