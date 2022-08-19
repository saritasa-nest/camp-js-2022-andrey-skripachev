import { UserDto } from '@js-camp/core/dtos/user.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';

import { http } from '..';

import { AuthService } from './authApi';
import { TokenService } from './token';

export namespace UserService {

  /**
   * Logins user.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<User> {
    const token = await AuthService.login(loginData);
    TokenService.saveToken(TokenMapper.toDto(token));

    const currentUser = await getCurrentUser();

    return currentUser;
  }

  /**
   * Logouts user.
   */
  export function logout(): void {
    TokenService.deleteToken();
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<User> {
    const token = await AuthService.register(registrationData);
    TokenService.saveToken(TokenMapper.toDto(token));

    const currentUser = await getCurrentUser();

    return currentUser;
  }

  /**
   * Gets current user.
   */
  export async function getCurrentUser(): Promise<User> {
    const userResponse = await http.get<UserDto>('users/profile/');

    return UserMapper.fromDto(userResponse.data);
  }
}
