import { UserValidationErrorsDto } from '../dtos/user-validation-errors.dto';
import { UserValidationErrors } from '../models/user-validation-errors';

export namespace UserValidationErrorsMapper {

  /**
   * Maps dto to model.
   * @param dto Validation error dto.
   */
  export function fromDto(dto: UserValidationErrorsDto): UserValidationErrors {
    return new UserValidationErrors({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
      password: dto.password,
      nonFieldErrors: dto.non_field_errors,
    });
  }
}
