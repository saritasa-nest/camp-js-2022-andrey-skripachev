import { RegistrationDto } from '../dtos/registration.dto';
import { Registration } from '../models/registration';

export namespace RegistrationMapper {

  /**
   * Maps model to dto.
   * @param registration User registration data.
   */
  export function toDto(registration: Registration): RegistrationDto {
    return {
      first_name: registration.firstName,
      last_name: registration.lastName,
      email: registration.email,
      password: registration.password,
      avatar: registration.avatar,
    };
  }
}
