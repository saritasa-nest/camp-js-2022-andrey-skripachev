import { Immerable, OmitImmerable } from './immerable';

/** Anime genre. */
export class Genre extends Immerable {

  /** Genre name. */
  public readonly name: string;

  /** Genre id. */
  public readonly id: number;

  public constructor(data: InitArgs) {
    super();
    this.name = data.name;
    this.id = data.id;
  }
}

type InitArgs = OmitImmerable<Genre>;
