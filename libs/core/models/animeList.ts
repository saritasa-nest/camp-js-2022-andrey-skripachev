import { Anime } from './anime';
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class AnimeList extends Immerable {

  /** Information about the current position in the anime list. */
  public readonly positionInfo: string;

  /** Received anime. */
  public readonly anime: readonly Anime[];

  public constructor(data: InitArgs) {
    super();
    this.positionInfo = data.positionInfo;
    this.anime = data.anime;
  }
}

type InitArgs = OmitImmerable<AnimeList>;
