import { Injectable } from '@angular/core';

/** Local storage. */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  /**
   * Save data in local storage.
   * @param key Key.
   * @param data Value to save.
   */
  // eslint-disable-next-line require-await
  public async set<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Gets data from local storage.
   * @param key Key.
   */
  // eslint-disable-next-line require-await
  public async get<T = unknown>(key: string): Promise<T | null> {
    const rawData = localStorage.getItem(key);

    return rawData === null ? null : JSON.parse(rawData) as T;
  }

  /**
   * Deletes value from local storage.
   * @param key Key.
   */
  // eslint-disable-next-line require-await
  public async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
