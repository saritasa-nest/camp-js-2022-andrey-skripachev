import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** Interceptor to add api key to request. */
@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {

  /**
   * Appends api key.
   * @inheritdoc
   */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({
      headers: request.headers.set('Api-Key', environment.apiKey),
    }));
  }
}
