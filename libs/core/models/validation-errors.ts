import { Immerable, OmitImmerable } from './immerable';

/** Validation errors. */
export class ValidationErrors extends Immerable {

  /** Errors for email. */
  public readonly email?: readonly string[];

  /** Errors for first name. */
  public readonly firstName?: readonly string[];

  /** Errors for last name. */
  public readonly lastName?: readonly string[];

  /** Errors for avatar. */
  public readonly avatar?: readonly string[];

  /** Errors for password. */
  public readonly password?: readonly string[];

  /** Non fields errors. */
  public readonly nonFieldErrors?: readonly string[];

  public constructor(data: InitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
    this.password = data.password;
    this.nonFieldErrors = data.nonFieldErrors;
  }
}

type InitArgs = OmitImmerable<ValidationErrors>;
