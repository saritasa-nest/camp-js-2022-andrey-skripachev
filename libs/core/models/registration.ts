/** User registration. */
export interface Registration {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Last name. */
  readonly lastName: string;

  /** Password. */
  readonly password: string;

  /** Avatar. */
  readonly avatar?: string;
}
