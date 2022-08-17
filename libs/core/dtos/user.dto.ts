/** User dto. */
export interface UserDto {

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Email. */
  readonly email: string;

  /** Avatar. */
  readonly avatar?: string;
}
