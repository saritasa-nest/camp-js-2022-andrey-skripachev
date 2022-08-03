import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { User } from '@js-camp/core/models/user';
import { catchError, Observable, map, of, tap, BehaviorSubject } from 'rxjs';
import { AppConfigService } from './app-config.service';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly userUrl: URL;

  private readonly currentUser$: Observable<User | null>;

  public readonly isAuthorized$ = new BehaviorSubject<boolean>(false);

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
   * @return String with the error text or null.
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
        catchError(error => {
          this.isAuthorized$.next(false);
          return of(String(error.error.detail || 'Invalid data'));
        })
      );
  }

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
          return UserMapper.fromDto(data)
        }),
        catchError(() => {
          this.isAuthorized$.next(false);
          return of(null);
        } ),
      )
  }
}
