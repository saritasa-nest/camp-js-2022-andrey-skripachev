import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { map, Observable } from 'rxjs';

import { Pagination } from '../models/pagination';
import { Anime } from '../models/anime';

import { PaginationDto } from './mappers/dtos/pagination.dto';
import { PaginationMapper } from './mappers/pagination.mapper';
import { AnimeDto } from './mappers/dtos/anime.dto';
import { AnimeMapper } from './mappers/anime.mapper';
import { ApiService } from './api.service';

/** Search fields. */
enum SearchFields {
  Offset = 'offset',
  Limit = 'limit',
  Ordering = 'ordering',
  Types = 'type__in',
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
}

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private apiService: ApiService,
    private router: Router,
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

    const searchParams = new HttpParams({
      fromObject: {
        [SearchFields.Limit]: limit,
        [SearchFields.Offset]: offset,
        [SearchFields.Ordering]: ordering,
        [SearchFields.Types]: types,
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
