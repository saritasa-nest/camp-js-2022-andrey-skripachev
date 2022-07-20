import { Immerable, OmitImmerable } from './immerable';

/** Genre info. */
export class Genre extends Immerable {

  /** Genre id. */
  public readonly id: number;

  /** Genre name. */
  public readonly name: string;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgs = OmitImmerable<Genre>;
