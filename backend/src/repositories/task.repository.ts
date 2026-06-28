import { ok, err, ResultAsync } from "neverthrow"
import { Task, type ITask } from "~/models/task.model"
import { AppError } from "~/errors/app-error"
import type { AsyncResult, TaskFilters } from "~/types/common"

const toAppError = (e: unknown) => AppError.internal((e as Error).message)

export interface ITaskRepository {
  findAll(filters?: TaskFilters): AsyncResult<ITask[]>
  findById(id: string): AsyncResult<ITask>
  create(data: Partial<ITask>): AsyncResult<ITask>
  update(id: string, data: Partial<ITask>): AsyncResult<ITask>
  delete(id: string): AsyncResult<ITask>
}

function buildQuery(filters?: TaskFilters): Record<string, unknown> {
  const query: Record<string, unknown> = {}
  if (filters?.status && filters.status !== "all") {
    query.status = filters.status
  }
  if (filters?.priority && filters.priority !== "all") {
    query.priority = filters.priority
  }
  if (filters?.search) {
    query.title = { $regex: filters.search, $options: "i" }
  }
  return query
}

export class TaskRepository implements ITaskRepository {
  async findAll(filters?: TaskFilters): AsyncResult<ITask[]> {
    const query = buildQuery(filters)
    return ResultAsync.fromPromise(
      Task.find(query).sort({ createdAt: -1 }),
      toAppError,
    )
  }

  async findById(id: string): AsyncResult<ITask> {
    return ResultAsync.fromPromise(Task.findById(id), toAppError).andThen(
      (task) => (task ? ok(task) : err(AppError.notFound("Task", id))),
    )
  }

  async create(data: Partial<ITask>): AsyncResult<ITask> {
    return ResultAsync.fromPromise(Task.create(data), toAppError)
  }

  async update(id: string, data: Partial<ITask>): AsyncResult<ITask> {
    return ResultAsync.fromPromise(
      Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
      toAppError,
    ).andThen((task) =>
      task ? ok(task) : err(AppError.notFound("Task", id)),
    )
  }

  async delete(id: string): AsyncResult<ITask> {
    return ResultAsync.fromPromise(
      Task.findByIdAndDelete(id),
      toAppError,
    ).andThen((task) =>
      task ? ok(task) : err(AppError.notFound("Task", id)),
    )
  }
}
