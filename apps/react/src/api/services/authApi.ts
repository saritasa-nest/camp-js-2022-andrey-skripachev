import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

import { http } from '..';

export namespace AuthService {

  /**
   * Logins user.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<TokenDto> {
    const token = await http.post<TokenDto>('auth/login/', LoginMapper.toDto(loginData))
      .then(response => TokenMapper.fromDto(response.data));

    return token;
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<TokenDto> {
    const token = await http.post<TokenDto>('auth/register/', RegistrationMapper.toDto(registrationData))
      .then(response => TokenMapper.fromDto(response.data));

    return token;
  }
}
