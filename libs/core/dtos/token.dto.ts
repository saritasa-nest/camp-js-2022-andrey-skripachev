/** User's auth token. */
export interface TokenDto {

  /** Access token. */
  readonly access: string;

  /** Refresh token. */
  readonly refresh: string;
}
