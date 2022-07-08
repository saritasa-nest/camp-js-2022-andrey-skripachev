import { Immerable, OmitImmerable } from './immerable';

export class Pagination extends Immerable {

  public readonly currentPage: number;
  public readonly totalPages: number;

  public constructor(data: InitArgs) {
    super();
    this.currentPage = data.currentPage;
    this.totalPages = data.totalPages;
  }
}

type InitArgs = OmitImmerable<Pagination>;
