import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';
import { defer, Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'token';

/** Token storage. */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  private readonly currentToken$: Observable<Token | null>;

  public constructor(
    private readonly storageService: LocalStorageService,
  ) {
    this.currentToken$ = this.initTokenStream();
  }

  /**
   * Saves token into storage.
   * @param token Token.
   */
  public saveToken(token: Token): void {
    this.storageService.set(TOKEN_STORAGE_KEY, token);
  }

  /**
   * Gets current token.
   */
  public getToken(): Observable<Token | null> {
    return this.currentToken$;
  }

  /**
   * Deletes token from storage.
   */
  public clearToken(): void {
    this.storageService.delete(TOKEN_STORAGE_KEY);
  }

  private initTokenStream(): Observable<Token | null> {
    return defer(() =>
      this.storageService.get<Token>(TOKEN_STORAGE_KEY));
  }
}
