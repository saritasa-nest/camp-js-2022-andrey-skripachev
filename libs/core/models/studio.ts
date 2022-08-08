import { Immerable, OmitImmerable } from './immerable';

/** Anime studio. */
export class Studio extends Immerable {

  /** Studio id. */
  public readonly id: number;

  /** Studio name. */
  public readonly name: string;

  public constructor(data: InitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
  }
}

type InitArgs = OmitImmerable<Studio>;
