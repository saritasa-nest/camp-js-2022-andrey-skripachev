import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import { catchError, Observable, map, of, throwError, switchMap, tap, mapTo, first } from 'rxjs';
import { UserValidationErrorsMapper } from '@js-camp/core/mappers/user-validation-errors.mapper';
import { ErrorMessage, extractValidationErrorMessage } from '@js-camp/core/models/error-response';

import { catchHttpErrorResponse } from '../utils/rxjs/catch-http-error-response';

import { AppConfigService } from './app-config.service';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly userUrl: URL;

  /** Current user. */
  public readonly currentUser$: Observable<User | null>;

  /** Is user authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    appConfig: AppConfigService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenStorageService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.userUrl = new URL('users/profile/', appConfig.apiUrl);
    this.currentUser$ = this.initCurrentUser();
    this.isAuthorized$ = this.currentUser$.pipe(map(user => user !== null));
  }

  /**
   * Saves token.
   * @param loginData Login data.
   * @returns String with the error text or null.
   */
  public login(loginData: Login): Observable<ErrorMessage | null> {
    return this.authService.login(loginData)
      .pipe(
        switchMap(token => this.tokenService.saveToken(token)),
        tap(() => this.redirectAfterAuth()),
        map(() => null),
        catchHttpErrorResponse(error => of(extractValidationErrorMessage(
          error.error,
          UserValidationErrorsMapper.fromDto,
        ))),
      );
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   * @returns Error response of the request.
   */
  public register(registrationData: Registration): Observable<ErrorMessage | null> {
    return this.authService.register(registrationData)
      .pipe(
        switchMap(token => this.tokenService.saveToken(token)),
        tap(() => this.redirectAfterAuth()),
        map(() => null),
        catchHttpErrorResponse(error => of(extractValidationErrorMessage(
          error.error,
          UserValidationErrorsMapper.fromDto,
        ))),
      );
  }

  /** Refreshes access token. */
  public refresh(): Observable<void> {
    return this.tokenService.getToken().pipe(
      first(),
      switchMap(token =>
        token !== null ?
          this.authService.refresh(token) :
          throwError(() => new Error('Unauthorized'))),
      catchError(() =>
        this.tokenService.clearToken()),
      switchMap(newToken => newToken ?
        this.tokenService.saveToken(newToken) :
        of(null)),
      mapTo(void 0),
    );
  }

  /**
   * Logouts user.
   */
  public logout(): Observable<void> {
    return this.tokenService.clearToken();
  }

  private async redirectAfterAuth(): Promise<void> {
    const route = this.router.createUrlTree(['/']);
    await this.router.navigateByUrl(route);
  }

  private initCurrentUser(): Observable<User | null> {
    return this.tokenService.getToken().pipe(
      switchMap(token => token ? this.getUser() : of(null)),
    );
  }

  private getUser(): Observable<User | null> {
    return this.http.get<UserDto>(this.userUrl.toString())
      .pipe(
        map(data => UserMapper.fromDto(data)),
        catchError(() => of(null)),
      );
  }

  /**
   * Verifies token.
   */
  public verifyToken(): Observable<boolean> {
    return this.tokenService.getToken().pipe(
      switchMap(token => token ? this.authService.verify(token) : of(false)),
    );
  }
}
