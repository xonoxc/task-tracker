import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import { AppError } from "~/errors/app-error"

export const validate =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return next(AppError.validation(result.error.flatten().fieldErrors))
    }
    req.body = result.data
    next()
  }
