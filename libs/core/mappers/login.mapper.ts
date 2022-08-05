import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

export namespace LoginMapper {

  /**
   * Maps model to dto.
   * @param model Login data model.
   */
  export function toDto(model: Login): LoginDto {
    return { ...model };
  }
}
