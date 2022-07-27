import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { map, Observable } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { ApiService } from './api.service';

/** Search fields. */
enum SearchFields {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  Types = 'type__in',
  Title = 'title_eng__icontains',
}

interface AnimeListGetterConstructionData {

  /** Number of received page. */
  pageNumber: number;

  /** Maximum items on page. */
  maximumItemsOnPage: number;

  /** Sorting target. */
  sorting: Sort;

  /** Selected anime types. */
  types: string[];

  /** Searching title. */
  title: string;
}

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly apiService: ApiService,
  ) {}

  /**
   * Gets the anime and returns the converted result.
   * @param data Parameters to get a list of anime.
   */
  public getAnimeList(data: AnimeListGetterConstructionData): Observable<Pagination<Anime>> {

    const limit = data.maximumItemsOnPage;
    const ordering = this.sortingToOrdering(data.sorting);
    const offset = limit * data.pageNumber;
    const types = data.types.join(',');
    const { title } = data;

    const searchParams = new HttpParams({
      fromObject: {
        [SearchFields.Limit]: limit,
        [SearchFields.Offset]: offset,
        [SearchFields.Ordering]: ordering,
        [SearchFields.Types]: types,
        [SearchFields.Title]: title,
      },
    });

    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', searchParams).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }

  private sortingToOrdering({ direction, active }: Sort): string {
    if (direction === '') {
      return 'id';
    }

    return `${direction === 'asc' ? '' : '-'}${active},id`;
  }
}
