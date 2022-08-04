import { ValidationErrorsDto } from './validation-errors.dto';

/** Registration error response. */
export interface ValidationErrorResponseDto {

  readonly data?: ValidationErrorsDto;

  readonly detail: string;
}
