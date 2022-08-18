import { ErrorResponseDto } from '../dtos/error-response.dto';
import { AppError } from '../models/error-response';

/**
 * Checks if error is ErrorResponseDto model.
 * @param error Some error response.
 */
export function isErrorResponse<T>(error: unknown): error is ErrorResponseDto<T> {
  return (error as ErrorResponseDto<T>).detail !== undefined;
}

/**
 * Checks is error is app error.
 * @param error Some error.
 */
export function isAppError<T>(error: unknown): error is AppError<T> {
  return (error as AppError<T>).detail !== undefined;
}
