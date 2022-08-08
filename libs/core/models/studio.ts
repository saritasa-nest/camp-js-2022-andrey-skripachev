import { Immerable, OmitImmerable } from "./immerable";

export class Studio extends Immerable {

  public readonly id: number;

  public readonly name: string;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name
  }
}

type InitArgs = OmitImmerable<Studio>;
