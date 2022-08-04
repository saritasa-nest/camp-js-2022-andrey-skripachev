import { ValidationErrorsDto } from '../dtos/validation-errors.dto';
import { ValidationErrors } from '../models/validation-errors';

export namespace ValidationErrorsMapper {

  /**
   * Maps dto to model.
   * @param dto Validation error dto.
   */
  export function fromDto(dto: ValidationErrorsDto): ValidationErrors {
    return new ValidationErrors({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
      password: dto.password,
      nonFieldErrors: dto.non_field_errors,
    });
  }
}
