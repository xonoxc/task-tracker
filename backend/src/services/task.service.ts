import type { ITaskRepository } from "~/repositories/task.repository"
import type { ITask } from "~/models/task.model"
import type { AsyncResult, TaskFilters } from "~/types/common"

export interface ITaskService {
  list(filters?: TaskFilters): AsyncResult<ITask[]>
  getById(id: string): AsyncResult<ITask>
  create(data: unknown): AsyncResult<ITask>
  update(id: string, data: unknown): AsyncResult<ITask>
  delete(id: string): AsyncResult<ITask>
}

export class TaskService implements ITaskService {
  constructor(private readonly repository: ITaskRepository) {}

  list(filters?: TaskFilters): AsyncResult<ITask[]> {
    return this.repository.findAll(filters)
  }

  getById(id: string): AsyncResult<ITask> {
    return this.repository.findById(id)
  }

  create(data: unknown): AsyncResult<ITask> {
    return this.repository.create(data as Partial<ITask>)
  }

  update(id: string, data: unknown): AsyncResult<ITask> {
    return this.repository.update(id, data as Partial<ITask>)
  }

  delete(id: string): AsyncResult<ITask> {
    return this.repository.delete(id)
  }
}
