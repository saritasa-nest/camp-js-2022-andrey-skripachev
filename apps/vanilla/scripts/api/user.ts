import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { Registration } from '@js-camp/core/models/registration';

import { AuthError, Token } from '../variables/interfaces/user';

import { httpClient } from './client';

/** UserApi v1. */
export class UserApi {
  private baseUrl = 'auth/';

  /**
   * Registers the user.
   * @param registration User information for registration.
   * @returns Tokens or error.
   */
  public async registerUser(registration: Registration): Promise<Token | AuthError> {
    const registrationDto = RegistrationMapper.toDto(registration);

    const response = await httpClient.post<Token | AuthError>(`${this.baseUrl}register/`, registrationDto)
      .then(q => q.data)
      .catch(a => a.response.data);

    return response;
  }
}
