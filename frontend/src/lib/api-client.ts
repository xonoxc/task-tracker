import { API_BASE_URL } from '~/config/api';
import type { Task, CreateTaskInput, UpdateTaskInput } from '~/types/task';

class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(`Request failed: ${status}`);
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body);
  }
  return res.json();
}

export const api = {
  getTasks: (params?: string) =>
    request<Task[]>(`/tasks${params || ''}`),

  getTask: (id: string) =>
    request<Task>(`/tasks/${id}`),

  createTask: (data: CreateTaskInput) =>
    request<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) }),

  updateTask: (id: string, data: UpdateTaskInput) =>
    request<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteTask: (id: string) =>
    request<{ message: string; task: Task }>(`/tasks/${id}`, { method: 'DELETE' }),
};
