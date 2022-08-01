import { Immerable, OmitImmerable } from "./immerable";

export class User extends Immerable {

  public readonly email: string;

  public readonly firstName: string;

  public readonly lastName: string;

  public readonly avatar: string | null;

  public constructor(data: InitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
  }

}

type InitArgs = OmitImmerable<User>;
