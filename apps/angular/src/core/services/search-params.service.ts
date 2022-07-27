import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AnimeType, mapAnimeTypeToDto } from '@js-camp/core/utils/types/animeType';

/** Search fields. */
enum GettingAnimeListSearchFields {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  Types = 'type__in',
  Title = 'title_eng__icontains',
}

interface AnimeListGetterConstructionData {

  /** Number of received page. */
  readonly pageNumber: number;

  /** Maximum items on page. */
  readonly maximumItemsOnPage: number;

  /** Sorting target. */
  readonly sorting: Sort;

  /** Selected anime types. */
  readonly types: AnimeType[];

  /** Searching title. */
  readonly title: string;
}

/** Construct and redirecting by query search params. */
@Injectable({
  providedIn: 'root',
})
export class SearchParamsService {

  public constructor(
    private readonly router: Router,
  ) { }

  /**
   * Creates search params for anime list GET query.
   * @param data Construction data.
   */
  public createSearchParams(data: AnimeListGetterConstructionData): HttpParams {
    const limit = data.maximumItemsOnPage;
    const ordering = this.sortingToOrdering(data.sorting);
    const offset = limit * data.pageNumber;
    const types = data.types.map(mapAnimeTypeToDto).join(',');
    const { title } = data;

    return new HttpParams({
      fromObject: {
        [GettingAnimeListSearchFields.Limit]: limit,
        [GettingAnimeListSearchFields.Offset]: offset,
        [GettingAnimeListSearchFields.Ordering]: ordering,
        [GettingAnimeListSearchFields.Types]: types,
        [GettingAnimeListSearchFields.Title]: title,
      },
    });
  }

  private sortingToOrdering({ direction, active }: Sort): string {
    if (direction === '') {
      return 'id';
    }

    return `${direction === 'asc' ? '' : '-'}${active},id`;
  }
}
