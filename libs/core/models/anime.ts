
import { Immerable, OmitImmerable } from './immerable';

/** Anime. */
export class Anime extends Immerable {

  /** Aired start/end. */
  public readonly start: string | Date;

  /** Id. */
  public readonly id: number;

  /** Image. */
  public readonly image: string;

  /** Status (Finished, Aired or Not yet aired). */
  public readonly status: string;

  /** Title english. */
  public readonly titleEng: string;

  /** Title japanese. */
  public readonly titleJpn: string;

  /** Type (OVA, TV etc). */
  public readonly type: string;

  public constructor(data: PostInitArgs) {
    super();
    this.start = data.start;
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.titleEng = data.titleEng;
    this.titleJpn = data.titleJpn;
    this.type = data.type;
  }
}

type PostInitArgs = OmitImmerable<Anime>;
