import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';
import { concat, defer, Observable, race, ReplaySubject, shareReplay, tap } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'token';

/** Token storage. */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {

  private readonly currentToken$: Observable<Token | null>;

  private readonly currentTokenValue$ = new ReplaySubject<Token | null>(1);

  public constructor(
    private readonly storageService: LocalStorageService,
  ) {
    this.currentToken$ = this.initTokenStream();
  }

  /**
   * Saves token into storage.
   * @param token Token.
   */
  public saveToken(token: Token): Observable<void> {
    return defer(() =>
      this.storageService.set(TOKEN_STORAGE_KEY, token)).pipe(
      tap(() => this.currentTokenValue$.next(token)),
    );
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
  public clearToken(): Observable<void> {
    return defer(() =>
      this.storageService.delete(TOKEN_STORAGE_KEY)).pipe(tap(() => this.currentTokenValue$.next(null)));
  }

  private initTokenStream(): Observable<Token | null> {
    const tokenChange$ = this.currentTokenValue$;
    const tokenFromStorage$ = concat(
      defer(() =>
        this.storageService.get<Token>(TOKEN_STORAGE_KEY)),
      tokenChange$,
    );

    return race(tokenChange$, tokenFromStorage$).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
}
