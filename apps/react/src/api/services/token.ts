import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { Token } from '@js-camp/core/models/token';

import { LocalStorageService } from './localStorage';

export namespace TokenService {

  const TOKEN_FIELD_NAME = 'token';

  /**
   * Saves auth token in local storage.
   * @param token Auth token.
   */
  export function saveToken(token: Token): void {
    LocalStorageService.save(TOKEN_FIELD_NAME, TokenMapper.toDto(token));
  }

  /** Removes auth token from local storage. */
  export function deleteToken(): void {
    LocalStorageService.remove(TOKEN_FIELD_NAME);
  }

  /** Gets token from local storage. */
  export function getToken(): Token | null {
    const token = LocalStorageService.get<TokenDto>(TOKEN_FIELD_NAME);

    if (token === null) {
      return null;
    }

    return TokenMapper.fromDto(token);
  }

}
