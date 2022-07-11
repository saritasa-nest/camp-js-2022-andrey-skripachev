import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination extends Immerable {

  /** Current page number. */
  public readonly currentPage: number;

  /** Total number of pages. */
  public readonly totalPages: number;

  public constructor(data: InitArgs) {
    super();
    this.currentPage = data.currentPage;
    this.totalPages = data.totalPages;
  }
}

type InitArgs = OmitImmerable<Pagination>;
