import { Immerable, OmitImmerable } from './immerable';
import { ValidationErrors } from './validation-errors';

/** [field , message]. */
export type ErrorMessage = [string, string];

/** Validation error response. */
export class ValidationErrorResponse extends Immerable {

  /** Errors for validation fields. */
  public readonly data?: ValidationErrors;

  /** General error message. */
  public readonly detail: string;

  public constructor(data: InitArgs) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }

}

type InitArgs = OmitImmerable<ValidationErrorResponse>;
