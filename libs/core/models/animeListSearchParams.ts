import { Sort } from '@angular/material/sort';

import { AnimeType } from '../utils/types/animeType';

import { Immerable, OmitImmerable } from './immerable';

/** Search parameters for anime list. */
export class AnimeListSearchParams extends Immerable {
  /** Number of the current page. */
  public readonly pageNumber: number;

  /** Maximum items on page. */
  public readonly maximumItemsOnPage: number;

  /** Sorting. */
  public readonly sorting: Sort;

  /** Selected anime types. */
  public readonly types: AnimeType[];

  /** Searching title part. */
  public readonly titlePart: string;

  public constructor(data: InitArgs) {
    super();
    this.pageNumber = data.pageNumber;
    this.maximumItemsOnPage = data.maximumItemsOnPage;
    this.sorting = data.sorting;
    this.types = data.types;
    this.titlePart = data.titlePart;
  }
}

type InitArgs = OmitImmerable<AnimeListSearchParams>;
