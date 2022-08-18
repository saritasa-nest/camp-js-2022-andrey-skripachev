import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { UserValidationErrorsMapper } from '@js-camp/core/mappers/user-validation-errors.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { Token } from '@js-camp/core/models/token';

import { createError, http } from '..';

export namespace AuthService {

  /**
   * Logins user.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<Token> {
    try {
      const token = await http.post<TokenDto>('auth/login/', LoginMapper.toDto(loginData));

      return TokenMapper.fromDto(token.data);
    } catch (error: unknown) {
      throw createError(error, UserValidationErrorsMapper.fromDto);
    }
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<Token> {
    try {
      const token = await http.post<TokenDto>('auth/register/', RegistrationMapper.toDto(registrationData));

      return TokenMapper.fromDto(token.data);
    } catch (error: unknown) {
      throw createError(error, UserValidationErrorsMapper.fromDto);
    }
  }

  /**
   * Refreshes access token.
   * @param token User's authorization token.
   */
  export async function refreshToken(token: Token): Promise<Token> {
    const newToken = await http.post<TokenDto>('auth/token/refresh/', { refresh: token.refresh })
      .then(response => TokenMapper.fromDto(response.data));

    return newToken;
  }

  /**
   * Verifies access token.
   * @param token Token.
   */
  export async function verifyToken(token: Token): Promise<boolean> {
    const isTokenValid = await http.post('auth/token/verify/', { token: token.access })
      .then(() => true)
      .catch(() => false);

    return isTokenValid;
  }
}
