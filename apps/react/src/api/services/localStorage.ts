export namespace LocalStorageService {

  /**
   * Saves value in local storage field.
   * @param key Field name.
   * @param data Data for saving.
   */
  export function save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Gets value from local storage by key.
   * @param key Field name.
   */
  export function get<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (data === null) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  /**
   * Removes value from local storage by key.
   * @param key Field name.
   */
  export function remove(key: string): void {
    localStorage.removeItem(key);
  }
}
