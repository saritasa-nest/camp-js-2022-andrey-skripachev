import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';

import { http } from '..';

import { AuthService } from './authApi';
import { TokenService } from './token';

export namespace UserService {

  /**
   * Fetches user.
   */
  async function fetchUser(): Promise<User> {
    const user = await http.get<UserDto>('users/profile/')
      .then(response => UserMapper.fromDto(response.data));

    return user;

  }

  /**
   * Logins user.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<User> {
    const token = await AuthService.login(loginData);
    TokenService.saveToken(token);

    const user = await fetchUser();

    return user;
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<User> {
    const token = await AuthService.register(registrationData);
    TokenService.saveToken(token);

    const user = await fetchUser();

    return user;
  }

  /**
   * Gets current user.
   */
  export async function getCurrentUser(): Promise<User> {
    const user = await fetchUser();

    return user;
  }
}
