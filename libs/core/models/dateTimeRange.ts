import { Immerable, OmitImmerable } from './immerable';

/** Event period. */
export class DateTimeRange extends Immerable {

  /** The beginning of the event. */
  public readonly start: Date | null;

  /** End of the event. */
  public readonly end: Date | null;

  public constructor(data: InitArgs) {
    super();
    this.start = data.start;
    this.end = data.end;
  }
}

type InitArgs = OmitImmerable<DateTimeRange>;
