import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';
import { BehaviorSubject, concat, defer, Observable, ReplaySubject, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly currentToken$: Observable<Token | null>;

  public constructor(
    private readonly storageService: LocalStorageService,
  ) {
    this.currentToken$ = this.initTokenStream();

    this.currentToken$.subscribe()
  }

  public saveToken(token: Token): void {
    this.storageService.set(TOKEN_STORAGE_KEY, token)
  }

  public getToken(): Observable<Token | null> {
    return this.currentToken$;
  }

  public clearToken(): void {

      this.storageService.delete(TOKEN_STORAGE_KEY)

  }

  private initTokenStream(): Observable<Token | null> {
    return defer(() =>
      this.storageService.get<Token>(TOKEN_STORAGE_KEY))
  }
}
