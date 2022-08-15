import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';
import { TokenStorageService } from '../services/token-storage.service';

/** Interceptor to add access token to request. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly tokenService: TokenStorageService,
  ) {}

  /** @inheritdoc */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(new URL('auth', this.appConfig.apiUrl).toString())) {
      return next.handle(request);
    }
    return this.tokenService.getToken().pipe(
      map(token => {
        if (token === null) {
          return request;
        }
        return request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token.access}`),
        });
      }),
      switchMap(clonedRequest => next.handle(clonedRequest)),
    );
  }
}
