import type { Request, Response, NextFunction } from "express"
import type { ITaskService } from "~/services/task.service"

export class TaskHandler {
  constructor(private readonly taskService: ITaskService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
      status: req.query.status as string | undefined,
      priority: req.query.priority as string | undefined,
      search: req.query.search as string | undefined,
    }
    const result = await this.taskService.list(filters)
    result.match(
      (tasks) => res.json(tasks),
      (error) => next(error),
    )
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.taskService.getById(req.params.id as string)
    result.match(
      (task) => res.json(task),
      (error) => next(error),
    )
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.taskService.create(req.body)
    result.match(
      (task) => res.status(201).json(task),
      (error) => next(error),
    )
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.taskService.update(
      req.params.id as string,
      req.body,
    )
    result.match(
      (task) => res.json(task),
      (error) => next(error),
    )
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.taskService.delete(req.params.id as string)
    result.match(
      (task) => res.json({ message: "Task deleted", task }),
      (error) => next(error),
    )
  }
}
