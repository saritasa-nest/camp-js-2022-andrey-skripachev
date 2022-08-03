import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '@js-camp/core/models/login';
import { catchError, Observable, map, of } from 'rxjs';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  public constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenStorageService,
    private readonly router: Router,
  ) {}

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
}
