import { Immerable, OmitImmerable } from "./immerable";

export class Registration extends Immerable {

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly password: string;

  public readonly avatar?: string;

  public constructor(data: InitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password
    this.avatar = data.avatar;
  }

}

type InitArgs = OmitImmerable<Registration>;
