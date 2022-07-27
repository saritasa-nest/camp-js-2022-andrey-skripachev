import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import { ApiService } from './api.service';
import { SearchParamsService } from './search-params.service';

/** Search params for anime list query. */
export interface AnimeListGetterConstructionData {

  /** Number of received page. */
  pageNumber: number;

  /** Maximum items on page. */
  maximumItemsOnPage: number;

  /** Sorting target. */
  sorting: Sort;

  /** Selected anime types. */
  types: AnimeType[];

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
    private readonly searchParamsService: SearchParamsService,
  ) {}

  /**
   * Gets the anime and returns the converted result.
   * @param searchParams Query search parameters to get a list of anime.
   */
  public getAnimeList(searchParams: HttpParams): Observable<Pagination<Anime>> {
    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', searchParams).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
