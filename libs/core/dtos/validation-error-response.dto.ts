import { ValidationErrorsDto } from './validation-errors.dto';

/** Registration error response. */
export interface ValidationErrorResponseDto {

  /** Errors for validation fields.  */
  readonly data?: ValidationErrorsDto;

  /** General error message. */
  readonly detail: string;
}
