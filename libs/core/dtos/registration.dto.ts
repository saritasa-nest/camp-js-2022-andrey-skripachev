/** Registration. */
export interface RegistrationDto {

  /** User first name. */
  readonly first_name: string;

  /** User last name. */
  readonly last_name: string;

  /** User email. */
  readonly email: string;

  /** User password. */
  readonly password: string;

  /** User avatar. */
  readonly avatar: string;
}
