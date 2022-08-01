import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@js-camp/core/models/login';
import { delay, Observable, of } from 'rxjs';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  public constructor(
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * Login user.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<string> {
    return of('Test message').pipe(
      delay(300),
    );
  }
}
