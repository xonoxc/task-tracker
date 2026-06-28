import type { Request, Response, NextFunction } from "express"
import { AppError } from "~/errors/app-error"
import { logger } from "~/config/logger"

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { code: err.code, message: err.message, details: err.details },
    })
  }

  logger.error({ err }, "Unhandled error")
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Internal server error" },
  })
}
