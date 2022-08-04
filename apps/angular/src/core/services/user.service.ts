import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import { catchError, Observable, map, of, BehaviorSubject } from 'rxjs';

import { AppConfigService } from './app-config.service';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

const DEFAULT_ERROR_RESPONSE_MESSAGE = 'Something went wrong...';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly isAuthorized$ = new BehaviorSubject<boolean>(false);

  private readonly userUrl: URL;

  private readonly currentUser$: Observable<User | null>;

  public constructor(
    appConfig: AppConfigService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenStorageService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.userUrl = new URL('users/profile/', appConfig.apiUrl);

    this.currentUser$ = this.initCurrentUser();

    this.currentUser$.subscribe();
  }

  /**
   * Saves token.
   * @param loginData Login data.
   * @returns String with the error text or null.
   */
  public login(loginData: Login): Observable<string | null> {
    return this.authService.login(loginData)
      .pipe(
        map(token => {
          this.tokenService.saveToken(token);
          this.isAuthorized$.next(true);
          this.redirectAfterAuth();
          return null;
        }),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            this.isAuthorized$.next(false);
            return of(String(error.error.detail || 'Invalid data'));
          }

          return of(DEFAULT_ERROR_RESPONSE_MESSAGE);
        }),
      );
  }

  /**
   * Registers user.
   * @param registrationData Registration data.
   * @returns Error response of the request.
   */
  public register(registrationData: Registration): Observable<string | null> {
    return this.authService.register(registrationData)
      .pipe(
        map(token => {
          this.tokenService.saveToken(token);
          this.isAuthorized$.next(true);
          this.redirectAfterAuth();
          return null;
        }),
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse) {
            this.isAuthorized$.next(false);
            return of(String(error.error.detail || 'Invalid data'));
          }

          return of(DEFAULT_ERROR_RESPONSE_MESSAGE);
        }),
      );
  }

  /**
   * Logouts user.
   */
  public logout(): void {
    this.tokenService.clearToken();
    this.isAuthorized$.next(false);
  }

  private async redirectAfterAuth(): Promise<void> {
    const route = this.router.createUrlTree(['/']);
    await this.router.navigateByUrl(route);
  }

  private initCurrentUser(): Observable<User | null> {
    return this.http.get<UserDto>(this.userUrl.toString())
      .pipe(
        map(data => {
          this.isAuthorized$.next(true);
          return UserMapper.fromDto(data);
        }),
        catchError(() => {
          this.isAuthorized$.next(false);
          return of(null);
        }),
      );
  }
}
