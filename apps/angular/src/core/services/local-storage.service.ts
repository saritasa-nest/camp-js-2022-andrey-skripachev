import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public async set<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public async get<T = unknown>(key: string): Promise<T | null> {
    const rawData = localStorage.getItem(key);

    return rawData === null ? null : JSON.parse(rawData) as T;
  }

  public async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
