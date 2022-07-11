import { AnimeSeries } from './animeSeries';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Information about the current position in the anime list. */
  public readonly captionInfo: string;

  /** Received anime. */
  public readonly animeSeries: readonly AnimeSeries[];

  public constructor(data: InitArgs) {
    super();
    this.captionInfo = data.captionInfo;
    this.animeSeries = data.animeSeries;
  }
}

type InitArgs = OmitImmerable<Anime>;
