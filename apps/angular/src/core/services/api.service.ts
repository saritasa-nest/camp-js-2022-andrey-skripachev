import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** API interaction service. */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(
    private readonly http: HttpClient,
  ) {}

  /**
   * Retrieving data from the API.
   * @param path Additional path.
   * @param httpParams Query parameters.
   */
  public getData<T>(path: string, httpParams: HttpParams): Observable<T> {

    const url = new URL(path, environment.apiUrl);
    return this.http.get<T>(url.toString(), {
      params: httpParams,
    });
  }
}
