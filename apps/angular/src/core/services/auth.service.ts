import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { TokenMapper } from '@js-camp/core/mappers/token.mapper';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { map, Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';

/** Auth service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,

  ) {
    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
  }

  /**
   * Sends login request and gets tokens.
   * @param loginData Data for log in.
   */
  public login(loginData: Login): Observable<Token> {
    return this.httpClient.post<TokenDto>(this.loginUrl.toString(), LoginMapper.toDto(loginData)).pipe(
      map(TokenMapper.fromDto),
    );
  }
}
