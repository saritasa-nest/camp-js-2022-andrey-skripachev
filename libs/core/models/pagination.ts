import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {

  /** Total number of results. */
  public readonly count: number;

  /** Next page of request. */
  public readonly next: string;

  /** Previous page of request. */
  public readonly previous: string;

  /** Received results. */
  public readonly results: readonly T[];

  public constructor(data: InitArgs<T>) {
    super();
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}

type InitArgs<T> = OmitImmerable<Pagination<T>>;
