import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';
import { concat, defer, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public constructor(
    private readonly storageService: LocalStorageService,
  ) {}

  public async saveToken(token: Token): Promise<void> {
    this.storageService.set(TOKEN_STORAGE_KEY, token)
  }

  public async getToken(): Promise<Token | null> {
    return await this.storageService.get<Token>(TOKEN_STORAGE_KEY);
  }

  public async clearToken(): Promise<void> {
    this.storageService.delete(TOKEN_STORAGE_KEY);
  }
}
