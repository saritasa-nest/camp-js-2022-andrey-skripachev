import { Immerable, OmitImmerable } from './immerable';

/** User registration. */
export class Registration extends Immerable {

  /** Email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Password. */
  public readonly password: string;

  /** Avatar. */
  public readonly avatar?: string;

  public constructor(data: InitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.avatar = data.avatar;
  }

}

type InitArgs = OmitImmerable<Registration>;
