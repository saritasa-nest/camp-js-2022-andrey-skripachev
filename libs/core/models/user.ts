import { Immerable, OmitImmerable } from "./immerable";

export class User extends Immerable {
  public readonly firstName: string;

  public readonly lastName: string;

  public readonly email: string;

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
