import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Email. */
  public readonly email: string;

  /** Avatar. */
  public readonly avatar?: string;

  public constructor(data: InitArgs) {
    super();
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.avatar = data.avatar;
  }
}

type InitArgs = OmitImmerable<User>;
