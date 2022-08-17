/** Transfer object for login. */
export interface LoginDto {

  /** Current user email. */
  readonly email: string;

  /** Current user password. */
  readonly password: string;
}
