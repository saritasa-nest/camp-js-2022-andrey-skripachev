import { Immerable, OmitImmerable } from './immerable';

/** Anime release period. */
export class Aired extends Immerable {

  /** The beginning of the release of the anime. */
  public readonly start: Date;

  /** End of anime release. */
  public readonly end: Date;

  public constructor(data: InitArgs) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type InitArgs = OmitImmerable<Aired>;
