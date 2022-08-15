/** Data requires for registration. */
export interface RegistrationDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

  /** Avatar. */
  readonly avatar?: string;
}
