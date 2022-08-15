import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrorResponseMapper } from '@js-camp/core/mappers/validation-error-response.mapper';
import { ErrorMessage } from '@js-camp/core/models/error-response';
import { catchError, ObservableInput, ObservedValueOf, OperatorFunction, throwError } from 'rxjs';

function extractErrorMessage(error: HttpErrorResponse): ErrorMessage {
  const errorMessages = ValidationErrorResponseMapper.fromDto(error.error);

  if
}

/**
 * Catches error response and extract error message from response.
 * @param callback Errors selector.
 */
export function catchErrorResponseMessage<T, R extends ObservableInput<unknown>>(
  callback: (error: ErrorMessage) => R,
): OperatorFunction<T, T | ObservedValueOf<R>> {
  return catchError((error: unknown) => {
    if (error instanceof HttpErrorResponse) {
      return callback(extractErrorMessage(error));
    }

    return throwError(() => error);
  });
}
