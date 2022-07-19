import { Immerable, OmitImmerable } from './immerable';

/** Registration. */
export class Registration extends Immerable {

  /** User first name. */
  public readonly firstName: string;

  /** User last name. */
  public readonly lastName: string;

  /** User email. */
  public readonly email: string;

  /** User password. */
  public readonly password: string;

  /** User avatar. */
  public readonly avatar: string;

  public constructor(data: InitArgs) {
    super();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.avatar = data.avatar;
  }
}

type InitArgs = OmitImmerable<Registration>;
