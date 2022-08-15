import { AnimeType } from '../utils/types/animeType';
import { AnimeStatus } from '../utils/types/animeStatus';

import { DateTimeRange } from './date-time-range';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Aired period. */
  public readonly aired: DateTimeRange;

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Status. */
  public readonly status: AnimeStatus;

  /** Title english. */
  public readonly titleEnglish?: string;

  /** Title japanese. */
  public readonly titleJapanese?: string;

  /** Type. */
  public readonly type: AnimeType;

  public constructor(data: InitArgs) {
    super();
    this.aired = data.aired;
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
  }
}

type InitArgs = OmitImmerable<Anime>;
