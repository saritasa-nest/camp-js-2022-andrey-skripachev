import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { User } from '@js-camp/core/models/user';
import { catchError, Observable, map, of, tap } from 'rxjs';
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

  public constructor(
    appConfig: AppConfigService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenStorageService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.userUrl = new URL('users/profile/', appConfig.apiUrl);

    this.currentUser$ = this.initCurrentUser();

    this.currentUser$.subscribe(console.log);

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
          this.redirectAfterAuth();
          return null;
        }),
        catchError(error => {
          return of(String(error.error.detail || 'Invalid data'))
        })
      );
  }

  private async redirectAfterAuth(): Promise<void> {
    const route = this.router.createUrlTree(['/']);
    await this.router.navigateByUrl(route);
  }

  private initCurrentUser(): Observable<User | null> {
    return this.http.get<UserDto>(this.userUrl.toString())
      .pipe(
        map(data => {
          console.log(data);
         return UserMapper.fromDto(data)
        }),
        catchError((err) => {
          console.log(err);

          return of(null);
        } ),
      )
  }
}
