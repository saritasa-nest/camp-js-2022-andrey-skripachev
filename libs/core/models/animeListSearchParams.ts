import { Immerable, OmitImmerable } from "./immerable";
import { Sort } from '@angular/material/sort';
import { AnimeType } from "../utils/types/animeType";

export class AnimeListSearchParams extends Immerable {
  public readonly pageNumber: number;

  public readonly maximumItemsOnPage: number;

  public readonly sorting: Sort;

  public readonly types: AnimeType[];

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
