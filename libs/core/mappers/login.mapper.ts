import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

export namespace LoginMapper {
  export function fromDto(dto: LoginDto): Login {
    return { ...dto };
  }

  export function toDto(model: Login): LoginDto {
    return { ...model };
  }
}
