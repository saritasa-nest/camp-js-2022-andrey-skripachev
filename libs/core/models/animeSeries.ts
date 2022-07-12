import { AnimeStatus, AnimeType } from '../enums/anime';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class AnimeSeries extends Immerable {

  /** Aired start. */
  public readonly start: string;

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Status (Finished, Aired or Not yet aired). */
  public readonly status: AnimeStatus;

  /** Title english. */
  public readonly titleEnglish: string;

  /** Title japanese. */
  public readonly titleJapanese: string;

  /** Type (OVA, TV etc). */
  public readonly type: AnimeType;

  public constructor(data: InitArgs) {
    super();
    this.start = data.start;
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
  }
}

type InitArgs = OmitImmerable<AnimeSeries>;
