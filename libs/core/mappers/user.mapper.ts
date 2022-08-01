import { User } from "../models/user";
import { UserDto } from "../dtos/user.dto";

export namespace UserMapper {

  export function toDto(data: User): UserDto {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      avatar: data.avatar,
    };
  }

}
