import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { Token } from '@js-camp/core/models/token';
import { map, Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';

/** Auth service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl: URL;

  private readonly registrationUrl: URL;

  private readonly refreshUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,

  ) {
    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
    this.registrationUrl = new URL('auth/register/', appConfig.apiUrl);
    this.refreshUrl = new URL('auth/token/refresh/', appConfig.apiUrl);
  }

  /**
   * Sends login request and gets tokens.
   * @param loginData Data for login.
   */
  public login(loginData: Login): Observable<Token> {
    return this.httpClient.post<TokenDto>(this.loginUrl.toString(), LoginMapper.toDto(loginData)).pipe(
      map(TokenMapper.fromDto),
    );
  }

  /**
   * Sends registration request and gets tokens.
   * @param registrationData Data for registration.
   */
  public register(registrationData: Registration): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.registrationUrl.toString(),
      RegistrationMapper.toDto(registrationData),
    ).pipe(
      map(TokenMapper.fromDto),
    );
  }

  /**
   * Refreshes access token.
   * @param token Token.
   */
  public refresh(token: Token): Observable<Token> {
    return this.httpClient.post<TokenDto>(
      this.refreshUrl.toString(),
      { refresh: token },
    ).pipe(
      map(TokenMapper.fromDto),
    );
  }
}
