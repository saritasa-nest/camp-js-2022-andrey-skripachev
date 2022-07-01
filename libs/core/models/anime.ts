import { Aired } from '../dtos/anime.dto';

import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Aired start/end. */
  public readonly aired: Aired;

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Status. */
  public readonly status: string;

  /** Title english. */
  public readonly titleEng: string;

  /** Title japanese. */
  public readonly titleJpn: string;

  /** Type. */
  public readonly type: string;

  public constructor(data: PostInitArgs) {
    super();
    this.aired = data.aired;
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
  }
}

type PostInitArgs = OmitImmerable<Anime>;
