import { Immerable, OmitImmerable } from './immerable';

/** Search parameters for anime list. */
export class AnimeListSearchParams extends Immerable {
  /** Number of the current page. */
  public readonly pageNumber: number;

  /** Maximum items on page. */
  public readonly maximumItemsOnPage: number;

  /** Sorting. */
  public readonly sorting: string;

  public constructor(data: InitArgs) {
    super();
    this.pageNumber = data.pageNumber;
    this.maximumItemsOnPage = data.maximumItemsOnPage;
    this.sorting = data.sorting;
  }
}

type InitArgs = OmitImmerable<AnimeListSearchParams>;
