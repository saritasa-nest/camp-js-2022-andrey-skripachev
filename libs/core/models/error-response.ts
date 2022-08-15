import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ErrorResponseMapper } from '../mappers/error-response.mapper';

import { Immerable, OmitImmerable } from './immerable';

/** Error message: [field, message]. */
export type ErrorMessage = [string, string];

/** Validation error. */
export type ValidationError<T> = {
  [K in keyof T]?: readonly string[];
};

/** Error response. */
export class ErrorResponse<T> extends Immerable {

  /** Fields error data. */
  public readonly data: T;

  /** General error data. */
  public readonly detail: string;

  public constructor(data: InitArgs<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }
}

/**
 * Extracts error message from error response.
 * @param errorResponseDto Error response.
 * @param errorMapper Error mapper.
 */
export function extractValidationErrorMessage<TErrorDto, TError>(
  errorResponseDto: ErrorResponseDto<TErrorDto>,
  errorMapper: (dto: TErrorDto) => TError,
): ErrorMessage {
  const errorResponse = ErrorResponseMapper.fromDto(
    errorResponseDto,
    errorMapper,
  );

  for (const [field, message] of Object.entries(errorResponse.data)) {
    if (message !== undefined) {
      return [field, message[0]];
    }
  }

  return ['detail', errorResponse.detail];
}

type InitArgs<T> = OmitImmerable<ErrorResponse<T>>;
