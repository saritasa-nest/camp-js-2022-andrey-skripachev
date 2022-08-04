/** Errors for validation fields. */
export interface ValidationErrorsDto {

  /** Errors for email. */
  readonly email?: readonly string[];

  /** Errors for first name. */
  readonly first_name?: readonly string[];

  /** Errors for last name. */
  readonly last_name?: readonly string[];

  /** Errors for avatar. */
  readonly avatar?: readonly string[];

  /** Errors for password. */
  readonly password?: readonly string[];

  /** Non fields errors. */
  readonly non_field_errors?: readonly string[];
}
