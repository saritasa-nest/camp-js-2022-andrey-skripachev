import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';
import { UserService } from '../services/user.service';

/** Interceptor to refreshing token. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  private refreshTokenRequest$: Observable<void> | null = null;

  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly userService: UserService,
  ) {}

  /** @inheritdoc */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && (error.status !== 401 || !this.shouldRefreshToken(request.url))) {
          return throwError(() => error);
        }

        this.refreshTokenRequest$ ??= this.userService.refresh();

        return this.refreshTokenRequest$.pipe(
          switchMap(() => next.handle(request)),
        );
      }),
    );
  }

  private shouldRefreshToken(url: string): boolean {
    return !url.startsWith(new URL('auth', this.appConfig.apiUrl).toString());
  }
}
