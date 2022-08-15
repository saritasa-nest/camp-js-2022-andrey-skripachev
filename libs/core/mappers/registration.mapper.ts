import { Registration } from '../models/registration';
import { RegistrationDto } from '../dtos/registration.dto';

export namespace RegistrationMapper {

  /**
   * Maps model to dto.
   * @param data Registration model.
   */
  export function toDto(data: Registration): RegistrationDto {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    };
  }

}
