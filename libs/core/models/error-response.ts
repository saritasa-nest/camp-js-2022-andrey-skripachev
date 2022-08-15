import { Immerable, OmitImmerable } from './immerable';
import { ValidationErrors } from './user-validation-errors';

/** [field , message]. */
export type ErrorMessage = [string, string];

/** Validation error response. */
export class ErrorResponse<T> extends Immerable {

  /** Errors for validation fields. */
  public readonly data?: T;

  /** General error message. */
  public readonly detail: string;

  public constructor(data: InitArgs) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }

}

type InitArgs = OmitImmerable<ErrorResponse>;
