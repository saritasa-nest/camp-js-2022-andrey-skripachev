import { Immerable, OmitImmerable } from "./immerable";

export class ValidationErrors extends Immerable {

  public readonly email?: readonly string[];

  public readonly firstName?: readonly string[];

  public readonly lastName?: readonly string[];

  public readonly avatar?: readonly string[];

  public readonly password?: readonly string[];

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
