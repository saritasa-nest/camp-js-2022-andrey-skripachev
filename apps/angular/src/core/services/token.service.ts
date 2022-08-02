import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public constructor(
    private readonly storageService: LocalStorageService,
  ) {}

  public saveToken(token: Token): void {
    localStorage.setItem('access', token.access);
    localStorage.setItem('refresh', token.refresh);
  }

  public getToken(): Token | null {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    return (access !== null && refresh !== null) ? { access, refresh } : null;
  }

  public clearToken(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
