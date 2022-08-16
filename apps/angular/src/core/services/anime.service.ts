import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeListSearchParams } from '../models/anime-list-search-params';

import { AppConfigService } from './app-config.service';
import { AnimeSearchParamsService } from './anime-search-params.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly searchParamsService: AnimeSearchParamsService,
    private readonly httpClient: HttpClient,
  ) {
    this.animeListUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /**
   * Gets anime list.
   * @param searchParams Params for searching anime.
   */
  public getAnimeList(searchParams: AnimeListSearchParams): Observable<Pagination<Anime>> {

    return this.httpClient.get<PaginationDto<AnimeDto>>(
      this.animeListUrl.toString(),
      {
        params: this.searchParamsService.changeSearchParams(searchParams),
      },
    ).pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)));
  }
}
