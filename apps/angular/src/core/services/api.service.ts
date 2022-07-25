import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const optionsForGetMethod = {
  'headers': new HttpHeaders({
    'Content-type': 'application/json',
  }),
  'Api-Key': environment.apiKey,
};

/** API interaction service. */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(
    private http: HttpClient,
  ) {}

  /**
   * Retrieving data from the API.
   * @param path Additional path.
   * @param httpParams Query parameters.
   * @returns
   */
  public getData<T>(path: string, httpParams: HttpParams): Observable<T> {
    const url = `${environment.apiBaseUrl}${path}?${httpParams.toString()}`;
    return this.http.get<T>(url, optionsForGetMethod);
  }
}
