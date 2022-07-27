import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Pagination } from '../models/pagination';
import { Anime } from '../models/anime';

import { PaginationDto } from './mappers/dtos/pagination.dto';
import { PaginationMapper } from './mappers/pagination.mapper';
import { AnimeDto } from './mappers/dtos/anime.dto';
import { AnimeMapper } from './mappers/anime.mapper';
import { ApiService } from './api.service';

interface AnimeListGetterConstructionData {

  /** Number of received page. */
  pageNumber: number;

  /** Maximum items on page. */
  maximumItemsOnPage: number;

  /** Sorting target. */
  sortingTarget: string;
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
    const ordering = data.sortingTarget;
    const offset = limit * data.pageNumber;

    const searchParams = new HttpParams({
      fromObject: { limit, ordering, offset },
    });

    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', searchParams).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
