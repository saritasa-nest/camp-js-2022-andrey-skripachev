import { Immerable, OmitImmerable } from './immerable';

/** Genre. */
export class Genre extends Immerable {

  /** Genre name. */
  /** Name. */
  public readonly name: string;

  /** Id. */
  public readonly id: number;

  public constructor(data: InitArgs) {
    super();
    this.name = data.name;
    this.id = data.id;
  }
}

type InitArgs = OmitImmerable<Genre>;
