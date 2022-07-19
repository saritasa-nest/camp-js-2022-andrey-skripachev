import { AnimeStatus, AnimeType } from '../utils/types/anime';

import { Aired } from './aired';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Aired start. */
  public readonly aired: Aired;

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Status. */
  public readonly status: AnimeStatus | null;

  /** Title english. */
  public readonly titleEnglish: string;

  /** Title japanese. */
  public readonly titleJapanese: string;

  /** Type. */
  public readonly type: AnimeType | null;

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
