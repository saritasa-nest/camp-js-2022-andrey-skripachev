import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** App config. */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {

  /** API base url. */
  public readonly apiUrl: string = environment.apiUrl;

  /** API key. */
  public readonly apiKey: string = environment.apiKey;
}
