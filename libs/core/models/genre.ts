import { Immerable, OmitImmerable } from "./immerable";

export class Genre extends Immerable{

  public readonly name: string;

  public readonly id: number;

  public constructor(data: InitArgs) {
    super();
    this.name = data.name;
    this.id = data.id;
  }
}

type InitArgs = OmitImmerable<Genre>;