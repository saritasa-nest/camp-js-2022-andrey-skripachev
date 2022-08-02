import { Injectable } from '@angular/core';
import { Login } from '@js-camp/core/models/login';
import { Token } from '@js-camp/core/models/token';
import { User } from '@js-camp/core/models/user';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** Current user. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   * Login user.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<string | null> {
    return this.authService.login(loginData)
      .pipe(
        tap(token => )
      );
  }
}
