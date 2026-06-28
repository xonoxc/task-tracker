export type AppErrorCode = 'NOT_FOUND' | 'VALIDATION_ERROR' | 'INTERNAL_ERROR';

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static notFound(entity: string, id: string) {
    return new AppError('NOT_FOUND', `${entity} with id '${id}' not found`, 404);
  }

  static validation(details: unknown) {
    return new AppError('VALIDATION_ERROR', 'Validation failed', 400, details);
  }

  static internal(message = 'Internal server error') {
    return new AppError('INTERNAL_ERROR', message, 500);
  }
}
