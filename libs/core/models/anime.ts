import { AnimeSeries } from './animeSeries';
import { Immerable, OmitImmerable } from './immerable';

export class Anime extends Immerable {

  public readonly count: number;

  public readonly limit: number;

  public readonly offset: number;

  public readonly animeSeries: readonly AnimeSeries[];

  public constructor(data: InitArgs) {
    super();
    this.count = data.count;
    this.limit = data.limit;
    this.offset = data.offset;
    this.animeSeries = data.animeSeries;
  }
}

type InitArgs = OmitImmerable<Anime>;
