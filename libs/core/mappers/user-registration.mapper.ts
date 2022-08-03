import { UserRegistration } from "../models/user-registration";
import { UserRegistrationDto } from "../dtos/user-registration.dto";

export namespace UserRegistrationMapper {

  export function toDto(data: UserRegistration): UserRegistrationDto {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    };
  }

}
