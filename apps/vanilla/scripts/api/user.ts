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
      .then(data => data.data)
      .catch(data => data.response.data);

    return response;
  }

  public async isValidAccess(accessToken: string): Promise<boolean> {
    const status = await httpClient.post<string>(`${this.baseUrl}token/verify/`, { token: accessToken })
      .then(data => data.status)
      .catch(data => data.response.status);
    return status === 200 || status === 201;
  }

  public async refreshToken(refresh: string): Promise<Token | AuthError> {
    const response = await httpClient.post(`${this.baseUrl}token/refresh/`, { refresh })
      .then(data => data.data)
      .catch(data => data.response);

    return response;
  }
}
