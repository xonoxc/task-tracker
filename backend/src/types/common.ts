import type { Result } from "neverthrow"
import type { AppError } from "~/errors/app-error"

export type AsyncResult<T> = Promise<Result<T, AppError>>

export interface TaskFilters {
  status?: string
  priority?: string
  search?: string
}

declare global {
  namespace Express {
    interface Request {
      id?: string
    }
  }
}
