import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/** Interceptor to add api key to request. */
@Injectable({
  providedIn: 'root',
})
export class ApiAuthorizationInterceptor implements HttpInterceptor {

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /**
   * Appends api key.
   * @inheritdoc
   */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({
      headers: request.headers.set('Api-Key', this.appConfig.apiKey),
    }));
  }
}
