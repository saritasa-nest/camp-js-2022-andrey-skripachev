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

  /** Status (Finished, Aired or Not yet aired). */
  public readonly status: string;

  /** Title english. */
  public readonly titleEnglish: string;

  /** Title japanese. */
  public readonly titleJapanese: string;

  /** Type (OVA, TV etc). */
  public readonly type: string;

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
