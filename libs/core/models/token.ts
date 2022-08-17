/** User's auth token. */
export interface Token {

  /** Access token. */
  readonly access: string;

  /** Refresh token. */
  readonly refresh: string;
}
